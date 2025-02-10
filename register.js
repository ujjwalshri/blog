import { registerUser } from "./db.js";
console.log(document.getElementById("register-form"));

const loggedInUser = localStorage.getItem("username");

if (loggedInUser) {
  window.location.href = "/home.html";
}

document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();

    console.log(firstName, lastName, username, password, role);

    const registered = await registerUser(
      firstName,
      lastName,
      username,
      password,
      role
    );
    console.log(registered);
  });
