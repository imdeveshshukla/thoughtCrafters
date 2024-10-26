import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateBlog() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit({ title, content }) {
    
  }

  if (loading) return <>...</>;

  return (
    <div className="w-screen">
      <BlogInput2 onSubmit={onSubmit} />
    </div>
  );
}

const BlogInput2 = ({ onSubmit }) => {
  const [inp, setInp] = useState({
    title: "",
    content: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inp);
    // Reset input fields after submission
    setInp({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Write your thoughts....</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={inp.title}
          onChange={(e) => setInp({ ...inp, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your blog title..."
          required
        />
      </div>

      {/* Content Textarea */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={inp.content}
          onChange={(e) => setInp({ ...inp, content: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-40 resize-none"
          placeholder="Write your blog content..."
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-zinc-900 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
        Publish
      </button>
    </form>
  );
};
