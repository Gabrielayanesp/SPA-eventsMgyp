import axios from "axios";
import { API_URL, app } from "./index.js";

export function renderLogin() {
    app.innerHTML = `
        <nav>Login </nav>
        <form id="loginForm" class="card">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Enter</button>
            <p>Don't have account? <a href="#register">Sing Up</a></p>
        </form>
    `;
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const { data } = await axios.get(`${API_URL}?email=${email}&password=${password}`);
            if (data.length > 0) {
                localStorage.setItem("user", JSON.stringify(data[0]));
                window.location.hash = "#dashboard";
            } else {
                alert("Incorrect credentials");
            }
        } catch (err) {
          alert("Connection error");
        }
    });
}