import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFormModal from '../../components/admin/ProductFormModal';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des produits");
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProductHandler = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(products.filter(product => product._id !== productId));
      } catch (err) {
        setError("Erreur lors de la suppression du produit");
        console.error('Error deleting product:', err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(`Erreur: ${err.response.data.message}`);
        }
      }
    }
  };

  const editProductHandler = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const addProductHandler = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des produits</h1>
      
      <button 
        onClick={addProductHandler} 
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Ajouter un produit
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.price} €</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => editProductHandler(product)} 
                    className="text-indigo-400 hover:text-indigo-300 mr-4"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => deleteProductHandler(product._id)} 
                    className="text-red-400 hover:text-red-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default AdminProductsPage; 