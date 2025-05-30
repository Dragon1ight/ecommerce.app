import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      <p className="text-gray-300 mb-8">Bienvenue dans le panneau d'administration. Ici, vous pourrez gérer les produits, les commandes et les utilisateurs.</p>
      
      <nav className="space-y-4">
        <Link 
          to="/admin/users" 
          className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-semibold">Gérer les utilisateurs</h2>
          <p className="text-gray-400">Voir, modifier et supprimer les utilisateurs</p>
        </Link>
        
        <Link 
          to="/admin/products" 
          className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-semibold">Gérer les produits</h2>
          <p className="text-gray-400">Ajouter, modifier et supprimer des produits</p>
        </Link>
        
        <Link 
          to="/admin/orders" 
          className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-semibold">Gérer les commandes</h2>
          <p className="text-gray-400">Voir et gérer les commandes des clients</p>
        </Link>
      </nav>
    </div>
  );
}

export default AdminPage; 