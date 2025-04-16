import React, { useState, useEffect } from "react";
import SparkleEffect from "../../components/SparkleEffect";
import axios from "axios";
import Feed from "./Feed"; // Import Feed component

const MissingFeed = () => {
  const [petData, setPetData] = useState({ description: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [posts, setPosts] = useState([]); // Store posts here
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  // Handle file input change and preview the image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPetData({ ...petData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("description", petData.description);
    formData.append("image", petData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/missing-pet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Add the new post to the existing posts
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);

      // Reset the form data
      setPetData({ description: "", image: null });
      setImagePreview(null);
      setIsSubmitting(false);

      alert("Post submitted!");
    } catch (error) {
      console.error("Error submitting post:", error);
      setIsSubmitting(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/missing-posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FFDDE1] via-[#FEE3EC] to-[#F6C7CF] py-30 px-6 lg:px-20 items-center justify-between text-center">
        <SparkleEffect count={30} />
        <h1 className="text-5xl font-bold text-[#840B36] mb-6">Help Find Missing Pets</h1>
        <p className="text-xl text-[#BA6C7D] mb-8">
          Join our community to help locate missing pets and reunite them with their families.
        </p>

        {/* Post Creator */}
        <div className="post-creator bg-white shadow-lg rounded-lg mx-auto max-w-xl ">
          <div className="post-header px-6 py-4 border-b ">
            <h3 className="text-[#840B36] font-semibold">Create Missing Pet Report</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="post-content px-6 py-3">
              <textarea
                name="description"
                placeholder="Share details about the missing pet..."
                value={petData.description}
                onChange={handleInputChange}
                className="post-textarea w-full p-4 border border-[#840B36] rounded-md text-[#840B36]"
                rows="4"
                required
              />
              {imagePreview && (
                <div className="image-preview my-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-60 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="remove-image absolute top-2 right-2 text-white bg-black bg-opacity-50 p-1 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="post-footer px-6 py-4 border-t flex justify-between items-center">
              <label htmlFor="imageInput" className="cursor-pointer flex items-center space-x-2 text-[#840B36] hover:text-[#BA6C7D]">
                <i className="fas fa-camera"></i>
                <span>Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <button
                type="submit"
                className="bg-[#BA6C7D] text-white px-4 py-2 rounded hover:bg-[#840B36] transition"
                disabled={isSubmitting || !petData.description || !petData.image}
              >
                {isSubmitting ? "Submitting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* Feed Section */}
    <div className="mt-10">
      <Feed posts={posts} /> {/* Pass posts as a prop to Feed */}
    </div>
    </div>
  );
};

export default MissingFeed;
