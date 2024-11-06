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
import AuthGuard from "./components/guards/AuthGuard";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import NotFound from "./components/not-found/NotFound";
import AuthRedirect from "./components/guards/AuthRedirect";
import BookContent from "./components/user/user-profile/book-page-by-page/BookContent";

function App() {
  return (
    <AuthProvider>
      <div className="box">
        <Header />
        <main id="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:bookId" element={<BookDetails />} />

              <Route element={<AuthRedirect />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<AuthGuard />}>
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/books/:bookId/edit" element={<BookEdit />} />
                <Route
                  path="/user-profile/:userId/edit"
                  element={<EditUser />}
                />
                <Route path="/user-profile/:userId/:bookId" element={<BookContent  />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>

          <Footer />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
