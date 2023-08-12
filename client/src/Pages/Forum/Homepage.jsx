import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div>
            <h1>Bem-vindo ao Fórum</h1>
            <br />
            <Link to="/forum/create">Inserir dúvida</Link>
        </div>
    );
}

export default Homepage;