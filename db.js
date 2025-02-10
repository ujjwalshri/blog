let db;
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("blogDB", 3);

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "username" }); // Removed autoIncrement
      }
      if (!db.objectStoreNames.contains("blogs")) {
        db.createObjectStore("blogs", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      reject(event.target.error); // Provide error details
    };
  });
};

// Open the database on script load
document.addEventListener("DOMContentLoaded", async () => {
  db = await openDB();
});

export const addBlog = (blog, username) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["blogs"], "readwrite");
    const store = transaction.objectStore("blogs");
    const request = store.add(blog);

    request.onsuccess = (e) => {
      // Ensure blog.id is set before calling updateUser
      const blogID = e.target.result; // Get the generated blog ID from the request result

      const userTransaction = db.transaction(["users"], "readwrite");
      const userStore = userTransaction.objectStore("users");

      const getUserRequest = userStore.get(blog.userID);
      getUserRequest.onsuccess = function (event) {
        const savedUser = event.target.result;
        console.log(savedUser);

        // Ensure that the correct blogID is passed
        updateUser(username, blogID);
        resolve("Blog added successfully");
      };

      getUserRequest.onerror = function () {
        reject("Error retrieving user");
      };
    };

    request.onerror = () => reject("Error adding blog");
  });
};

async function updateUser(username, blogID) {
  try {
    if (!db) {
      db = await openDB(); // Open the DB if not already opened
    }

    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");

    const getUserRequest = store.get(username);

    getUserRequest.onsuccess = function (event) {
      const user = event.target.result;
      if (user) {
        user.blogs.push(blogID);
        const updateRequest = store.put(user);
        localStorage.setItem("username", JSON.stringify(user));
        updateRequest.onsuccess = function () {
          alert("User updated successfully!");
        };

        updateRequest.onerror = function () {
          alert("Error updating user");
        };
      } else {
        alert("User not found");
      }
    };

    getUserRequest.onerror = function () {
      alert("Error retrieving user");
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

export const getUser = (username) => {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["users"], "readonly");
    let store = transaction.objectStore("users");
    let request = store.get(username);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching user");
  });
};

const addUser = (user) => {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["users"], "readwrite");
    let store = transaction.objectStore("users");
    let request = store.add(user);

    request.onsuccess = () => resolve("User registered successfully");
    request.onerror = () => reject("Error adding user");
  });
};
function encodePassword(password) {
  var encodedPassword = btoa(password);
  return encodedPassword;
}
export const registerUser = async function (
  firstName,
  lastName,
  username,
  password,
  role
) {
  try {
    if (!db) {
      db = await openDB();
    }

    const existingUser = await getUser(username);
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (existingUser) {
      alert("User already exists");
      return;
    }
    console.log(role);
    const hashedPassword = encodePassword(password);
    const newUser = {
      firstName,
      lastName,
      username,
      password,
      createdAt: new Date(),
      blogs: [],
      userRole: role,
    };

    const message = await addUser(newUser);

    alert(message);
    window.location.href = "/login.html";
  } catch (error) {
    console.error("Error:", error);
  }
};

export const loginUser = async function (username, password) {
  try {
    if (!db) {
      db = await openDB();
    }
    console.log(username);
    console.log(password);

    const user = await getUser(username);

    if (!user || user.password !== password) {
      alert("Invalid username or password");
      throw new Error("Invalid username or password");
    }
    localStorage.setItem("username", JSON.stringify(user));
    window.location.href = "/home.html";
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllBlogs = async () => {
  try {
    if (!db) {
      // If db is not initialized, wait for it to be ready
      db = await openDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["blogs"], "readonly");
      const store = transaction.objectStore("blogs");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result); // Resolve with all blogs
      request.onerror = () => reject("Error fetching blogs"); // Reject if there's an error
    });
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow error if db is not initialized or any issue occurs
  }
};

export const getBlog = async (blogID) => {
  try {
    if (!db) {
      db = await openDB();
    }
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["blogs"], "readonly");
      const store = transaction.objectStore("blogs");
      const request = store.get(blogID);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error fetching blog");
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
