import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = () => {
    axios.post('http://localhost:8080/api/register', { email, password })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    axios.post('http://localhost:8080/api/login', { email, password })
      .then((res) => {
        setToken(res.data.token);
        console.log('Login bem-sucedido:', res.data.token);
      })
      .catch((err) => console.log(err));
  };

  const handleProtectedRoute = () => {
    axios.get('http://localhost:8080/api/homepage', { headers: { Authorization: token } }) // Aqui você passa o token no header da requisição
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Login e Proteção de Rotas</h1>
      <div>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="bg-green-600 rounded-sm p-2 mt-2 text-white" onClick={handleRegister}>Registrar</button>
      <br />
      <button className="bg-green-600 rounded-sm p-2 mt-2 text-white" onClick={handleLogin}>Login</button>
      <br />
      <button className="bg-green-600 rounded-sm p-2 mt-2 text-white" onClick={handleProtectedRoute}>Acessar HomePage (Protegida)</button>
      <br />
    </div>
  );
};

export default App;
