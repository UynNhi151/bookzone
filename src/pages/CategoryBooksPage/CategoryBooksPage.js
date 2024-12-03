import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import "./CategoryBooksPage.css";

const CategoryBooksPage = () => {
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [category, setCategory] = useState(null); // State để lưu thông tin danh mục
  const [books, setBooks] = useState([]); // State để lưu danh sách sách
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    const fetchCategoryAndBooks = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        // Lấy thông tin danh mục theo categoryId từ API
        const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
        setCategory(categoryResponse.data); // Lưu dữ liệu danh mục vào state

        // Lấy danh sách sách theo categoryId từ API
        const booksResponse = await axios.get(`http://localhost:5000/api/books/categories/${categoryId}`);
        setBooks(booksResponse.data); // Lưu danh sách sách vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchCategoryAndBooks(); // Gọi API mỗi khi categoryId thay đổi
  }, [categoryId]); // Chạy lại mỗi khi categoryId thay đổi

  if (loading) return <div>Loading...</div>; // Hiển thị khi đang tải

  return (
    <div className="home">
      {category && (
        <div className="title">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      )}

      <div className="books">
        {books.length === 0 ? (
          <p>Không có sách nào trong danh mục này.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="card">
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
