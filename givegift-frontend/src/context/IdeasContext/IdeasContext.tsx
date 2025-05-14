import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import { useFetching } from "../../hooks/useFetching";
import IdeaService, { type IUserIdeaProperties } from "../../API/IdeaService";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface IdeasContextType {
  ideas: string[];
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
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isAdult, setIsAdult,] = useLocalStorage("isAdult", false);

  const [generateIdeas, isIdeasLoading, ideaError] = useFetching(
    async (userIdeaProperties: any) => {
      const response = await IdeaService.generateIdeas(
        userIdeaProperties,
        isAdult
      );
      setIdeas([]); // TODO: mocked, was response.data
    }
  );

  const value: IdeasContextType = {
    ideas,
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