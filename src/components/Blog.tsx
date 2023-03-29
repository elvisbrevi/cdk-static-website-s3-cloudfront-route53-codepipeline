import React from "react";

const Blog = () => {
  const blogPosts = [
    { title: "Mi primer blog post", date: "2023-03-29" },
    { title: "Mi segundo blog post", date: "2023-03-30" },
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4">Blog</h2>
      <ul>
        {blogPosts.map((post, index) => (
          <li key={index} className="mb-2">
            <h3 className="text-xl">{post.title}</h3>
            <p className="text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;