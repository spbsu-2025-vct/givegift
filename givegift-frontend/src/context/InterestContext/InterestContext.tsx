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
import type { Interest } from "../../types";

interface InterestContextType {
  allInterests: Interest[];
  fetchInterests: () => Promise<void>;
  userInterests: Interest[];
  setUserInterests: Dispatch<SetStateAction<Interest[]>>;
}

export const InterestContext = createContext<InterestContextType | null>(null);

export const InterestContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [allInterests, setAllInterests] = useState<Interest[]>([]);
  const [userInterests, setUserInterests] = useLocalStorage<Interest[]>(
    "userInterests",
    []
  );

  const [fetchInterests, ,] = useFetching(
    async () => {
      setAllInterests([
        'Природа', 'Спорт', 'Культура', 'Кино', 'Музыка', 'Театр', 'Книги', 'Кулинария',
        'Путешествия', 'Автомобили', 'Политика', 'Дизайн', 'Искусство', 'Животные',
      ]);
      // TODO: MOCKED
      const response = await InterestService.fetchAll();

    }
  );

  const value: InterestContextType = {
    allInterests,
    fetchInterests,
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
