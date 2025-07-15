import axios from "axios";
import { API_URL, app } from "./index.js";
import { isValidName, isValidEmail, isValidPassword } from "./validations.js";

export function renderRegister() {
    app.innerHTML = `
        <nav>Registro</nav>
        <form id="registerForm" class="card">
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="password" required />
            <select name="role" required>
                <option value="visitor">Visitor</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
            <p>do you already have account? <a href="#login">Login</a></p>
        </form>
    `;

    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;

        const user = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            password: form.password.value.trim(),
            role: form.role.value,
        };

        if (!isValidName(user.name)) return alert("Invalid name (only letters)");
        if (!isValidEmail(user.email)) return alert("Invalid email");
        if (!isValidPassword(user.password)) return alert("Password minimun of 4 characteres");

        try {
            const { data } = await axios.get(`${API_URL}?email=${user.email}`);
            if (data.length > 0) return alert("The email have registered");

            await axios.post(API_URL, user);
            alert("Registration successful");
            window.location.hash = "#login";
        } catch (err) {
            alert("Register failed");
        }
    });
}

