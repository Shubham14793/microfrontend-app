import React, { useState, useEffect } from 'react';

import { addToCart, useLoggedIn} from 'cart/cart';
import { getProducts, currency } from './products';

export default function HomeContent () {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  if (!products)
    return null; 

  return (
    <div className='grid grid-cols-4 gap-5'>
      {products.map(product => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className='flex'>
            <div className='flex-grow font-bold'>
              <a>{product.name}</a>
            </div>
            <div className='flex-end'>{currency.format(product.price)}</div>
          </div>
          <div className='text-sm mt-4'>{product.description}</div>
          {loggedIn && (
            <div className='text-right mt-2'>
              <button
                className='bg-blue-500 hover:bg-blue-700 hover:text-white text-sm p-3 rounded-md'
                onClick={() => addToCart(product.id)}
                id={`addtocart_${product.id}`}
              >
                add to cart
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

};
