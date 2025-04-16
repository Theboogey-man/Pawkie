const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8gt7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// MongoDB Collections
let usersCollection, petsCollection, missingPostsCollection;

async function run() {
  try {
    // Initialize collections
    await client.connect();
    const db = client.db("PawkieDB");
    usersCollection = db.collection("users");
    petsCollection = db.collection("pets");
    missingPostsCollection = db.collection("missingPosts");

    // ✅ Users Routes
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      if (req.decoded && email !== req.decoded.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    });

    app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { role: 'admin' }
      };
      const result = await usersCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Zayed's Part - Get user by email
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const query = { email: email };
        const user = await usersCollection.findOne(query);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
    });

    app.put('/users/:email', async (req, res) => {
      const email = req.params.email;
      const updatedUserData = req.body;

      try {
        const filter = { email: email };
        const options = { upsert: false };
        const { email: _, ...updateData } = updatedUserData;

        const updateDoc = {
          $set: updateData
        };

        const result = await usersCollection.updateOne(filter, updateDoc, options);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'User not found' });
        }

        res.send({ success: true, message: 'User updated successfully', result });
      } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
    });

    // Adoption Routes
    app.post('/api/adopt', upload.array('images'), async (req, res) => {
      const { ownerName, contact, address, petName, petBreed, petColor, petAge } = req.body;
      const images = req.files;

      if (!ownerName || !contact || !address || !petName || !petBreed || !petColor || !petAge || !images.length) {
        return res.status(400).json({ message: 'All fields including images are required.' });
      }

      const pet = {
        ownerName, contact, address, petName, petBreed, petColor, petAge,
        images: images.map(img => `/uploads/${img.filename}`),
        createdAt: new Date(),
      };

      const result = await petsCollection.insertOne(pet);
      res.status(200).json({ message: 'Adoption post saved!', petId: result.insertedId });
    });

    app.get('/api/adopt', async (req, res) => {
      try {
        const pets = await petsCollection.find().sort({ createdAt: -1 }).toArray();
        console.log('Pets Data:', pets); // Add logging to inspect the data
        res.status(200).json(pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // DELETE a post by ID
    app.delete('/api/adopt/:id', async (req, res) => {
      try {
        const result = await petsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (!result.deletedCount) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });


    // Upload Missing Pet Post
    app.post('/api/missing-pet', upload.single('image'), async (req, res) => {
      const { description } = req.body;
      const imageFile = req.file;
    
      if (!description || !imageFile) {
        return res.status(400).json({ message: 'Description and image are required.' });
      }
    
      const fs = require('fs');
      const imageBuffer = fs.readFileSync(imageFile.path);
      const base64Image = imageBuffer.toString('base64');
    
      const newPost = {
        description,
        image: base64Image,
        imageType: imageFile.mimetype,
        createdAt: new Date(),
        comments: [] // <--- New field for storing comments
      };
    
      const result = await missingPostsCollection.insertOne(newPost);
    
      // Optional: delete the local file after saving to DB
      fs.unlinkSync(imageFile.path);
    
      res.status(200).json({
        message: 'Post submitted successfully!',
        postId: result.insertedId,
        post: newPost
      });
    });

    app.post('/api/missing-posts/:id/comments', async (req, res) => {
      const postId = req.params.id;
      const { userName, text } = req.body;
    
      if (!userName || !text) {
        return res.status(400).json({ message: 'User name and comment text are required' });
      }
    
      const comment = {
        userName,
        text,
        createdAt: new Date(),
      };
    
      const result = await missingPostsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: comment } }
      );
    
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Post not found or comment not added' });
      }
    
      res.status(200).json({ message: 'Comment added successfully', comment });
    });

    // Get all posts
    app.get('/api/missing-posts', async (req, res) => {
      const posts = await missingPostsCollection.find().sort({ createdAt: -1 }).toArray();
      res.status(200).json(posts);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Backend error:", err);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('🐾 Missing Pets API is live');
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
