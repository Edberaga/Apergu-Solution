import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    published_date: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBooks(response.data);
        toast.success(`Books loaded succesfully!`);
      })
      .catch(error => toast.error('Error fetching data:', error));
  }, []);

  const addBook = () => {
    axios.post('http://localhost:3001/books', newBook)
      .then(response => { 
        setBooks([...books, response.data]);
        toast.success(`Book "${newBook.title}" has been added succesfully!`);
      })
      .catch(error => toast.error("Error adding data", error));
  };

  const deleteBook = (id) => {
    const book = books.find(b => b.id === id);
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
        toast.success(`Book "${book.title}" deleted successfully!`);
      })
      .catch(error => toast.error('Error deleting book: ' + error.message));
  };

  return (
  <div>
    <h1>Library</h1>
    <ul className='library-list'>
      {books.map(book => (
        <li key={book.id}>
          <p>{book.title} by {book.author} ({book.published_date})</p>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
    <h2>Add a new book</h2>
    <form className='library-form' onSubmit={(e) => { e.preventDefault(); addBook(); }}>
      <div className="form-input">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="date"
          value={newBook.published_date}
          onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
  );
}

export default App;