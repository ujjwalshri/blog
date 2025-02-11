
import { getAllBlogs, getUser } from "./db.js";

document.addEventListener  ("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    
// Get the userID from the URL
    const userID = params.get('userID');
    const allBlogs = await getAllBlogs();

    const pageTitle = document.getElementById("page-title").innerHTML = `${userID}'s blogs`;

   const currentUserBlogs = [];
    allBlogs.map((blog) => {
        if (blog.userID === userID) {
            currentUserBlogs.push(blog);
        }
    });
    
    console.log(currentUserBlogs);
    currentUserBlogs.reverse().forEach((blog) => {
        const allBlogsDiv = document.getElementById("all-blogs");
    
        const blogDiv = document.createElement("div");
        blogDiv.className = "blog";
        blogDiv.innerHTML = `<div><h2 id="blog-title">${blog.title}</h2>
                                    <div id="content-div"><p>${
                                      blog.content
                                    }</p></div>
                                    <p id="username"> ${
                                      blog.userID === userID
                                        ? `written by ${userID}`
                                        : ``
                                    }</p> 
                                   
                                    <div>`;
        allBlogsDiv.appendChild(blogDiv);
    
        // const deleteButton = blogDiv.querySelector(".delete-btn");
        // deleteButton.addEventListener("click", async function () {
        //   const blogId = deleteButton.getAttribute("data-id");
        //   console.log(blogId);
        //    const message = await deleteBlog(blogId, loggedInUser.username);
        //   alert(message);
          
        //   allBlogsDiv.removeChild(blogDiv);
        // });
        
      });

});