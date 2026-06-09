import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';


function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Close">
        <IoClose />
      </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
