// components/modals/AddProductModule.tsx
import React, { useState } from "react";
import ProductForm from "../forms/AddProductForm";
import Modal from "../modals/AddProductModal";
import Loader from "../loader/Loader";
import styles from "./AddProduct.module.css";

interface ProductData {
  name: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  supplier: string;
  status: "available" | "outOfStock";
}

const AddProduct: React.FC = () => {
  const [productAdded, setProductAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Usamos una key para reiniciar el formulario

  const handleSave = (productData: ProductData) => {
    setIsModalOpen(true);
    setIsLoading(true);

    // Simulamos un tiempo de espera para guardar el producto
    setTimeout(() => {
      console.log("Producto agregado", productData);
      setIsLoading(false);
      setProductAdded(true);
    }, 7000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductAdded(false);
  };

  const handleAddAnotherProduct = () => {
    setProductAdded(false); 
    setFormKey((prevKey) => prevKey + 1); 
  };

  return (
    <div className={styles.container}>
      {/* Cambiamos el key del formulario para reiniciarlo */}
      {/* <ProductForm key={formKey} onSave={handleSave} /> */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading ? (
          <Loader title="Agregando producto"/>
        ) : productAdded ? (
          <div className={styles.successMessage}>
            <p className={styles.message}>¡Producto agregado exitosamente!</p>
            <button
            className={styles.buttonAdd}
            onClick={() => {
              handleAddAnotherProduct();
              handleCloseModal(); 
            }}
          >
            Agregar otro producto
          </button>
            <button
              className={styles.buttonClose}
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AddProduct;
