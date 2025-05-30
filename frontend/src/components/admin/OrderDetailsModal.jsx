import React from 'react';

function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">
            Détails de la commande #{order._id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Informations client */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Client</h3>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-white">{order.user.name}</p>
              <p className="text-gray-400">{order.user.email}</p>
            </div>
          </div>

          {/* Adresse de livraison */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Adresse de livraison</h3>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-white">{order.shippingAddress.address}</p>
              <p className="text-white">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="text-white">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Articles</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item._id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{item.product.name}</p>
                    <p className="text-gray-400">Quantité: {item.quantity}</p>
                  </div>
                  <p className="text-white font-medium">{item.price * item.quantity} €</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-lg">Total</span>
              <span className="text-white text-xl font-bold">{order.totalPrice} €</span>
            </div>
          </div>

          {/* Statut */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Statut</h3>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-white capitalize">{order.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal; 