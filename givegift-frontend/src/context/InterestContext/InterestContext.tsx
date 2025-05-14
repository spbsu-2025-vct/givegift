import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import { useFetching } from "../../hooks/useFetching";
import InterestService from "../../API/InterestService";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface InterestContextType {
  allInterests: string[];
  fetchInterests: () => Promise<void>;
  isInterestsLoading: boolean;
  interestError: string;
  userInterests: string[];
  setUserInterests: Dispatch<SetStateAction<string[]>>;
}

export const InterestContext = createContext<InterestContextType | null>(null);

export const InterestContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [allInterests, setAllInterests] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useLocalStorage<string[]>(
    "userInterests",
    []
  );

  const [fetchInterests, isInterestsLoading, interestError] = useFetching(
    async () => {
      const response = await InterestService.fetchAll();
      setAllInterests(response.data?.all_interests ?? [
        'Природа', 'Спорт', 'Культура', 'Кино', 'Музыка', 'Театр', 'Книги', 'Кулинария',
        'Путешествия', 'Автомобили', 'Политика', 'Дизайн', 'Искусство', 'Животные',
      ]); // TODO: MOCKED
    }
  );

  const value: InterestContextType = {
    allInterests,
    fetchInterests,
    isInterestsLoading,
    interestError,
    userInterests,
    setUserInterests,
  };

  return (
    <InterestContext.Provider value={value}>
      {children}
    </InterestContext.Provider>
  );
};

export function useInterests() {
  const ctx = useContext(InterestContext);
  if (!ctx) {
    throw new Error(
      "useInterests must be used within an InterestContextProvider"
    );
  }
  return ctx;
}
