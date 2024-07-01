import React from 'react';
import { useGetAllProductsQuery } from '../../../features/products/product-api-slice';
import './ProductsList.css'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/carts/cart-slice';
const ProductList = () => {
  const { data = [], isFetching } = useGetAllProductsQuery();
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const HandleOnClickView = (id : number) => {
    navigate(`/product/${id}`);
  }
  const handleOnClickAddToCart = (product: Product) => {
    dispatch(addToCart({product, quantity : 1}));
  }
  console.log(cart);
  return (
    <div className='container'>
      {isFetching ? (
        <div className="text-center" style={{margin: '50vh'}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {data.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height={250}
                />
                <div className="card-body">
                  <span className="card-title text-title-product">{product.title}</span>
                  <div className="d-flex justify-content-between align-item-center">
                    <span className='text-price'>{product.price}$</span>
                    <span>Đã bán: {product.rating.count}</span>
                  </div>
                  <div className="d-flex justify-content-around align-items-center">
                    <button type="button" className='btn-grad d-flex justify-content-around align-items-center col-4' onClick={() => HandleOnClickView(product.id)}><i className="bi bi-ticket-detailed"></i>{' '}<span style={{fontSize: '12px'}}>Detail</span></button>
                    <button type="button" className='btn-grad d-flex justify-content-around align-items-center col-6' onClick={() => handleOnClickAddToCart(product)}><i className="bi bi-cart-plus"></i>{' '}<span style={{fontSize: '12px'}}>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
