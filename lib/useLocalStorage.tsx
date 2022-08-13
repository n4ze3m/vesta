import React from 'react';

export default function useLocalStorage(key: string) {
    const [value, setValue] = React.useState(() => {
        const item = window !== undefined &&  window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}