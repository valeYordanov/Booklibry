import Header from "./components/header/Header";

import { Routes,Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";

import "./App.css"
import BookList from "./components/book-list/BookList";
import AddBook from "./components/book-add/AddBook";

import BookDetails from "./components/book-details/BookDetails";




function App() {

  return <div className="box">

    <Header/>
    <main id="main-content">
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/books" element={<BookList/>}/>
       <Route path="/add-book" element={<AddBook/>}/>
     </Routes>
     <BookDetails/>
     <Footer/>
    </main>
  </div>;
}

export default App;
