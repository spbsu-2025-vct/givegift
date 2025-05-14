/**
 * Synchronizes a state variable with localStorage.
 *
 * @template T - The type of the state to be managed and persisted.
 * @param keyName - The key under which the state is stored in localStorage.
 * @param initState - The initial state value used if no stored state is found or JSON parsing fails.
 * @returns A tuple containing:
 *   - The current state.
 *   - A function to update the state in both the component and localStorage.
 *   - A function to remove the state from localStorage and reset it to the initial value.
 *
 * This hook retrieves the initial state from localStorage, falling back to the provided initial state if necessary.
 * When the state is updated, it is stored in localStorage after being serialized to JSON.
 * The hook ensures that state changes are synchronized between the component and localStorage.
 */
import { useState } from "react";

export function useLocalStorage<T>(
    keyName: string,
    initState: T
): [
        T,
        React.Dispatch<React.SetStateAction<T>>,
        () => void
    ] {
    // read from localStorage (or fall back)
    function getLocalStorageState(): T {
        const stored = localStorage.getItem(keyName);
        if (stored !== null) {
            try {
                return JSON.parse(stored) as T;
            } catch {
                return initState;
            }
        }
        return initState;
    }

    const [state, setState] = useState<T>(getLocalStorageState);

    const setAndStore: React.Dispatch<React.SetStateAction<T>> = (value) => {
        setState((prev) => {
            const newValue =
                typeof value === "function"
                    ? (value as (prev: T) => T)(prev)
                    : value;
            localStorage.setItem(keyName, JSON.stringify(newValue));
            return newValue;
        });
    };

    const remove = () => {
        localStorage.removeItem(keyName);
        setState(initState);
    };

    return [state, setAndStore, remove];
}
