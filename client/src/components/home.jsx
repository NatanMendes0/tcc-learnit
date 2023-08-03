import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getPosts")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/post/${post._id}`}>
          <div className="bg-sky-200">
            <img src={`http://localhost:8080/Images/${post.file}`} alt="post" />
            <div>
              <h2>{post.name}</h2>
              <h2>{post.title}</h2>
              <h2>{post.description}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
