import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Generator from "./pages/Generator";
import Chat from "./pages/Chat";
import Home from "./pages/Home"

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/consult" Component={Chat} />
        <Route exact path="/generate" Component={Generator} />

      </Routes>
    </Router>
  )
}

export default App
