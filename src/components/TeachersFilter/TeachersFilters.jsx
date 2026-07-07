import { useMemo, useState } from 'react';
import FilterSelect from './FilterSelect';
import { getTeacherLevels } from '../../utils/levelUtils';
import { getAllTeacherLanguages } from '../../utils/teacherUtils';
import styles from './TeachersFilters.module.css';

const LEVEL_ORDER = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];

function getLevelSortKey(level) {
    const code = level?.trim().slice(0, 2).toLowerCase();
    const index = LEVEL_ORDER.indexOf(code);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function TeachersFilters({ onChange, teachers = [] }) {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [price, setPrice] = useState('');
    const [openFilter, setOpenFilter] = useState(null);

    const languageOptions = useMemo(() => {
        const uniqueLanguages = new Set();

        teachers.forEach((teacher) => {
            getAllTeacherLanguages(teacher).forEach((lang) => {
                if (lang) uniqueLanguages.add(lang);
            });
        });

        const sorted = Array.from(uniqueLanguages).sort((a, b) => a.localeCompare(b));
        return [{ value: '', label: 'All' }, ...sorted.map((lang) => ({ value: lang, label: lang }))];
    }, [teachers]);

    const levelOptions = useMemo(() => {
        const uniqueLevels = new Set();

        teachers.forEach((teacher) => {
            getTeacherLevels(teacher.levels).forEach((teacherLevel) => {
                if (teacherLevel) uniqueLevels.add(teacherLevel);
            });
        });

        const sorted = Array.from(uniqueLevels).sort((a, b) => {
            const byLevelCode = getLevelSortKey(a) - getLevelSortKey(b);
            if (byLevelCode !== 0) return byLevelCode;
            return a.localeCompare(b);
        });

        return [{ value: '', label: 'All levels' }, ...sorted.map((item) => ({ value: item, label: item }))];
    }, [teachers]);

    const priceOptions = [
        { value: '', label: 'Price' },
        { value: '10', label: '10 $' },
        { value: '20', label: '20 $' },
        { value: '30', label: '30 $' },
        { value: '40', label: '40 $' },
    ];

    const updateFilters = (next) => {
        onChange?.(next);
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
        setLevel('');
        setPrice('');
        updateFilters({ language: value, level: '', price: '' });
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
                options={languageOptions}
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
                options={levelOptions}
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
                options={priceOptions}
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
