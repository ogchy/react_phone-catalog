/* eslint-disable no-console */
import React from 'react';
import phones from '../../public/api/phones.json';
// eslint-disable-next-line max-len
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './HotPrices.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

export const HotPrices: React.FC = () => {
  const filteredProducts = phones.filter(
    phone =>
      (phone.namespaceId === 'apple-iphone-11' ||
        phone.namespaceId === 'apple-iphone-11-pro') &&
      phone.capacity === '128GB' &&
      (phone.color === 'black' ||
        phone.color === 'white' ||
        phone.color === 'gold'),
  );
  const { dispatch } = useCart();

  const handleAddToCart = (id: string) => {
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = phones.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  return (
    <div className={styles.productList}>
      <h1>Hot Prices</h1>

      <div className={styles.productGrid}>
        {filteredProducts.slice(0, 4).map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles.linkProduct}
          >
            <DiscountProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.priceRegular}
              discountPrice={product.priceDiscount}
              imageUrl={product.images[0]}
              isFavorite={false}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              onAddToCart={() => handleAddToCart(product.id)}
              onToggleFavorite={() => handleToggleFavorite(product.id)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
