import React from 'react';
import { Header } from './layouts/header/Header';
import Routers from './routers/Routers';
import { Footer } from './layouts/footer/Footer';
const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <Routers/>
      <Footer/>
    </div>
  );
};

export default App;
