import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Project';
import Contact from './components/Contact'; // Perbaiki path di sini
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div><About /><Projects /><Contact /></div>} />
        <Route path="/admin" element={<Admin />} /> {/* Perbaikan di sini */}
      </Routes>
    </Router>
  );
}

export default App;
