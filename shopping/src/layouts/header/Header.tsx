import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header px-3 d-flex justify-content-between align-items-center">
          <div className="store">
            <img
              className='rounded-circle icon_store'
              src="https://img.freepik.com/premium-vector/illustration-vector-graphic-store-icon_717549-794.jpg"
              alt="Store Icon"
            />
          </div>
      <div className="header_top">
        <div className="info">
          <div className="info-store d-flex justify-content-end">
            <p className="mb-0">
              <span>Địa chỉ: Hà Đông - Hà Nội |</span>
              <span>Số điện thoại: 0315648451 |</span>
              <span>Email: sakv@gmail.com</span>
            </p>
            <p className="mb-0">
              <span>
                <i className="bi bi-box-arrow-in-right"></i> Login
              </span>
            </p>
          </div>
        </div>
        <div className="header_bottom py-1">
          <div className="d-flex justify-content-end">
            <div className="col-7 d-flex justify-content-around">
              <Link to="/">Home</Link>
              <Link to="/product">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/info">Information</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
