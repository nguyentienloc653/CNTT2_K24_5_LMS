import './Elearning.css';
import logo from '../img/mankailogo.png';
import searchIcon from '../img/search-normal.png';
import avatarImg from '../img/Avatar.png';
import notification from '../img/notification.png';
import iconHome from '../img/home2.png';
import iconBook from '../img/book (1).png';

import { useNavigate } from 'react-router-dom';
import QuestionStudent from './QuestionStudent';

export default function Quizz() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="elearning-home-container">
                <header className="elearning-header">
                    <div className="elearning-header-left">
                        <img
                            src={logo}
                            alt="Logo"
                            className="elearning-logo"
                            onClick={() => navigate('/')}
                        />

                        <nav className="elearning-nav">
                            <span className="elearning-nav-item active">
                                <img
                                    src={iconHome}
                                    alt="Home"
                                    onClick={() => navigate('/HomePage')}
                                />{' '}
                                Trang chủ
                            </span>
                            <span
                                className="elearning-nav-item"
                                onClick={() => navigate('/Article')}
                            >
                                <img src={iconBook} alt="Blog" /> Bài viết
                            </span>
                        </nav>
                    </div>

                    <div className="elearning-header-actions">
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="elearning-icon"
                        />
                        <img
                            src={notification}
                            alt="Notification"
                            className="elearning-icon"
                        />
                        <img
                            src={avatarImg}
                            className="elearning-avatar"
                            alt="Avatar"
                        />
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <div className="elearning-elearning-layout">
                    {/* LEFT */}
                    <main className="elearning-elearning-main">
                        {/* Breadcrumb */}
                        <nav className="elearning-breadcrumb">
                            Trang chủ <span>/</span> Web Frontend Fundamental
                        </nav>

                        <QuestionStudent />
                    </main>

                    {/* RIGHT */}
                    <aside className="elearning-elearning-sidebar">
                        <h3 className="elearning-sidebar-title">
                            Danh sách bài học
                        </h3>

                        <div className="elearning-session">
                            <h4>Session 1: Từ vựng</h4>
                            <ul>
                                <li className="elearning-active">
                                    Form & Table
                                </li>
                                <li>Luyện tập Function</li>
                                <li>Tổng quan về Git</li>
                                <li
                                    onClick={() => navigate('/quiz')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Quiz JS cơ bản
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
