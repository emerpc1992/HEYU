import React, { useState } from 'react';
import { Plus, CreditCard } from 'lucide-react';
import { useCredits } from '../../hooks/useCredits';
import CreditList from './CreditList';
import CreditForm from './CreditForm';
import { Credit } from '../../types/database';

export default function CreditsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCredit, setEditingCredit] = useState<Credit | null>(null);
  const { credits, addCredit, updateCredit, deleteCredit, markAsPaid } = useCredits();

  const handleSubmit = async (data: any) => {
    try {
      if (editingCredit?.id) {
        await updateCredit(editingCredit.id, data);
      } else {
        await addCredit(data);
      }
      setShowForm(false);
      setEditingCredit(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEdit = (credit: Credit) => {
    setEditingCredit(credit);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este crédito?')) {
      try {
        await deleteCredit(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const handleMarkAsPaid = async (id: number) => {
    if (window.confirm('¿Confirma que este crédito ha sido pagado?')) {
      try {
        await markAsPaid(id);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Créditos</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Crédito
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingCredit ? 'Editar Crédito' : 'Nuevo Crédito'}
            </h2>
            <CreditForm
              onSubmit={handleSubmit}
              initialData={editingCredit || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingCredit(null);
              }}
            />
          </div>
        </div>
      )}

      <CreditList
        credits={credits}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
}