import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { deleteToCart } from '../../features/carts/cart-slice';

const Carts = () => {
  const dispatch = useDispatch()
  const data = useAppSelector((state) => state.cart.cart);
  const totalQuantity = data.reduce((acc, cart) => acc + parseInt(cart.quantity), 0);
  const totalPrice = data.reduce((acc, cart) => acc + cart.product.price * cart.quantity, 0);
  const handleDeleteProductToCart = (id) => {
    console.log(id);
    dispatch(deleteToCart({productID: id}));
  }
  return (
    <div className='container'>
      {data && data.length === 0 ? (
        <div className="text-center">
        <img style={{ height: '85vh'}}  src="https://fatafatsewa.com/website/images/emptycart.png"/>
      </div>
      ) : (
        <div className="d-flex justify-content-around"  style={{ height: '85vh'}}>
          <div className="product_to_Cart  col-5">
            <h4 className='text-center'>Info Product To Cart</h4>
            <div className="scrollspy-example p-3" style={{height: '60vh', overflowY: 'scroll'}}>
              {data && data.length > 0 ? (
                data.map((cart) => (
                  <div key={cart.product.id} className="d-flex justify-content-between align-items-center mb-3">
                    <img src={cart.product.image} alt={cart.product.title} width={100} height={100} />
                    <div className="info_product_Cart ms-3 col-7">
                      <span>{cart.product.title}</span>
                      <div>
                        <span>{cart.product.price}$ x {cart.quantity}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleDeleteProductToCart(cart.product.id)}><i className="bi bi-trash"></i></button>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <img src="https://fatafatsewa.com/website/images/emptycart.png"/>
                </div>
              )}
            </div>
          </div>
          <div className="customer_to_cart  col-5">
            <h4 className='text-center'>Info Customer To Cart</h4>
            <div style={{margin: '20px 4rem'}}> 
              <p><strong>Tên khách hàng: </strong>Nguyễn Văn A</p>
              <p><strong>Địa chỉ giao hàng: </strong>Tân Triều - Thanh Trì - Hà Nội</p>
              <p><strong>Số điện thoại: </strong>0354845225</p>
              <p><strong>Tổng số sản phẩm: </strong>{totalQuantity}</p>
              <p><strong>Tổng tiền: </strong>{totalPrice}$</p>
              <button type="button" className='btn-grad col-5' style={{marginLeft: '4rem'}}>Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carts;
