// components/Modal.tsx
import React from "react";
import styles from "./LoginModal.module.css";

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
