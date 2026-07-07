import { useContext } from 'react';
import { ErrorContext } from '../context/contexts';

export function useError() {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within ErrorProvider');
    }
    return context;
}
