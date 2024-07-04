import { useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'
import { deleteToCart } from '../../features/carts/cart-slice'
import { errorToast, successToast } from '../../util/toastify'

const Carts = () => {
  const dispatch = useDispatch()
  const data = useAppSelector((state) => state.cart.cart)
  const totalQuantity = data.reduce((acc, cart) => acc + cart.quantity, 0)
  const totalPrice = data.reduce((acc, cart) => acc + parseFloat(cart.product.price) * cart.quantity, 0)

  const handleDeleteProductToCart = (id: number) => {
    try {
      dispatch(deleteToCart({ productID: id }))
      successToast('Delete to cart successfully')
    } catch (error) {
      errorToast('Delete to cart failed')
    }
  }

  return (
    <div className='container mx-auto mt-3'>
      {data && data.length === 0 ? (
        <div className='flex items-center justify-center h-screen'>
          <img className='h-80' src='https://fatafatsewa.com/website/images/emptycart.png' alt='Empty Cart' />
        </div>
      ) : (
        <div className='flex justify-around h-screen'>
          <div className='product_to_Cart w-1/2'>
            <h2 className='text-center text-xl text-red-500'>Info Product To Cart</h2>
            <div className='overflow-y-auto h-60 p-3'>
              {data && data.length > 0 ? (
                data.map((cart) => (
                  <div key={cart.product.id} className='flex justify-between items-center mb-3'>
                    <img src={cart.product.image} alt={cart.product.title} className='w-24 h-24 object-cover' />
                    <div className='info_product_Cart ms-3 flex flex-col justify-center w-3/4'>
                      <span className='font-bold'>{cart.product.title}</span>
                      <div>
                        <span>
                          {cart.product.price}$ x {cart.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleDeleteProductToCart(cart.product.id)}
                      className='btn btn-outline-danger'
                    >
                      <i className='bi bi-trash'></i>
                    </button>
                  </div>
                ))
              ) : (
                <div className='flex items-center justify-center'>
                  <img src='https://fatafatsewa.com/website/images/emptycart.png' alt='Empty Cart' />
                </div>
              )}
            </div>
          </div>
          <div className='customer_to_cart w-1/2'>
            <h2 className='text-center text-xl text-red-500'>Info Customer To Cart</h2>
            <div className='mt-8 mx-16'>
              <p className='font-semibold'>Tên khách hàng: Nguyễn Văn A</p>
              <p className='font-semibold'>Địa chỉ giao hàng: Tân Triều - Thanh Trì - Hà Nội</p>
              <p className='font-semibold'>Số điện thoại: 0354845225</p>
              <p className='font-semibold'>Tổng số sản phẩm: {totalQuantity}</p>
              <p className='font-semibold'>Tổng tiền: {totalPrice}$</p>
              <button
                type='button'
                className='bg-gradient-to-r from-orange-500 to-red-400 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:from-red-400 hover:to-orange-500 hover:text-white'
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carts
