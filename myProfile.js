import { getAllBlogs } from "./db.js";

const loggedInUser = JSON.parse(localStorage.getItem("username"));

if (!loggedInUser) {
  window.location.href = "/login.html";
}

document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("username");
  window.location.href = "/login.html";
});

function calculateUserSince() {
  const userSince = new Date(loggedInUser.createdAt);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - userSince.getTime());
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return days;
}

document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("user-details")
    .appendChild(
      document.createTextNode(
        `Welcome ${loggedInUser.firstName} ${loggedInUser.lastName} (${
          loggedInUser.userRole
        }) user since ${calculateUserSince()} days`
      )
    );
  const allBlogs = await getAllBlogs();

  console.log(allBlogs);
  const myBlogs = [];
  allBlogs.map((blog) => {
    if (blog.userID === loggedInUser.username) {
      myBlogs.push(blog);
    }
  });

  console.log(myBlogs);
  myBlogs.forEach((blog) => {
    const allBlogsDiv = document.getElementById("all-blogs");

    const blogDiv = document.createElement("div");
    blogDiv.className = "blog";
    blogDiv.innerHTML = `<div><h2 id="blog-title">${blog.title}</h2>
                                <div id="content-div"><p>${
                                  blog.content
                                }</p></div>
                                <p id="username">By ${
                                  blog.userID === loggedInUser.username
                                    ? "written by you"
                                    : blog.userID
                                }</p> 
                                
                                <div>`;
    allBlogsDiv.appendChild(blogDiv);
  });
});

