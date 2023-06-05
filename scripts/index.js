const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('booksContainer');

let books = [];
let bookId = 0;

const resetForm = () => {
  title.value = '';
  author.value = '';
};
const saveToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};
const removeAllBooks = () => {
  booksContainer.innerHTML = '';
};
const createBookList = () => {
  books.forEach((book) => {
    const bookElement = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const removeButton = document.createElement('button');
    const bottomLine = document.createElement('hr');
    bookAuthor.innerHTML = book.author;
    bookTitle.innerHTML = book.title;
    removeButton.innerHTML = 'remove';
    removeButton.addEventListener('click', () => {
      books = books.filter((item) => item.id !== book.id);
      removeAllBooks();
      createBookList();
      saveToLocalStorage();
    });
    bookElement.appendChild(bookTitle);
    bookElement.appendChild(bookAuthor);
    bookElement.appendChild(removeButton);
    bookElement.appendChild(bottomLine);

    booksContainer.appendChild(bookElement);
  });
};
form.addEventListener('submit', (event) => {
  event.preventDefault();

  books.push({ title: title.value, author: author.value, id: bookId });
  bookId += 1;
  removeAllBooks();
  createBookList();
  resetForm();
  saveToLocalStorage();
});

// read from local storage
const getBooksFromStorage = () => {
  const savedItem = localStorage.getItem('books');
  if (savedItem) {
    books = JSON.parse(savedItem);
    createBookList();
  }
};
window.addEventListener('load', getBooksFromStorage);
