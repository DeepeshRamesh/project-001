import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function Navbar({ title }){

    const { theme, toggleTheme } = useContext(ThemeContext);

    return(
        <nav>
            <h2>{title}</h2>
            <div>
                <NavLink to="/" style={({ isActive }) => ({
                    color: isActive ? "white": "#d1d5db",
                })}>Home</NavLink> |{" "}
                <NavLink to="/about" style={({ isActive }) => ({
                    color: isActive ? "white": "#d1d5db",
                })}>About</NavLink> |{" "}
                <NavLink to="/contact" style={({ isActive }) => ({
                    color: isActive ? "white": "#d1d5db",
                })}>Contact</NavLink>
                
            </div>   
            <button onClick={ toggleTheme }>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>        
        </nav>
    );
}

export default Navbar;