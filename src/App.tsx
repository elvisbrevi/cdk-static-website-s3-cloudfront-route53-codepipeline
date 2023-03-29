import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import { useState } from "react";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        <header 
          className={`bg-primary text-white p-4 flex justify-between items-center ${
            darkMode ? "dark:bg-dark-backgroundColor-primary" : ""
          }`}
        >
          <button
            className="text-secondary font-bold text-2xl focus:outline-none"
            onClick={toggleDarkMode}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <h2 className="text-2xl">Elvis Brevi</h2>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link className="text-white" to="/">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-white" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className={`p-4 ${darkMode ? "dark:bg-dark-backgroundColor-tertiary" : ""}`}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
