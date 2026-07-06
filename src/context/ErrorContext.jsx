import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import GlobalErrorHandler from '../components/GlobalErrorHandler/GlobalErrorHandler';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const showError = useCallback((message) => {
        setError(message || 'Something went wrong. Please try again.');
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        if (!error) return undefined;

        const timeoutId = setTimeout(clearError, 5000);
        return () => clearTimeout(timeoutId);
    }, [error, clearError]);

    const contextValue = useMemo(
        () => ({ showError, clearError }),
        [showError, clearError]
    );

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
            <GlobalErrorHandler error={error} onClose={clearError} />
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within ErrorProvider');
    }
    return context;
}
