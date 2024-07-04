import { useGetAllProductsQuery } from '../../../features/products/product-api-slice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../features/carts/cart-slice'
import Product from '../../../types/Product'
import { errorToast, successToast } from '../../../util/toastify'
import { Pagination } from 'antd'
import { useMemo, useState } from 'react'
import { productSelector } from '../../../features/products/product-slice'

const ProductList = () => {
  const { data: products = [], isFetching } = useGetAllProductsQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const handleOnClickView = (id: number) => {
    navigate(`/product/${id}`)
  }

  const handleOnClickAddToCart = (product: Product) => {
    try {
      dispatch(addToCart({ product, quantity: 1 }))
      successToast('Add to cart successfully')
    } catch (error) {
      errorToast('Add to cart failed')
    }
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const [searchText, setSearchText] = useState('')
  const [sortText, setSortText] = useState('')

  const filteredAndSortedProducts = useMemo(
    () => productSelector(searchText, sortText)({ products }),
    [products, searchText, sortText]
  )

  const sortOptions = [
    { value: '', label: 'All Products' },
    { value: '1', label: 'Title A-Z' },
    { value: '2', label: 'Title Z-A' },
    { value: '3', label: 'Price Ascending' },
    { value: '4', label: 'Price Descending' }
  ]

  return (
    <div className='container mx-auto px-4 mt-3'>
      {isFetching ? (
        <div className='text-center mt-32'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center col-span-4'>
              <span className='text-gray-600'>Tìm kiếm:</span>
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Enter name title'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className='ml-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200'
              />
            </div>
            <div className='flex items-center'>
              <span className='text-gray-600'>Sort by:</span>
              <select
                name='sort'
                id='sort'
                value={sortText}
                onChange={(e) => setSortText(e.target.value)}
                className='ml-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200'
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {filteredAndSortedProducts.slice(startIndex, endIndex).map((product) => (
              <div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
                <img src={product.image} className='w-56 h-56 object-cover object-center mx-auto' alt={product.title} />
                <div className='flex-grow p-4 flex flex-col'>
                  <h3 className='text-gray-900 font-bold text-lg mb-2 line-clamp-1'>{product.title}</h3>
                  <div className='flex justify-between items-center'>
                    <span className='text-red-500'>{product.price}$</span>
                    <span className='text-gray-500'>Đã bán: {product.rating.count}</span>
                  </div>
                  <div className='mt-4 flex justify-between'>
                    <button
                      type='button'
                      className='bg-gradient-to-r from-orange-500 to-red-400 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-red-400 hover:to-orange-500 hover:text-white flex items-center'
                      onClick={() => handleOnClickView(product.id)}
                    >
                      <i className='bi bi-ticket-detailed'></i> <span className='ml-1'>Detail</span>
                    </button>
                    <button
                      type='button'
                      className='bg-gradient-to-r from-orange-500 to-red-400 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-red-400 hover:to-orange-500 hover:text-white flex items-center'
                      onClick={() => handleOnClickAddToCart(product)}
                    >
                      <i className='bi bi-cart-plus'></i> <span className='ml-1'>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            className='mt-6'
            current={currentPage}
            total={filteredAndSortedProducts.length}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </>
      )}
    </div>
  )
}

export default ProductList
