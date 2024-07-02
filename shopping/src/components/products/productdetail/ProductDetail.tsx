import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../features/products/product-api-slice';
import "./ProductDetail.css"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/carts/cart-slice';
import Product from '../../../types/Product';
import { errorToast, successToast } from '../../../util/toastify';
const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const { data = {} as Product, isFetching } = useGetProductByIdQuery(id as string);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClickAddToCart = () => {
    try {
      dispatch(addToCart({product: data, quantity}));
      successToast("Add to cart successfull");
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    } catch (error) {
      errorToast("Add to cart fail");
    }
  }
  return (
    <div className='container'>
      {isFetching ? (
        <div className='text-center' style={{ margin: '50vh' }}>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-around'>
          <img className='img' height={250} width={250} src={data.image} alt={data.title} />
          <div className='info-product col-7 mt-3'>
            <div className='card-title fs-4'>{data.title}</div>
            <span className='pt-3'>Giá bán: <strong  style={{color: 'coral'}}>{data.price}$</strong></span>
            <div className='rating d-flex justify-content-between'>
              <div className='rate'>Đánh giá: <strong style={{color: 'coral'}}>{data.rating.rate}/5</strong></div>
              <div className='count'>Số sản phẩm đã bán: <strong style={{color: 'coral'}}>{data.rating.count}</strong> </div>
            </div>
            <div className='d-flex align-items-center mt-3'>
              <input 
                type='number'
                className='form-control me-3'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min='1'
              />
              <button 
                type="button" 
                className='btn-grad d-flex justify-content-center align-items-center col-3' 
                onClick={handleOnClickAddToCart}
              >
                <i className="bi bi-cart-plus"></i>{' '}
                <span style={{fontSize: '12px'}}>Add to cart</span>
              </button>
            </div>
            <p className='fs-6'>Thông tin sản phẩm</p>
            <hr />
            <p className='card-text'>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
