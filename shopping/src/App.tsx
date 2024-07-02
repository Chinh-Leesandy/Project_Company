import React from 'react';
import { Header } from './layouts/header/Header';
import Routers from './routers/Routers';
import { Footer } from './layouts/footer/Footer';
import { ToastContainer } from 'react-toastify';
const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <Routers/>
      <Footer/>
      <ToastContainer/>
    </div>
  );
};

export default App;
