import "./Article.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/pagination";

import logo from "../img/mankailogo.png";
import searchIcon from "../img/search-normal.png";
import avatarImg from "../img/Avatar.png";
import notification from "../img/notification.png";
import makailogo from "../img/Frame 54.png";
import iconAddress from "../img/Featured icon.png";
import iconHotline from "../img/Featured icon (1).png";
import iconEmail from "../img/Featured icon (2).png";
import iconfacebook from "../img/facebook.png";
import iconyoutube from "../img/youtube.png";
import iconHome from "../img/home2.png";
import iconBook from "../img/book (1).png";
import clock from "../img/clock2.png";
import iconBook2 from "../img/book2.png";
import banner from "../img/back ground.png";

export default function Article() {
  const navigate = useNavigate();

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalItems = 30;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ===== Fake data =====
  const blogs = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    category: "Front-End",
    title: "Authentication & Authorization trong ReactJS",
    description:
      "Chào bạn! Nếu bạn đã làm việc với React, chắc hẳn bạn đã biết tới Dev Mode...",
    time: "15–17 phút đọc",
    views: "8 tháng trước",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
  }));

  // ===== Paginated data =====
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="article-home-container">
      {/* ===== HEADER ===== */}
      <header className="article-header">
        <div className="article-header-left">
          <img
            src={logo}
            alt="Logo"
            className="article-logo"
            onClick={() => navigate("/")}
          />

          <nav className="article-nav">
            <span
              className="article-nav-item active"
              onClick={() => navigate("/HomePage")}
            >
              <img src={iconHome} alt="Home" /> Trang chủ
            </span>
            <span className="article-nav-item">
              <img src={iconBook} alt="Blog" /> Bài viết
            </span>
          </nav>
        </div>

        <div className="article-header-actions">
          <img src={searchIcon} alt="Search" className="article-icon" />
          <img src={notification} alt="Notification" className="article-icon" />
          <img src={avatarImg} alt="Avatar" className="article-avatar" />
        </div>
      </header>

      {/* ===== PAGE ===== */}
      <div className="article-blog-page">
        <div className="article-blog-banner">
          <img src={banner} alt="Banner" />
          <p className="article-breadcrumb">Trang chủ / Bài viết</p>
          <h1>Bài viết</h1>
        </div>

        <div className="article-blog-container">
          <div className="article-blog-header">
            <h3>
              Tất cả bài viết <span>({totalItems})</span>
            </h3>
            <select>
              <option>Front-End</option>
              <option>Back-End</option>
            </select>
          </div>

          <hr />

          {/* ===== BLOG GRID ===== */}
          <div className="article-blog-grid">
            {currentBlogs.map((item) => (
              <div
                key={item.id}
                className="article-blog-card"
                onClick={() => navigate("/ArticleDetails")}
              >
                <img src={item.image} alt={item.title} />

                <div className="article-blog-card-content">
                  <span className="article-tag">{item.category}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>

                  <div className="article-blog-meta">
                    <span className="article-meta-item">
                      <img src={clock} alt="" /> {item.views}
                    </span>
                    <span className="article-meta-item">
                      <img src={iconBook2} alt="" /> {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PAGINATION ===== */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="article-site-footer">
        <div className="article-footer-top">
          <img src={makailogo} alt="Mankai Academy" />
          <h2>
            MANKAI ACADEMY - HỌC VIỆN ĐÀO TẠO PHÁT TRIỂN TIẾNG NHẬT THỰC CHIẾN
          </h2>
        </div>

        <div className="article-footer-body">
          <div className="article-col contact">
            <h3>THÔNG TIN LIÊN HỆ</h3>
            <ul>
              <li>
                <img src={iconAddress} alt="" /> Hà Nội
              </li>
              <li>
                <img src={iconHotline} alt="" /> 0835 662 538
              </li>
              <li>
                <img src={iconEmail} alt="" /> support@mankai.edu.vn
              </li>
            </ul>
          </div>

          <div className="article-col social">
            <h3>THEO DÕI</h3>
            <img src={iconfacebook} alt="Facebook" />
            <img src={iconyoutube} alt="Youtube" />
          </div>

          <div className="article-col quote">
            <blockquote>
              “Hạnh phúc là điểm khởi đầu của giáo dục và cũng là đích đến cuối
              cùng.”
            </blockquote>
          </div>
        </div>

        <div className="article-footer-bottom">© 2024 By Mankai Academy</div>
      </footer>
    </div>
  );
}
