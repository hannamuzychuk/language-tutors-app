import { useState } from 'react';
import FilterSelect from './FilterSelect';
import styles from './TeachersFilters.module.css';

const LANGUAGE_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'French', label: 'French' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Polish', label: 'Polish' },
];

const LEVEL_OPTIONS = [
    { value: '', label: 'All levels' },
    { value: 'A1 Beginner', label: 'A1 Beginner' },
    { value: 'A2 Elementary', label: 'A2 Elementary' },
    { value: 'B1 Intermediate', label: 'B1 Intermediate' },
    { value: 'B2 Upper-Intermediate', label: 'B2 Upper-Intermediate' },
    { value: 'C1 Advanced', label: 'C1 Advanced' },
    { value: 'C2 Proficient', label: 'C2 Proficient' },
];

const PRICE_OPTIONS = [
    { value: '', label: 'Price' },
    { value: '10', label: '10 $' },
    { value: '20', label: '20 $' },
    { value: '30', label: '30 $' },
    { value: '40', label: '40 $' },
];

function TeachersFilters({ onChange }) {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [price, setPrice] = useState('');
    const [openFilter, setOpenFilter] = useState(null);

    const updateFilters = (next) => {
        onChange?.(next);
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
        updateFilters({ language: value, level, price });
    };

    const handleLevelChange = (value) => {
        setLevel(value);
        updateFilters({ language, level: value, price });
    };

    const handlePriceChange = (value) => {
        setPrice(value);
        updateFilters({ language, level, price: value });
    };

    return (
        <div className={styles.filters}>
            <FilterSelect
                id="language-filter"
                label="Languages"
                value={language}
                options={LANGUAGE_OPTIONS}
                placeholder="All"
                isOpen={openFilter === 'language'}
                onOpen={() => setOpenFilter('language')}
                onClose={() => setOpenFilter(null)}
                onChange={handleLanguageChange}
            />
            <FilterSelect
                id="level-filter"
                label="Level of knowledge"
                value={level}
                options={LEVEL_OPTIONS}
                placeholder="All levels"
                isOpen={openFilter === 'level'}
                onOpen={() => setOpenFilter('level')}
                onClose={() => setOpenFilter(null)}
                onChange={handleLevelChange}
            />
            <FilterSelect
                id="price-filter"
                label="Price"
                value={price}
                options={PRICE_OPTIONS}
                placeholder="Price"
                isOpen={openFilter === 'price'}
                onOpen={() => setOpenFilter('price')}
                onClose={() => setOpenFilter(null)}
                onChange={handlePriceChange}
            />
        </div>
    );
}

export default TeachersFilters;
