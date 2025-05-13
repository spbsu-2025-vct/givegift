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


export function useLocalStorage<T>(keyName: string, initState: T): [
    T,
    (state: T) => void,
    () => void
] {
    function getLocalStorageState(): T {
        const storedState = localStorage.getItem(keyName);
        if (storedState !== null) {
            try {
                return JSON.parse(storedState) as T;
            } catch {
                // return initial state if JSON parsing fails
                return initState;
            }
        }
        return initState;
    }

    const [localStorageState, setLocalStorageState] = useState<T>(
        getLocalStorageState()
    );

    function saveLocalStorageState(state: T): void {
        localStorage.setItem(keyName, JSON.stringify(state));
        setLocalStorageState(state);
    }

    function removeLocalStorageState(): void {
        localStorage.removeItem(keyName);
        setLocalStorageState(initState);
    }

    return [localStorageState, saveLocalStorageState, removeLocalStorageState];
}