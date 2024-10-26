import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function OpenBlog() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: "Test",
    content: "Test123456",
    author: {
      name: "AuthTest1"
    },
    date: "12/03/2003"
  });
  
  const { id } = useParams();

  useEffect(() => {
    
  }, []);

  if (loading) {
    return (
      <>
        <>Loading...</>
      </>
    );
  }

  return (
    <div className="grid grid-cols-3 my-5 mx-3 max-sm:grid-cols-2">
      <div className="col-span-2 max-sm:w-11/12">
        <h1 className="text-2xl font-black max-sm:text-xl">{blog.title}</h1>
        <p className="text-sm text-zinc-500">{blog.date}</p>
        <div className="h-min mt-5">
          <p className="text-balance">{blog.content}</p>
        </div>
      </div>
      <div className="text-right max-sm:text-left">
        <p className="max-sm:hidden">Author</p>
        <p className="font-bold text-wrap text-clip max-sm:mt-5">
          <span className="font-light hidden max-sm:inline">By </span>
          {blog.author.name}
        </p>
      </div>
    </div>
  );
}
