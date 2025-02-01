// components/buttons/PrimaryButton.tsx
import React from 'react';
import styles from './PrimaryButton.module.css';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.text}>{text}</span>
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

export default PrimaryButton;
