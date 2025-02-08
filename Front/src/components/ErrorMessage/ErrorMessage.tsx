"use client";
import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  onRetry: () => void;
  onCancel: () => void;
  errorMessage: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  onRetry,
  onCancel,
  errorMessage,
}) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null);

  const predefinedMessage = "Intenta de nuevo, si el error persiste, contacta a soporte.";

  useEffect(() => {
    if (animationContainer.current && !animationInstanceRef.current) {
      animationInstanceRef.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "https://lottie.host/2d7343c9-d7c5-4d71-b763-5b5cf8a8cb37/qlivb7y7hj.json",
      });
    }

    return () => {
      animationInstanceRef.current?.destroy();
      animationInstanceRef.current = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{errorMessage}</h1>
      <p className={styles.predefinedMessage}>{predefinedMessage}</p>
      <div ref={animationContainer} className={styles.animationContainer} />
      <div className={styles.buttonGroup}>
        <button className={styles.retryButton} onClick={onRetry}>
          Reintentar
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
