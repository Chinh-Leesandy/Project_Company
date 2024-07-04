import React from 'react';
import Routers from './routers/Routers';
import { Footer } from './layouts/footer/Footer';
import { ToastContainer } from 'react-toastify';
import Header from './layouts/header/Header';
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
