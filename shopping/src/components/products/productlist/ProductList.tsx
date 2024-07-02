import { useGetAllProductsQuery } from '../../../features/products/product-api-slice';
import './ProductsList.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/carts/cart-slice';
import Product from '../../../types/Product';
import { errorToast, successToast } from '../../../util/toastify';
import { Pagination } from 'antd';
import { useMemo, useState } from 'react';
import { productSelector } from '../../../features/products/product-slice';

const ProductList = () => {
  const { data: products = [], isFetching } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleOnClickView = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleOnClickAddToCart = (product: Product) => {
    try {
      dispatch(addToCart({ product, quantity: 1 }));
      successToast('Add to cart successfully');
    } catch (error) {
      errorToast('Add to cart failed');
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const [searchText, setSearchText] = useState('');
  const [sortText, setSortText] = useState('');

  const filteredAndSortedProducts = useMemo(
    () => productSelector(searchText, sortText)({ products }),
    [products, searchText, sortText]
  );

  const sortOptions = [
    { value: '', label: 'All Products' },
    { value: '1', label: 'Title A-Z' },
    { value: '2', label: 'Title Z-A' },
    { value: '3', label: 'Price Ascending' },
    { value: '4', label: 'Price Descending' },
  ];

  return (
    <div className='container'>
      {isFetching ? (
        <div className='text-center' style={{ margin: '50vh' }}>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex align-items-center col-4'>
              <span className="input-text" id="inputGroup-sizing-sm">Tìm kiếm: </span>
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Enter name title'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='d-flex align-items-center'>
              <span className="input-text">Sort by: </span>
              <select
                name='sort'
                id='sort'
                value={sortText}
                onChange={(e) => setSortText(e.target.value)}
                className="form-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='row'>
            {filteredAndSortedProducts.slice(startIndex, endIndex).map((product) => (
              <div key={product.id} className='col-md-3 mb-4'>
                <div className='card h-100'>
                  <img src={product.image} className='card-img-top' alt={product.title} height={250} />
                  <div className='card-body'>
                    <span className='card-title text-title-product'>{product.title}</span>
                    <div className='d-flex justify-content-between align-item-center'>
                      <span className='text-price'>{product.price}$</span>
                      <span>Đã bán: {product.rating.count}</span>
                    </div>
                    <div className='d-flex justify-content-around align-items-center'>
                      <button
                        type='button'
                        className='btn-grad d-flex justify-content-around align-items-center col-4'
                        onClick={() => handleOnClickView(product.id)}
                      >
                        <i className='bi bi-ticket-detailed'></i> <span style={{ fontSize: '12px' }}>Detail</span>
                      </button>
                      <button
                        type='button'
                        className='btn-grad d-flex justify-content-around align-items-center col-6'
                        onClick={() => handleOnClickAddToCart(product)}
                      >
                        <i className='bi bi-cart-plus'></i> <span style={{ fontSize: '12px' }}>Add to cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            align='center'
            current={currentPage}
            total={filteredAndSortedProducts.length}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
