const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('booksContainer');

const resetForm = () => {
  title.value = '';
  author.value = '';
};
class Book {
  constructor() {
    this.books = [];
    this.bookId = 0;
    this.getBooksFromStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeAllBooks(book) {
    booksContainer.innerHTML = '';
    this.books = this.books.filter((item) => item.id !== book.id);
    this.createBookList();
    this.saveToLocalStorage();
  }

  createBookList() {
    this.books.forEach((book) => {
      const bookElement = document.createElement('div');
      const bookTitle = document.createElement('p');
      const bookAuthor = document.createElement('p');
      const removeButton = document.createElement('button');
      const bottomLine = document.createElement('hr');
      bookAuthor.innerHTML = book.author;
      bookTitle.innerHTML = book.title;
      removeButton.innerHTML = 'remove';
      removeButton.addEventListener('click', () => this.removeAllBooks(book));
      bookElement.appendChild(bookTitle);
      bookElement.appendChild(bookAuthor);
      bookElement.appendChild(removeButton);
      bookElement.appendChild(bottomLine);

      booksContainer.appendChild(bookElement);
    });
  }

  formSubmitHandler() {
    this.books.push({
      title: title.value,
      author: author.value,
      id: this.bookId,
    });
    this.bookId += 1;
    booksContainer.innerHTML = '';
    this.createBookList();
    resetForm();
    this.saveToLocalStorage();
  }

  getBooksFromStorage() {
    const savedItem = localStorage.getItem('books');
    if (savedItem) {
      this.books = JSON.parse(savedItem);
      this.createBookList();
    }
  }
}
const newBook = new Book();
// console.log(newBook);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  newBook.formSubmitHandler();
});
