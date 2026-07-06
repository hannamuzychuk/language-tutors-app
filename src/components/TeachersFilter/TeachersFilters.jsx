import { useState } from 'react';
import styles from './TeachersFilters.module.css';

function TeachersFilters({onChange}) {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [price, setPrice] = useState('');

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        setLanguage(value);
        onChange?.({language: value, level, price});
    };

    const handleLevelChange = (e) => {
        const value = e.target.value;
        setLevel(value);
        onChange?.({language: language, level: value, price});
    };
    
    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
        onChange?.({language: language, level: level, price: value});
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label className={styles.label} htmlFor="language-filter">Languages</label>
                <select className={styles.select} id="language-filter" value={language} onChange={handleLanguageChange}>
                    <option value="">All</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="French">French</option>
                    <option value="Ukrainian">Ukrainian</option>
                    <option value="Polish">Polish</option>
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label className={styles.label} htmlFor="level-filter">Level of knowledge</label>
                <select className={styles.select} id="level-filter" value={level} onChange={handleLevelChange}>
                    <option value="">All levels</option>
                    <option value="A1 Beginner">A1 Beginner</option>
                    <option value="A2 Elementary">A2 Elementary</option>
                    <option value="B1 Intermediate">B1 Intermediate</option>
                    <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
                    <option value="C1 Advanced">C1 Advanced</option>
                    <option value="C2 Proficient">C2 Proficient</option>
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label className={styles.label} htmlFor="price-filter">Price</label>
                <select className={styles.select} id="price-filter" value={price} onChange={handlePriceChange}>
                    <option value="">Any price</option>
                    <option value="10">10 $</option>
                    <option value="20">20 $</option>
                    <option value="30">30 $</option>
                    <option value="40">40 $</option>
                </select>
            </div>
        </div>
    )
}

export default TeachersFilters;