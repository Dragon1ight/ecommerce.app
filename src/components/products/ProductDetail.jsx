import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="flex flex-col">
          <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600">Category:</h3>
              <p className="ml-2 text-sm text-gray-900">{product.category}</p>
            </div>
            <div className="flex items-center mt-2">
              <h3 className="text-sm text-gray-600">Stock:</h3>
              <p className="ml-2 text-sm text-gray-900">{product.stock} available</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-4 text-sm text-gray-600">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border-gray-300 py-1.5 text-base leading-5 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 