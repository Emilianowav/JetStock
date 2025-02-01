import React, { useEffect, useRef } from "react";
import styles from "./ErrorMessage.module.css";

// Evitar carga duplicada del script
let isScriptLoaded = false;

interface ErrorMessageProps {
  onRetry: () => void; // Para reintentar la acción fallida
  onCancel: () => void; // Para regresar al flujo anterior
  errorMessage: string; // Mensaje dinámico de error
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  onRetry,
  onCancel,
  errorMessage,
}) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstanceRef = useRef<any>(null); // Almacena la instancia de la animación

  const predefinedMessage =
    "Intenta de nuevo, si el error persiste, contacta a soporte.";

  useEffect(() => {
    const initializeAnimation = () => {
      if (animationContainer.current && !animationInstanceRef.current) {
        animationInstanceRef.current = window.lottie.loadAnimation({
          container: animationContainer.current, // Contenedor de la animación
          renderer: "svg", // Usar SVG como renderer
          loop: false, // No repetir la animación
          autoplay: true, // Iniciar automáticamente
          path: "https://lottie.host/2d7343c9-d7c5-4d71-b763-5b5cf8a8cb37/qlivb7y7hj.json", // Ruta de la animación de error
        });
      }
    };

    if (!isScriptLoaded) {
      isScriptLoaded = true;

      const script = document.createElement("script");
      script.src = "https://unpkg.com/lottie-web@5.7.11/build/player/lottie.min.js";
      script.async = true;

      script.onload = () => {
        if (window.lottie) {
          initializeAnimation();
        }
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        isScriptLoaded = false;
      };
    } else if (window.lottie) {
      initializeAnimation();
    }

    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
        animationInstanceRef.current = null;
      }
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
