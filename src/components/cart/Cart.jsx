import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 ">Shopping Cart</h1>
      <div className="mt-8">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.product._id} className="py-6 flex flex-col sm:flex-row sm:justify-between">
                <div className="flex-shrink-0 w-full sm:w-24 h-48 sm:h-24 border border-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium ">
                      <h3 className="flex-1 mr-2 overflow-hidden text-ellipsis">{item.product.name}</h3>
                      <p className="ml-4 flex-shrink-0">${item.product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                  </div>
                  <div className="flex-1 flex items-end justify-between text-sm mt-4">
                    <div className="flex items-center">
                      <label htmlFor={`quantity-${item.product._id}`} className="mr-2">
                        Qty
                      </label>
                      <select
                        id={`quantity-${item.product._id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                        className="rounded-md border-gray-300 py-1.5 text-base leading-5 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-700"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product._id)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 mt-8">
        <div className="flex justify-between text-base font-medium">
          <p>Subtotal</p>
          <p>${getCartTotal().toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus::ring-offset-2 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </div>
        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            or{' '}
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="text-indigo-600 font-medium hover:text-indigo-500"
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 