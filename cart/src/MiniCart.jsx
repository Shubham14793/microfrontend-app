import React, { useState, useEffect } from 'react';

import { cart, clearCart } from './cart';
import { currency } from 'home/products';

export default function MiniCart () {
  const [items, setItems] = useState(undefined);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setItems(cart.value?.cartItems);
    return cart.subscribe((c) => {
      setItems(c?.cartItems);
    });
  }, []);

  if (!items) return null;

  return (
    <>
      <span onClick={() => setShowCart(!showCart)} id='showCart' >
        <i className='ri-shopping-cart-2-fill text-2xl' id='showCart'></i>
        {items.length}
      </span>
      {showCart && (
        <>
          <div
           className='absolute p-5 bg-green-500 border-5 border-blue-800'
           style={{
            width: 300,
            top: "2rem",
            left: -250
           }}
          >
            <div
              className='grid gap-3 text-sm'
              style={{
                gridTemplateColumns: "1fr 3fr 10fr 2fr"
              }}
            >
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
            </div>
            <div className='flex'>
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
          </div>
        </>
      )
      }
    </>
  );

}