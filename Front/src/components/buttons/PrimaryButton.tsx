// components/buttons/PrimaryButton.tsx
import React from 'react';
import styles from './PrimaryButton.module.css';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, icon}) => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default PrimaryButton;
