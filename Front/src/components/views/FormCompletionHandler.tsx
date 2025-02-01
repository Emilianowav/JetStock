import React from 'react';
import SuccessMessage from '../succesMessage/SuccesMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface FormCompletionHandlerProps {
  message: string;
  status: 'success' | 'error';
  onRetry: () => void;
  onCancel: () => void;
}

const FormCompletionHandler: React.FC<FormCompletionHandlerProps> = ({ status, onRetry, onCancel, message }) => {
  return (
    <div className="handlerContainer">
      <div className="messageContainer">
        {status === 'success' ? (
          <SuccessMessage onCancel={onCancel} successMessage={message} />
        ) : (
          <ErrorMessage onCancel={onCancel} onRetry={onRetry} errorMessage="Hubo un error al guardar el producto. Intenta nuevamente." />
        )}
      </div>

      <div className="buttons">
        <button onClick={onCancel} className="secondaryButton">
          Volver
        </button>
      </div>
    </div>
  );
};

export default FormCompletionHandler;
