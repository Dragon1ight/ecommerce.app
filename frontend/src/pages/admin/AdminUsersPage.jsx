import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserFormModal from '../../components/admin/UserFormModal';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des utilisateurs");
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserHandler = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError("Erreur lors de la suppression de l'utilisateur");
        console.error('Error deleting user:', err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(`Erreur: ${err.response.data.message}`);
        }
      }
    }
  };

  const editUserHandler = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const addUserHandler = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSuccess = () => {
    fetchUsers(); // Rafraîchir la liste des utilisateurs
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
      <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>
      
      <button 
        onClick={addUserHandler} 
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Ajouter un utilisateur
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => editUserHandler(user)} 
                    className="text-indigo-400 hover:text-indigo-300 mr-4"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => deleteUserHandler(user._id)} 
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

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={selectedUser}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default AdminUsersPage; 