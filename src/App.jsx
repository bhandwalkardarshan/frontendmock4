// App.js
import './App.css';
import React, { useState } from 'react'
import AddBook from './components/AddBook'
import MyBook from './components/MyBook'

function App() {
  const [books, setBooks] = useState([])

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook])
  }

  return (
    <div>
      <h1>Book Management App</h1>
      <AddBook onAddBook={handleAddBook} />
      <MyBook />
    </div>
  );
}

export default App;
