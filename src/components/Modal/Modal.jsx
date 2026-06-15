import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';


function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <IoClose />
      </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
