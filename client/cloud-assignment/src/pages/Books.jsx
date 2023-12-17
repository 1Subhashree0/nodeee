import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
     <h1>Book Library</h1>
<div className="books">
  <table className="bookTable">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
    {
      books.map((book) => (
        <tr key={book.id} className="bookRow">
          {/* <td>
            <img src={book.cover} alt="" />
          </td> */}
          <td>{book.title}</td>
          <td>{book.description}</td>
          <td>${book.price}</td>
          <td>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <br></br>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <button className="addHome" style={{ padding: '10px' }}>
        <Link to="/add" style={{ color: "inherit", textDecoration: "none",}}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
