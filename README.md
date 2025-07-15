# SPA Event Manager - eventsMgyp
This project is a SPA (Single Page Application), event management application that uses DOM, CRUD, Json-Server and Vite. which allows to use:

- User registration and login.
- User roles (admin and visitor).
- CRUD events with status ("In progress", "Completed").
- Logged user display only for administrators (modal window).
- Data persisted using JSON Server as the backend.

## Technologies

- Vite
- JavaScript
- Axios
- JSON Server

## Instalation

1. Open the folder in Visual Studio Code
   or
1. Cloe the repository.
2. Install dependencies:

 ##  Start

  ### 1. Install dependencies
  
  ```bash
  npm i
  ```
  To installvite dependencies
  
  ```bash
  npm install -g json-server
  ```
  To bring up the server globally
  
  ### 2. Start the development server
  
  ```bash
  npm run dev
  ```
  To start the vite host
  
  ```bash
  json-server --watch database.json --port 3000
  or
  json-server database.json --port 3000
  ```
  to bring up the server globally
  
  ### 2. Install extras


```bash
npm install axios
npm install sweetalert2
```


---
Made with Maria Gabriela Yanes
clan: cienaga

