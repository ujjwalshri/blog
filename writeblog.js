import { addBlog } from "./db.js";

if (!localStorage.getItem("username")) {
  window.location.href = "/login.html";
}
const user = JSON.parse(localStorage.getItem("username"));
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById(
    "welcome-text"
  ).innerHTML = `Welcome ${user.firstName} ${user.lastName}`;
});

document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("username");
  window.location.href = "/login.html";
});


function countWords(content){
  const words = content.split(" ");
  return words.length;
}





const submitBlog = document.getElementById("submit-Blog");
console.log(document.getElementById("submit-Blog"));
submitBlog.addEventListener("click", async function () {
  const title = document.getElementById("title").value.trim();
  if (!title) {
    alert("Title is required");
    return;
  }
  const content = document.getElementById("blog").value.trim();
  if (!content) {
    alert("Content is required");
    return;
  }
  if(countWords(content) < 20){
    alert(`Content must be at least 20 words long  ${countWords(content)}/20`);
    return;
  }
  const loggedInUser = JSON.parse(localStorage.getItem("username"));
  const blog = {
    userID: loggedInUser.username,
    title,
    content,
  };
  
  const message = await addBlog(blog, loggedInUser.username);
  alert(message);
});
