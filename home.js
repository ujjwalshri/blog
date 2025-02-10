import { getAllBlogs } from "./db.js";

const user = JSON.parse(localStorage.getItem("username"));
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("username");
  window.location.href = "/login.html";
});

console.log(user);

if (!user) {
  window.location.href = "/login.html";
}

function calculateUserSince() {
  const userSince = new Date(user.createdAt);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - userSince.getTime());
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return days;
}

document.getElementById("welcome-text").innerHTML = `${user.firstName} ${
  user.lastName
} (${user.userRole}) user since ${calculateUserSince()} days`;

document.addEventListener("DOMContentLoaded", async function () {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const blogs = await getAllBlogs();

  console.log(blogs);
  blogs.map((blog, id) => {
    const allBlogsDiv = document.getElementById("allBlogs");

    const blogDiv = document.createElement("div");
    blogDiv.className = "blog";
    blogDiv.innerHTML = `<div><h2 id="blog-title">${blog.title}</h2>
                            <div id="content-div"><p>${blog.content}</p></div>
                            <p id="username"> ${
                              blog.userID === user.username
                                ? "Written by you"
                                : blog.userID
                            }</p> 
                            <div>`;
    allBlogsDiv.appendChild(blogDiv);
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const loggedInUser = JSON.parse(localStorage.getItem("username"));
});
