import React, { useEffect, useRef } from 'react';
import styles from './SuccesMessage.module.css';

// Evitar carga duplicada del script
let isScriptLoaded = false;

interface AddProductProps {
  onCancel: () => void; // Para regresar al listado
  successMessage: string;
}

const SuccessAnimation: React.FC<AddProductProps> = ({ onCancel,successMessage }) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstanceRef = useRef<any>(null); // Almacena la instancia de la animación

  useEffect(() => {
    const initializeAnimation = () => {
      if (animationContainer.current && !animationInstanceRef.current) {
        // Inicializar la animación solo si no existe una instancia previa
        animationInstanceRef.current = window.lottie.loadAnimation({
          container: animationContainer.current, // Contenedor de la animación
          renderer: 'svg', // Usar SVG como renderer
          loop: false, // No repetir la animación
          autoplay: true, // Iniciar automáticamente
          path: "https://lottie.host/7caa5093-2ba7-4663-a50b-1d509b932289/h7d84g5wi3.json", // Ruta de la animación
        });
      }
    };

    if (!isScriptLoaded) {
      // Cargar el script de Lottie si aún no se ha cargado
      isScriptLoaded = true;

      const script = document.createElement('script');
      script.src = "https://unpkg.com/lottie-web@5.7.11/build/player/lottie.min.js";
      script.async = true;

      script.onload = () => {
        if (window.lottie) {
          initializeAnimation();
        }
      };

      document.body.appendChild(script);

      return () => {
        // Limpiar el script al desmontar el componente
        document.body.removeChild(script);
        isScriptLoaded = false; // Resetear la bandera para recargar el script si es necesario
      };
    } else if (window.lottie) {
      // Si el script ya está cargado, inicializar directamente la animación
      initializeAnimation();
    }

    return () => {
      // Limpiar la instancia de animación al desmontar
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
        animationInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{successMessage}</h1>
      <div ref={animationContainer} className={styles.animationContainer}  />
      <button className={styles.backButton} onClick={onCancel}>Volver</button>
    </div>
  );
};

export default SuccessAnimation;
