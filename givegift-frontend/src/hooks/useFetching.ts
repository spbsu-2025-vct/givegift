/**
 * Manages the state of an asynchronous operation.
 *
 * This hook takes an asynchronous callback function as its argument and returns a tuple containing:
 * - A wrapped version of the provided callback that handles loading and error states.
 * - A boolean value that indicates whether the asynchronous operation is currently in progress.
 * - A string that holds any error message from a failed operation.
 *
 * @param callback - An asynchronous function that returns a Promise.
 * @returns A tuple containing:
 *   [0]: A function that invokes the asynchronous callback with support for loading and error state management.
 *   [1]: A boolean flag indicating if the operation is in progress.
 *   [2]: A string representing the error message, if any.
 */

import { useState } from "react";

interface IFetchCallback {
    (...args: any[]): Promise<any>;
}

export const useFetching = (callback: IFetchCallback): [(...args: any[]) => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetching = async (...args: any[]): Promise<void> => {
        try {
            setIsLoading(true);
            setError("");
            await callback(...args);
        } catch (e: any) {
            setError(e.response?.data?.message || e.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};