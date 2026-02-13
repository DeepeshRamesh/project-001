import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar({ title }){
    return(
        <nav>
            <h2>{title}</h2>
            <div>
                <Link to="/">Home</Link> |{" "}
                <Link to="/about">About</Link> |{" "}
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;