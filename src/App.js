import "./App.css";

import "./scss/app.scss";
import Home from "./pages/Home";

import React, { useState } from "react";
import Header from "./components/Header";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import { Routes, Route } from "react-router-dom";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="App">
          <div className="wrapper">
            <Header />
            <div className="content">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/pizza/:id" element={<FullPizza />} />
                  <Route path="*" element={<NotFoundBlock />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
    </SearchContext.Provider>
  );
}

export default App;
