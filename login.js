import { loginUser } from "./db.js";

const loggedInUser = localStorage.getItem("username");

if(loggedInUser){
    window.location.href = "/home.html";
}

document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    console.log(username, password);

    await loginUser(username, password);

});