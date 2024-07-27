import Header from "./components/header/Header";

import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";

import "./App.css";
import BookList from "./components/book-list/BookList";
import AddBook from "./components/book-add/AddBook";

import BookDetails from "./components/book-details/BookDetails";
import BookEdit from "./components/book-edit/BookEdit";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import { AuthProvider } from "./contexts/authContext";
import UserProfile from "./components/user/user-profile/UserProfile";
import EditUser from "./components/user/user-profile-edit/EditUser";




function App() {
  return (
    <AuthProvider>
      <div className="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/books/:bookId/edit" element={<BookEdit />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/user-profile/:userId/edit" element={<EditUser />} />
          </Routes>

          <Footer />
        </main>
        
      </div>
    </AuthProvider>
  );
}

export default App;
