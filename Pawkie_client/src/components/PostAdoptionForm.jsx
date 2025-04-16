import React, { useState } from 'react';

const PostAdoptionForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    contact: '',
    address: '',
    petName: '',
    petBreed: '',
    petColor: '',
    petAge: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // ✅ Max 4 files
    setImageFiles(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    imageFiles.forEach((file) => form.append('images', file)); // multiple images

    try {
      const response = await fetch('http://localhost:5000/api/adopt', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSuccess(true);
        onSubmitSuccess?.(); // ✅ Trigger refresh
        setTimeout(() => {
          setSuccess(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-1 mb-20 bg-[#] p-10 rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#840B36] text-center">Post a Pet for Adoption</h2>

      {success && (
        <div className="text-green-700 bg-green-100 px-4 py-2 rounded mb-4 text-center font-medium">
          🐾 Pet posted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Owner Fields */}
        <input type="text" name="ownerName" placeholder="Owner's Name" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />
        <input type="text" name="contact" placeholder="Contact Number" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />
        <input type="text" name="address" placeholder="Address" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />

        {/* Pet Fields */}
        <input type="text" name="petName" placeholder="Pet Name" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />
        <input type="text" name="petBreed" placeholder="Pet Breed" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />
        <input type="text" name="petColor" placeholder="Pet Color" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />
        <input type="text" name="petAge" placeholder="Pet Age" required onChange={handleChange}
          className="w-full border border-[#840B36] text-[#840B36] px-4 py-2 rounded placeholder-[#99475C]" />

        {/* 🖼️ Image Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full border border-[#49312C] text-[#49312C] px-4 py-2 rounded 
            file:mr-4 file:py-2 file:px-4 file:rounded 
            file:border-0 file:bg-[#BA6C7D] hover:file:bg-[#840B36] transition file:text-white "
        />
        {previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {previewUrls.map((url, index) => (
              <img key={index} src={url} alt="Preview" className="rounded h-28 object-cover" />
            ))}
          </div>
        )}

        <button type="submit"
          className="w-full bg-[#BA6C7D] text-[#FFFFFF] font-bold px-4 py-2 rounded hover:bg-[#840B36] transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostAdoptionForm;
