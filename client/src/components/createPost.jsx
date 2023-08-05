import React, { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const user = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", user.nickname);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .post("http://localhost:8080/api/createPost", formData)
      .then((res) => {
        if (res.data === "Post criado com sucesso!") {
          console.log(res.data);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold">Criar Postagem</h2>
          <input
            type="text"
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            placeholder="Selecione um arquivo"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button>Postar</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
