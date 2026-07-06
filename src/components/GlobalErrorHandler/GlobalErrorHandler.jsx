import { IoClose } from 'react-icons/io5';
import styles from './GlobalErrorHandler.module.css';

function GlobalErrorHandler({ error, onClose }) {
    if (!error) return null;

    return (
        <div className={styles.wrapper} role="alert" aria-live="assertive">
            <p className={styles.message}>{error}</p>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close error">
                <IoClose size={24} />
            </button>
        </div>
    );
}

export default GlobalErrorHandler;
