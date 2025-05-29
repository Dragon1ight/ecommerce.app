import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              E-Commerce
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/products"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Produits
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Commandes
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Panier ({cartItemsCount})
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 