import React from 'react';
import { useSales } from '../../hooks/useSales';
import { Staff } from '../../types/database';

interface CommissionModalProps {
  staff: Staff;
  onClose: () => void;
}

export default function CommissionModal({ staff, onClose }: CommissionModalProps) {
  const { sales } = useSales();
  
  // Filter sales for this staff member
  const staffSales = sales.filter(sale => 
    sale.staffId === staff.id && 
    sale.status === 'completed'
  );

  // Calculate totals
  const totalSales = staffSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCommission = staffSales.reduce((sum, sale) => 
    sum + (sale.total * (sale.commission / 100)), 0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">
          Reporte de Comisiones - {staff.name}
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total en Ventas</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalSales.toFixed(2)}
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-sm text-pink-600">Total en Comisiones</p>
            <p className="text-2xl font-bold text-pink-600">
              ${totalCommission.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total Venta</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">% Comisión</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Comisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {staffSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {sale.clientName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                    ${sale.total.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                    {sale.commission}%
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-pink-600">
                    ${(sale.total * (sale.commission / 100)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}