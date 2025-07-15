import axios from "axios";
import Swal from "sweetalert2";

const API_EVENTS = "http://localhost:3000/events";

export async function renderEvents(container) {
    const user = JSON.parse(localStorage.getItem("user"));
    container.innerHTML = `
        ${user.role === "admin"? `
            <h3>Create event</h3>
            <form id="eventForm" class="card">
                <input type="text" name="title" placeholder="Title" required />
                <input type="date" name="date" required />
                <input type="text" name="location" placeholder="Location" required />
                <textarea name="description" placeholder="Description" rows="3" required></textarea>
                <select name="status" required>
                <option value="En proceso">In progress</option>
                <option value="Finalizado">Finalized</option>
                </select>
                <button type="submit">Create event</button>
            </form>
        `: ""}
            <h3>Existing eveents</h3>
            <ul id="eventList"></ul>
    `;

    if (user.role === "admin") {
        document.getElementById("eventForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;

            const newEvent = {
            title: form.title.value,
            date: form.date.value,
            location: form.location.value,
            description: form.description.value,
            status: form.status.value,
            };

            await axios.post(API_EVENTS, newEvent);
            form.reset();
            Swal.fire("Succes", "Event created successfull", "success");
            loadEvents();
        });
  }

    loadEvents();

    async function loadEvents() {
        const { data: events } = await axios.get(API_EVENTS);
        const list = document.getElementById("eventList");
        list.innerHTML = events
          .map(
            (e) => `
            <li class="card">
            <strong>${e.title} - </strong> ${e.date}<br />
            <em>${e.location}</em><br />
            <p>${e.description}</p>
            <p><strong>State:</strong> ${e.status}</p>
            ${
              user.role === "admin"
                ? `
                <button class="editBtn" data-id="${e.id}">Edit</button>
                <button class="deleteBtn" data-id="${e.id}">Delete</button>
                <button class="statusBtn" data-id="${e.id}" data-status="${e.status}">Change status</button>
            `
                : `
            `
            }
      </li>
    `
          )
          .join("");

        if (user.role === "admin") {
            document.querySelectorAll(".deleteBtn").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    const confirm = await Swal.fire({
                        title: "Delete event?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete",
                    });
                    if (confirm.isConfirmed) {
                        await axios.delete(`${API_EVENTS}/${id}`);
                        Swal.fire("Delete", "Delete event", "success");
                        loadEvents();
                    }
                });
            });

            document.querySelectorAll(".editBtn").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    const { data: event } = await axios.get(`${API_EVENTS}/${id}`);

                    const { value: formValues } = await Swal.fire({
                        title: "Edit event",
                        html: `
                            <input id="swal-title" class="swal2-input" value="${event.title}">
                            <input id="swal-date" type="date" class="swal2-input" value="${event.date}">
                            <input id="swal-location" class="swal2-input" value="${event.location}">
                            <textarea id="swal-desc" class="swal2-textarea">${event.description}</textarea>
                            <select id="swal-status" class="swal2-select">
                                <option ${event.status === "In progress" ? "selected" : ""}>In progress</option>
                                <option ${event.status === "Finalizade" ? "selected" : ""}>Finalizade</option>
                            </select>
                        `,
                        focusConfirm: false,
                        showCancelButton: true,
                        preConfirm: () => {
                            return {
                                title: document.getElementById("swal-title").value,
                                date: document.getElementById("swal-date").value,
                                location: document.getElementById("swal-location").value,
                                description: document.getElementById("swal-desc").value,
                                status: document.getElementById("swal-status").value,
                            };
                        },
                    });

                    if (formValues) {
                        await axios.put(`${API_EVENTS}/${id}`, formValues);
                        Swal.fire("Actualizade", "Modified event", "success");
                        loadEvents();
                    }
                });
            });
        }

        document.querySelectorAll(".statusBtn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                const currentStatus = btn.dataset.status;
                const { value: newStatus } = await Swal.fire({
                    title: "Change status",
                    input: "select",
                    inputOptions: {
                        "In progess": "In progress",
                        Finalizado: "Finalizade",
                    },
                    inputValue: currentStatus,
                    showCancelButton: true,
                });
                if (newStatus) {
                    await axios.patch(`${API_EVENTS}/${id}`, { status: newStatus });
                    Swal.fire("Actualizade", "Change status", "success");
                    loadEvents();
                }
            });
        });
    }
}

//////////

export function renderVisitorView() {
  app.innerHTML = `
    <h2>Eventos disponibles</h2>
    <button id="logoutBtn">Cerrar sesión</button>
    <ul id="eventList"></ul>
    `;

  document.getElementById("logoutBtn").addEventListener("click", logout);

  async function loadEvents() {
    const user = getUser();
    const { data: events } = await axios.get(API);
    const list = document.getElementById("eventList");
    list.innerHTML = "";

    events.forEach((event) => {
      const isRegistered = event.usersRegistered?.includes(user.id);
      const li = document.createElement("li");
      li.innerHTML = `
        ${event.name} - ${event.date}
        <button data-id="${event.id}">
            ${isRegistered ? "Darse de baja" : "Registrarse"}
        </button>
        `;

      const button = li.querySelector("button");
      button.addEventListener("click", async () => {
        const updatedEvent = { ...event };

        if (!updatedEvent.usersRegistered) updatedEvent.usersRegistered = [];

        if (isRegistered) {
          // Desregistrar
          updatedEvent.usersRegistered = updatedEvent.usersRegistered.filter(
            (id) => id !== user.id
          );
          alert("Te has dado de baja del evento.");
        } else {
          // Registrar
          updatedEvent.usersRegistered.push(user.id);
          alert("¡Registrado exitosamente!");
        }

        await axios.put(`${API}/${event.id}`, updatedEvent);
        loadEvents(); // Recargar la lista
      });

      list.appendChild(li);
    });
  }

  loadEvents();
}