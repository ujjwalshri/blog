
import { getAllBlogs } from "./db.js";

const user = JSON.parse(localStorage.getItem("username"));
const logoutButton = document.getElementById("logout-button");


logoutButton.addEventListener("click", function(){
    localStorage.removeItem("username");
    window.location.href = "/login.html";
});


console.log(user);

if(!user){
    window.location.href = "/login.html";
}

const welcomePara = document.getElementById("welcome-text").innerHTML = `Welcome ${user.firstName} ${user.lastName}`;


document.addEventListener("DOMContentLoaded", async function(){
    const title = document.getElementById("title");
    const content = document.getElementById("content"); 
    const blogs = await getAllBlogs();
    
    console.log(blogs);
    blogs.map((blog, id) =>{
        const allBlogsDiv = document.getElementById("allBlogs");
        
        const blogDiv = document.createElement("div");
        blogDiv.className = "blog";
        blogDiv.innerHTML = `<div><h2 id="blog-title">${blog.title}</h2>
                            <div id="content-div"><p>${blog.content}</p></div>
                            <p id="username">By ${blog.userID}</p> <div>`;
        allBlogsDiv.appendChild(blogDiv);
    })
});