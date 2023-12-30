import React, { useState, useEffect } from 'react';

import { cart, clearCart } from 'cart/cart';
import { currency } from 'home/products';

export default function CartContent () {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return cart.subscribe((value) => setItems(value?.cartItems ?? []));
  }, []);
  
  return (
    <>
      <div className='my-10 grid grid-cols-4 gap-5'>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div>{item.quantity}</div>
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div className='text-right'>
              {currency.format(item.quantity * item.price)}
            </div>
          </React.Fragment>
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div className='text-right'>{currency.format(items.reduce((a, v) => (a + (v.quantity * v.price)), 0))}</div>
        {items.length > 0 && (
          <div className='flex mb-10'>
            <div className='flex-grow'>
              <button
                className='bg-white border border-green-8 text-green-800 py-2 px-5 round-md'
                onClick={clearCart}
              >
                clear Cart
              </button>
            </div>
            <div className='flex-end'>
              <button
                className='bg-green-900 border border-green-8 text-white py-2 px-5 round-md'
                onClick={clearCart}
              >
                checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
