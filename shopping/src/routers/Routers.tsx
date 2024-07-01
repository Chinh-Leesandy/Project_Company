import { Suspense, lazy } from "react";
import {  Route, Routes } from "react-router-dom";
import { Contact } from "../components/contacts/Contact";
import { Imformation } from "../components/imfomation/Imformation";

const Home = lazy(() => import("../layouts/home/Home"));
const ProductList = lazy(() => import("../components/products/productlist/ProductList"));
const ProductDetail = lazy(() => import("../components/products/productdetail/ProductDetail"));
const Carts = lazy(() => import("../components/carts/Carts"));
const Routers = () => {
  return (
    <Suspense fallback={<div className="text-center" style={{margin: '50vh'}}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>}> 
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/product" element = {<ProductList/>}/>
        <Route path="/product/:id" element = {<ProductDetail/>}/>
        <Route path='/cart' element={<Carts/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/info' element={<Imformation/>}/>
      </Routes>
    </Suspense>
  )
}

export default Routers;
