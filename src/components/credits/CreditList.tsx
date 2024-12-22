import React from 'react';
import { Credit } from '../../types/database';
import { Phone, Trash2, Edit, CheckCircle } from 'lucide-react';

interface CreditListProps {
  credits: Credit[];
  onEdit: (credit: Credit) => void;
  onDelete: (id: number) => void;
  onMarkAsPaid: (id: number) => void;
}

export default function CreditList({ credits, onEdit, onDelete, onMarkAsPaid }: CreditListProps) {
  const formatAmount = (amount: number | undefined) => {
    return typeof amount === 'number' ? amount.toFixed(2) : '0.00';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Pago
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {credits.map((credit) => (
            <tr key={credit.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {credit.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {credit.clientName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a 
                  href={`tel:${credit.clientPhone}`}
                  className="flex items-center text-pink-600 hover:text-pink-700"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {credit.clientPhone}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {credit.productName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatAmount(credit.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(credit.dueDate).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  credit.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {credit.status === 'paid' ? 'Pagado' : 'Pendiente'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {credit.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onEdit(credit)}
                      className="text-pink-600 hover:text-pink-700 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => credit.id && onMarkAsPaid(credit.id)}
                      className="text-green-600 hover:text-green-700 mr-3"
                      title="Marcar como pagado"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => credit.id && onDelete(credit.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}