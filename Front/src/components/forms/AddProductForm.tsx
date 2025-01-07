import React, { useState } from 'react';
import styles from './AddProductForm.module.css';
import PrimaryButton from '../buttons/PrimaryButton';
import { BiArchiveIn } from "react-icons/bi";
//selectors
import CategorySelector from '../input/CategorySelector';
import ProviderSelector from '../input/ProviderSelector';
import Price from "../price/Price"

interface ProductFormProps {
  onSave: (productData: ProductData) => void;
}

interface ProductData {
  name: string;
  quantity: number;
  price: number;
  description?: string;
  category: string;
  supplier: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    category: '',
    supplier: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    // Formatear números y eliminar ceros iniciales
    const formattedValue =
      id === 'quantity' || id === 'price'
        ? value.replace(/^0+(?!$)/, '') // Elimina ceros iniciales
        : value;

    setFormData({
      ...formData,
      [id]: id === 'quantity' || id === 'price' ? Number(formattedValue) : formattedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén llenos
    // const { name, quantity, price, category, supplier } = formData;
    // if (
    //   !name.trim() || // Verifica que el nombre no esté vacío
    //   !category.trim() || // Verifica que la categoría no esté vacía
    //   !supplier.trim() || // Verifica que el proveedor no esté vacío
    //   quantity <= 0 || // Verifica que la cantidad sea mayor a 0
    //   price <= 0 // Verifica que el precio sea mayor a 0
    // ) {
    //   alert("Por favor, completa todos los campos obligatorios con valores válidos.");
    //   return;
    // }

    // Actualizamos el estado de disponibilidad del producto
    const updatedFormData = {
      ...formData,
      // status: quantity > 0 ? 'available' : 'outOfStock',
    };

    onSave(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>Nuevo Producto</h3>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Nombre*</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="quantity" className={styles.label}>Stock*</label>
        <input
          id="quantity"
          type="number"
          value={formData.quantity.toString()}
          onChange={handleChange}
          placeholder="Cantidad"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="price" className={styles.label}>Precio*</label>
        <input
          id="price"
          type="number"
          value={formData.price.toString()}
          onChange={handleChange}
          placeholder="Precio"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="category" className={styles.label}>Categoría*</label>
        <CategorySelector />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="supplier" className={styles.label}>Proveedor*</label>
        <ProviderSelector />
      </div>

      <div className={styles.textAreaGroup}>
        <label htmlFor="description" className={styles.label}>Descripción</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          className={styles.textArea}
        />
      </div>
      
      <label>Precio</label>
      <Price />

      <div className={styles.buttonGroup}>
        <PrimaryButton text="Guardar" type="submit" icon={<BiArchiveIn size={24} />} onClick={() => {}} />
      </div>
    </form>
  );
};

export default ProductForm;
