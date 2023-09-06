import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
function App() {
  const { user } = useSelector(state => state.user);
  const [mode, setMode] = useState(localStorage.getItem('mode'));

  const handleDarkMode = (changedMode) => {
    setMode(changedMode);
    localStorage.setItem('mode', changedMode);
  }

  return (
    <div className={`${mode === 'dark' ? 'dark' : 'light'}`}>
      <BrowserRouter>
        <Header mode={mode} handleDarkMode={handleDarkMode} name={user?.name} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
        {/* <AddTaskBtn /> */}
        <Toaster
          position='top-center'
          reverseOrder={false}
          delay={1000}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
