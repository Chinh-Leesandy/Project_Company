import { createSelector } from '@reduxjs/toolkit';
import Product from '../../types/Product';

export const productSelector = (text: string, sort: string) => createSelector(
  [(state: { products: Product[] }) => state.products],
  (products) => {
    let productList = products.filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );

    switch (sort) {
      case "1":
        return productList.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "2":
        return productList.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      case "3":
        return productList.sort((a, b) => Number(a.price) - Number(b.price));
      case "4":
        return productList.sort((a, b) => Number(b.price) - Number(a.price));
      default:
        return productList;
    }
  }
);
