import React from 'react';
import { useForm } from 'react-hook-form';
import { CreditInput } from '../../hooks/useCredits';
import ProductSearch from './ProductSearch';

interface CreditFormProps {
  onSubmit: (data: CreditInput) => Promise<void>;
  initialData?: Partial<CreditInput>;
  onCancel: () => void;
}

export default function CreditForm({ onSubmit, initialData, onCancel }: CreditFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreditInput>({
    defaultValues: {
      ...initialData,
      dueDate: initialData?.dueDate 
        ? new Date(initialData.dueDate).toISOString().slice(0, 16)
        : undefined
    }
  });

  const handleProductSelect = (product: { name: string; price: number }) => {
    setValue('productName', product.name);
    setValue('price', product.price);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Código</label>
        <input
          type="text"
          {...register('code', { required: 'El código es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
        <input
          type="text"
          {...register('clientName', { required: 'El nombre es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register('clientPhone', { required: 'El teléfono es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.clientPhone && <span className="text-red-500 text-sm">{errors.clientPhone.message}</span>}
      </div>

      <ProductSearch onSelectProduct={handleProductSelect} />

      <div>
        <label className="block text-sm font-medium text-gray-700">Producto</label>
        <input
          type="text"
          {...register('productName', { required: 'El producto es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.productName && <span className="text-red-500 text-sm">{errors.productName.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'El precio es requerido',
              min: { value: 0, message: 'El precio debe ser mayor a 0' }
            })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Pago</label>
        <input
          type="datetime-local"
          {...register('dueDate', { required: 'La fecha de pago es requerida' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
        {errors.dueDate && <span className="text-red-500 text-sm">{errors.dueDate.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Guardar Crédito
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}