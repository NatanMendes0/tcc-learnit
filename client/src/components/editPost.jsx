import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/editPost/${id}`, { title, description })
      .then((res) => {
        if (res.data === "Post editado com sucesso!") {
          console.log(res.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getPost/${id}`)
      .then((result) => {
        setTitle(result.data.title);
        setDescription(result.data.description);
      })
      .catch((err) => console.log(err));
    }, [id]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold">Editar Postagem</h2>
          <input
            value={title}
            type="text"
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
