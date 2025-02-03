import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web"; // 
import styles from "./SuccesMessage.module.css";

interface SuccessMessageProps {
  onCancel: () => void;
  successMessage: string;
}

const SuccessAnimation: React.FC<SuccessMessageProps> = ({ onCancel, successMessage }) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null); // 

  useEffect(() => {
    if (animationContainer.current && !animationInstanceRef.current) {
      animationInstanceRef.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "https://lottie.host/7caa5093-2ba7-4663-a50b-1d509b932289/h7d84g5wi3.json",
      });
    }

    return () => {
      animationInstanceRef.current?.destroy();
      animationInstanceRef.current = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{successMessage}</h1>
      <div ref={animationContainer} className={styles.animationContainer} />
      <button className={styles.backButton} onClick={onCancel}>Volver</button>
    </div>
  );
};

export default SuccessAnimation;
