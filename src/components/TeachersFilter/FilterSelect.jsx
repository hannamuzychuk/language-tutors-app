import { useEffect, useRef } from 'react';
import styles from './TeachersFilters.module.css';

function FilterSelect({
    id,
    label,
    value,
    options,
    placeholder,
    isOpen,
    onOpen,
    onClose,
    onChange,
}) {
    const dropdownRef = useRef(null);
    const selectedOption = options.find((option) => option.value === value);
    const displayLabel = selectedOption?.label ?? placeholder;

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        onClose();
    };

    return (
        <div className={styles.filterGroup}>
            <span className={styles.label} id={`${id}-label`}>
                {label}
            </span>
            <div className={styles.dropdown} ref={dropdownRef}>
                <button
                    type="button"
                    id={id}
                    className={`${styles.select} ${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
                    onClick={() => (isOpen ? onClose() : onOpen())}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby={`${id}-label`}
                >
                    <span className={styles.triggerText}>{displayLabel}</span>
                </button>

                {isOpen && (
                    <ul className={styles.menu} role="listbox" aria-labelledby={`${id}-label`}>
                        {options.map((option) => (
                            <li key={option.value || 'all'} role="presentation">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={value === option.value}
                                    className={`${styles.option} ${value === option.value ? styles.optionActive : ''}`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FilterSelect;
