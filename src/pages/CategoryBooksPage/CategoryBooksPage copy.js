import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import "./Book.css"; 

const CategoryBooksPage = () => {
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/categories/${categoryId}`);
        setBooks(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId]); // Khi categoryId thay đổi, gọi lại API

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Sách trong danh mục</h1>
      <div className="book-list">
        {books.length === 0 ? (
          <p>Không có sách nào trong danh mục này.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="card book">
              <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.name} className="card-img-top" />
              </Link>
              <div className="card-body book-desc">
                <Link to={`/book/${book._id}`}>
                  <div className="card-title">
                    <strong>{book.name}</strong>
                  </div>
                  <div className="card-text">
                    <Rating
                      value={book.rating}
                      text={` ${book.numReviews} reviews`}
                      color={"#ede1d4"}
                    />
                  </div>
                  <h3 className="card-text">${book.price}</h3>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryBooksPage;
