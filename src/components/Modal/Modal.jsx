import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock';


function Modal({ isOpen, onClose, children, fullHeight = false }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      lockBodyScroll();
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (isOpen) {
        unlockBodyScroll();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${fullHeight ? styles.backdropFullHeight : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.content} ${fullHeight ? styles.contentFullHeight : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <IoClose size={32} />
      </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
