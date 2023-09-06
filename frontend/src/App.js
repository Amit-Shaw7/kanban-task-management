import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';

const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

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
        <Suspense fallback={<Loader/>}>
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
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
