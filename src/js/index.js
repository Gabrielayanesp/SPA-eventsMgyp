import Swal from 'sweetalert2';
import { router } from './router.js'

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export const API_URL = "http://localhost:3000/users";
export const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user && location.pathname.includes("index")) {
        location.href = "dashboard.html";
    }
    if (user && location.pathname.includes("dashboard")) {
      location.href = "index.html";
    }
    if (document.querySelector("#user-name") && user) {
      document.querySelector("#user-name").textContent = user.name;
    }

    const logoutBtn = document.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        location.href = "index.html";
      });
    }
})

function clearData () {
    Swal.fire({
      title: "Delete your local dates?",
      text: "This does not delete tasks from the server.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Ready", "LocalStorage clean", "success");
      }
    });
}

export function isValidName(name) {
    return /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(name.trim());
}

export function isValidAge(age) {
  const num = Number(age);
  return Number.isInteger(num) && num > 0 && num < 130;
}

export function isValidEmail(email) {
  return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export function isValidText(text) {
  return /^[a-zA-Z0-9\s.,:;!?¡¿()'"%-]+$/.test(text.trim());
}