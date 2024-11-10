// API URLs
const topBooksAPI = "https://books-backend.p.goit.global/books/top-books";
const categoryAPI = "https://books-backend.p.goit.global/books/category-list";

// Dark mode functionality
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load dark mode preference
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  loadCategories();
  loadBooks();
});

// Load categories from API
async function loadCategories() {
  const response = await fetch(categoryAPI);
  const categories = await response.json();
  const categoryList = document.getElementById("category-list");

  categories.forEach(category => {
    const li = document.createElement("li");
    li.textContent = category.name;
    li.addEventListener("click", () => loadBooks(category.name));
    categoryList.appendChild(li);
  });
}

// Load books (all or by category)
async function loadBooks(category = null) {
  const url = category ? `${topBooksAPI}?category=${category}` : topBooksAPI;
  const response = await fetch(url);
  const books = await response.json();
  const bookContainer = document.getElementById("books");

  bookContainer.innerHTML = "";
  books.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    `;
    bookDiv.addEventListener("click", () => showBookDetails(book));
    bookContainer.appendChild(bookDiv);
  });
}

// Show book details in a modal
function showBookDetails(book) {
  const bookDetails = document.getElementById("book-details");
  bookDetails.innerHTML = `
    <h2>${book.title}</h2>
    <p>${book.description}</p>
    <img src="${book.image}" alt="${book.title}">
  `;
  document.getElementById("book-modal").style.display = "block";
}

// Close modals
document.getElementById("close-modal").onclick = () => {
  document.getElementById("book-modal").style.display = "none";
};
document.getElementById("close-auth").onclick = () => {
  document.getElementById("auth-modal").style.display = "none";
};

// Signup/Login functionality using Local Storage
document.getElementById("sign-up").onclick = () => {
  document.getElementById("auth-modal").style.display = "block";
};

document.getElementById("auth-form").addEventListener("submit", event => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate sign-up or login
  const savedPassword = localStorage.getItem(username);
  if (savedPassword) {
    if (savedPassword === password) {
      alert("Login successful!");
    } else {
      alert("Incorrect password!");
    }
  } else {
    localStorage.setItem(username, password);
    alert("Sign up successful!");
  }
  document.getElementById("auth-modal").style.display = "none";
});
