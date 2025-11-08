import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "./api/axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/login", { 
            email, 
            password 
        });

        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Login successful!" + JSON.stringify(data));
        navigate("/tasks");
    } catch (error) {
        if (error.response) {
        setMessage(error.response.data.message || "Login failed");
        } else {
        setMessage("An error occurred. Please try again.");
        }
    }
    };

    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div>
            <label>Email</label>
            <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            />
        </div>
        <div>
            <label>Password</label>
            <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            />
        </div>
        <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        {message && <p>{message}</p>}
    </div>
    );
}
