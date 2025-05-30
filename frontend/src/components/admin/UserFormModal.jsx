import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserFormModal({ isOpen, onClose, user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      // Si on modifie un utilisateur existant, pré-remplir le formulaire
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // On ne pré-remplit pas le mot de passe
        role: user.role || 'user'
      });
    } else {
      // Si on ajoute un nouvel utilisateur, réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };

      if (user) {
        // Modification d'un utilisateur existant
        await axios.put(
          `http://localhost:5000/api/admin/users/${user._id}`,
          formData,
          { headers }
        );
      } else {
        // Création d'un nouvel utilisateur
        await axios.post(
          'http://localhost:5000/api/admin/users',
          formData,
          { headers }
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {user ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              {user ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required={!user}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Rôle</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {user ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal; 