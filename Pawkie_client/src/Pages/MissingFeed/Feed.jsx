import React, { useState } from "react";
import axios from "axios";

const Feed = ({ posts }) => {
  const [commentText, setCommentText] = useState({});
  const [openComments, setOpenComments] = useState({}); // track which comment sections are open

  const handleCommentChange = (e, postId) => {
    setCommentText({ ...commentText, [postId]: e.target.value });
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();

    const text = commentText[postId]?.trim();
    if (!text) return;

    try {
      await axios.post(`http://localhost:5000/api/missing-posts/${postId}/comments`, {
        userName: "Anonymous",
        text: text,
      });

      setCommentText({ ...commentText, [postId]: "" });
      window.location.reload(); // reload to see new comment
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#000000]">
      <h1 className="text-4xl font-bold text-[#840B36] text-center mb-20">
        <img 
          src="src/assets/paw2.png" 
          alt="Paw" 
          className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 mr-5"
        />
        All Missing Posts
        <img 
          src="src/assets/paw.png" 
          alt="Paw" 
          className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 ml-5"
        />
      </h1>

      <div className="flex flex-col gap-10">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-[#f5d5dd]"
            >
              {/* Left Section - User & Content */}
              <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={post.userImage || "https://via.placeholder.com/50"}
                    alt="User"
                    className="rounded-full w-12 h-12 border-2 border-pink-300"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-[#840B36]">
                      {post.userName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#333] text-xl font-semibold text-base leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Toggle Comments Button */}
                <button
                  onClick={() => toggleComments(post._id)}
                  className="self-start text-sm text-[#BA6C7D] font-medium underline hover:text-[#840B36] mb-3"
                >
                  {openComments[post._id] ? "Hide Comments" : "View Comments"}
                </button>

                {/* Comments */}
                {openComments[post._id] && (
                  <>
                    {post.comments?.length > 0 ? (
                      <div className="mb-3">
                        <h4 className="font-semibold text-[#840B36] text-sm mb-2">Comments</h4>
                        {post.comments.map((comment, i) => (
                          <div key={i} className="text-sm text-gray-800 mb-2">
                            <span className="font-medium text-[#BA6C7D]">
                              {comment.userName}:
                            </span>{" "}
                            {comment.text}
                            <p className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 mb-3">No comments yet.</p>
                    )}

                    {/* Comment Form */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, post._id)}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[post._id] || ""}
                        onChange={(e) => handleCommentChange(e, post._id)}
                        className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#840B36]"
                        required
                      />
                      <button
                        type="submit"
                        className="text-white bg-[#840B36] px-4 py-2 rounded-md text-sm hover:bg-[#BA6C7D] transition"
                      >
                        Post
                      </button>
                    </form>
                  </>
                )}

                {/* Footer */}
                <div className="mt-4 text-sm text-[#840B36] bg-[#FEE3EC] p-3 rounded-md font-medium border border-pink-100">
                  If you’ve seen this pet, please contact the owner immediately.
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="w-full md:w-1/3 max-h-80 overflow-hidden">
              {post.image && (
                <img
                  src={`data:${post.imageType};base64,${post.image}`}
                  alt="Missing Pet"
                  className="w-full h-80 object-cover rounded-r-2xl"
                />
              )}
            </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 font-medium">
            No missing pet posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
