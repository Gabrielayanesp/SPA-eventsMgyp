import axios from 'axios';
import { app } from './index.js';
import { renderEvents } from './events.js';

const API_URL = "http://localhost:3000/users";

export function renderDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.hash = "#login";
        return;
    }
    app.innerHTML = `
    <nav>CONTROL PANEL - ${user.role.toUpperCase()}</nav>
    <div class="card">
        <h2>Hello, ${user.name}.</h2>
        <button id="logoutBtn">Log out</button>
        ${
          user.role === "admin"
            ? `<button id="showUsersBtn">See registered users</button>`
            : ""
        }
    </div>
    <div id="contentArea"></div>
    <div id="modalUsers" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); justify-content:center; align-items:center;">
      <div style="background:white; padding:2rem; border-radius:8px; max-width:600px; width:90%;">
        <h3>Registered users</h3>
        <ul id="userList"></ul>
        <button id="closeModal">Close</button>
      </div>
    </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.hash = "#login";
    });
    
    if (user.role === "admin") {
        document.getElementById("showUsersBtn").addEventListener("click", loadUsers);
        document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("modalUsers").style.display = "none";
        });

        async function loadUsers() {
            const { data: users } = await axios.get(API_URL);
            const list = document.getElementById("userList");
            list.innerHTML = users.map(u => `
            <li><strong>${u.name}</strong> - ${u.email} - ${u.role}</li>
            `).join("");
            document.getElementById("modalUsers").style.display = "flex";
        }
    }
    const contentArea = document.getElementById("contentArea");
    renderEvents(contentArea);

    
    

}