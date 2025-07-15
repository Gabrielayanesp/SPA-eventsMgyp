export function isValidName(name) {
    return /^[a-zA-Z\sáéíóúñÑ]+$/.test(name.trim());
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
    return password.length >= 4;
}
