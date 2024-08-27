import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useState 
} from "react";

interface Transaction {
  id: number;
  description: string;
  type: "outcome" | "income";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextProps {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextProps);

export function TransactionProvider ({ children }: TransactionProviderProps) {
  
  const [transactions, setTransaction] = useState<Transaction[]>([])

  async function loadTransaction() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();

    setTransaction(data);
  }

  useEffect(() => {
    loadTransaction()
  }, [])
  
  return (
    <TransactionContext.Provider value={{ transactions }}>
      { children }
    </TransactionContext.Provider>
  )
}