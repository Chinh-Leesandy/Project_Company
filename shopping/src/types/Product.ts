interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image : string;
  rating: {
    rate: string;
    count: string;
  };
  category : string;
};

export default Product;