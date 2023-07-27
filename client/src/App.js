import { Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>   
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
