import { renderLogin } from './login.js';
import { renderRegister } from './register.js';
import { renderDashboard } from './dashboard.js';
import { renderVisitorView } from "./events.js";

export function router () {
    const route = window.location.hash || '#login';
    switch (route) {
        case '#login':
            renderLogin();
            break;
        case '#register':
            renderRegister();
            break;    
        case '#dashboard':
            renderDashboard();
            break;
        default:
            renderLogin();
    }

    
}