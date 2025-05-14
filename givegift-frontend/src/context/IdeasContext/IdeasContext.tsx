import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import { useFetching } from "../../hooks/useFetching";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { IProduct, IUserIdeaProperties } from "../../types";
import IdeaService from "../../API/IdeaService";


interface IdeasContextType {
  productIdeas: IProduct[];
  generateIdeas: (userIdeaProperties: IUserIdeaProperties) => Promise<void>;
  isIdeasLoading: boolean;
  ideaError: string;
  isAdult: boolean;
  setIsAdult: Dispatch<SetStateAction<boolean>>;
}

export const IdeasContext = createContext<IdeasContextType | null>(null);

export const IdeasContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productIdeas, setProductIdeas] = useState<IProduct[]>([]);
  const [isAdult, setIsAdult,] = useLocalStorage("isAdult", false);

  const [generateIdeas, isIdeasLoading, ideaError] = useFetching(
    async (userIdeaProperties: IUserIdeaProperties) => {
      const response = await IdeaService.generateIdeas(
        userIdeaProperties,
        isAdult
      );
      setProductIdeas(response.data);
    }
  );

  const value: IdeasContextType = {
    productIdeas,
    generateIdeas,
    isIdeasLoading,
    ideaError,
    isAdult,
    setIsAdult,
  };

  return (
    <IdeasContext.Provider value={value}>
      {children}
    </IdeasContext.Provider>
  );
};


export function useIdeas() {
  const ctx = useContext(IdeasContext);
  if (!ctx) {
    throw new Error("useIdeas must be used within an IdeasContextProvider");
  }
  return ctx;
}