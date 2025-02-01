import React, { useState } from "react";
import styles from "./AddProductForm.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import { BiArchiveIn } from "react-icons/bi";
import CategorySelector from "../input/CategorySelector";
import ProviderSelector from "../input/ProviderSelector";
import PriceModule from "../productPrice/Price";
import FormCompletionHandler from "../views/FormCompletionHandler";
import Loader from "../loader/Loader";

interface ProductFormProps {
  onSave: (productData: ProductData) => Promise<boolean>;
  onCancel: () => void;
}

interface ProductData {
  name: string;
  description?: string;
  barcode: string;
  supplierId: number;
  price: number;
  costPrice: number;
  discount: number;
  taxRate: number;
  finalPrice: number;
  stock: number;
  minStock: number;
  warehouseLocation: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  status: string;
}

const AddProductForm: React.FC<ProductFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    description: "",
    barcode: "",
    supplierId: 0,
    price: 0,
    costPrice: 0,
    discount: 0,
    taxRate: 21,
    finalPrice: 0,
    stock: 0,
    minStock: 0,
    warehouseLocation: "",
    category: "",
    subcategory: "",
    imageUrl: "",
    status: "Disponible",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === "supplierId" || id === "price" || id === "costPrice" || id === "discount" || id === "stock" || id === "minStock" ? Number(value) : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setFormData({
        ...formData,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(null); // Si se usa una URL, desechamos cualquier archivo cargado
    setFormData({
      ...formData,
      imageUrl: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const isSuccess = await onSave(formData);
      setStatus(isSuccess ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleRetry = () => setStatus("idle");

  if (status === "loading") {
    return <Loader title="Guardando producto..." />;
  }

  if (status === "success" || status === "error") {
    return (
      <FormCompletionHandler
        status={status}
        onRetry={handleRetry}
        onCancel={onCancel}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.header}>Nuevo Producto</h3>
      <div className={styles.divider} />

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Nombre*</label>
          <input id="name" className={styles.input} value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="barcode" className={styles.label}>Código de Barras*</label>
          <input id="barcode" className={styles.input} value={formData.barcode} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Proveedor*</label>
          <ProviderSelector onChange={(supplierId) => setFormData({ ...formData, supplierId })} />
        </div>
        <div className={styles.inputGroup}>
          <CategorySelector onChange={(category, subcategory) => setFormData({ ...formData, category, subcategory })} />
        </div>
      </div>

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>Descripción</label>
          <textarea id="description" className={styles.textArea} value={formData.description || ""} onChange={handleChange} placeholder="Escribe una descripción del producto" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="imageUpload" className={styles.label}>Imagen del Producto</label>
          <input id="imageUpload" type="file" className={styles.input} onChange={handleImageUpload} />
          <label htmlFor="imageUrl" className={styles.label}>O URL de Imagen</label>
          <input id="imageUrl" type="text" className={styles.input} value={formData.imageUrl} onChange={handleImageUrlChange} />
        </div>

        {formData.imageUrl && (
          <div className={styles.imagePreview}>
            <img src={formData.imageUrl} alt="Vista previa del producto" className={styles.previewImage} />
          </div>
        )}
      </div>

      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="stock" className={styles.label}>Stock Inicial*</label>
          <input id="stock" type="number" className={styles.input} value={formData.stock} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="minStock" className={styles.label}>Stock Mínimo*</label>
          <input id="minStock" type="number" className={styles.input} value={formData.minStock} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="warehouseLocation" className={styles.label}>Ubicación en Almacén</label>
          <input id="warehouseLocation" className={styles.input} value={formData.warehouseLocation} onChange={handleChange} />
        </div>
      </div>

      <PriceModule 
        price={formData.price}
        iva={formData.taxRate / 100}
        onPriceChange={(price) => setFormData({ ...formData, price })}
        onIvaChange={(taxRate) => setFormData({ ...formData, taxRate: taxRate * 100 })}
      />

      <div className={styles.buttons}>
        <PrimaryButton text="Guardar" icon={<BiArchiveIn />} />
        <button type="button" onClick={onCancel} className={styles.secondaryButton}>Cancelar</button>
      </div>
    </form>
  );
};

export default AddProductForm;
