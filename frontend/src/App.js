import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddTaskBtn from "./components/AddTaskBtn";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
function App() {
  const { user } = useSelector(state => state.user);
  const [darkMode, setDarkMode] = useState(false);

  const checkTheme = () => {
    const isDarkMode = localStorage.getItem("darkMode");
    setDarkMode(isDarkMode);
  }
  const handleDarkMode = (isDarkMode) => {
    setDarkMode(isDarkMode);
    localStorage.setItem("darkMode" , isDarkMode);
  }

  useEffect(() => {
    checkTheme();
  },[]);
  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <BrowserRouter>
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} name={user.name} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        {/* <AddTaskBtn /> */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          delay={1000}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
