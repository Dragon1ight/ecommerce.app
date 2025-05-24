import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Checkout() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit_card',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: getCartTotal(),
      };

      console.log('Order data being sent:', orderData);

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please add items to your cart before proceeding to checkout.
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="mt-12">
            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="sticky top-6">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product._id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-md object-cover object-center"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={`/products/${item.product._id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                        </div>

                        <div className="ml-4 flex-shrink-0 flow-root">
                          {/* Removed Remove button from checkout summary to avoid confusion */}
                        </div>
                      </div>

                      <div className="mt-2 flex-1 flex items-end justify-between">
                        <p className="text-sm font-medium text-gray-900">${item.product.price.toFixed(2)}</p>

                        <div className="ml-4">
                          {/* Removed Quantity select from checkout summary to avoid confusion */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${getCartTotal().toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${getCartTotal().toFixed(2)}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Confirm order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 