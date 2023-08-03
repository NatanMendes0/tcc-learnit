import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getPost/${id}`)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  });

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/deletePost/${id}`)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-sky-700 text-white">
      <img src={`http://localhost:8080/Images/${post.file}`} alt="post" />
      <div>
        <div className="flex">
          <h2 className="px-2">{post.title}</h2>
          <p>|</p>
          <h2 className="px-2">{post.description}</h2>
        </div>
        <div>
          {user.email === post.email ? (
            <>
              <Link
                to={`/editPost/${post._id}`}
                className="px-4 py-1 bg-sky-400 rounded-md"
              >
                Editar
              </Link>
              <button
                onClick={(e) => handleDelete(post._id)}
                className="px-4 py-1 bg-red-400 ml-2 rounded-md"
              >
                Apagar
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
