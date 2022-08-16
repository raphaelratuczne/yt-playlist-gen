import React, { useState } from 'react';

export function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.log('error', e);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  //  ... persists the value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (e) {
      // A more advanced implementation would handle the error case
      console.log('error', e);
    }
  };

  return [storedValue, setValue];
}
