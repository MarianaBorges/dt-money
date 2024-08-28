import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useState 
} from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "outcome" | "income";
  category: string;
  price: number;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: "outcome" | "income";
  category: string;
  price: number;
}

interface TransactionContextProps {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextProps);

export function TransactionProvider ({ children }: TransactionProviderProps) {
  
  const [transactions, setTransaction] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        description: query
      }
    })

    setTransaction(response.data);
  }

  async function createTransaction(data: CreateTransactionInput){
    const { description, category, price, type } = data

    const response = await api.post('transactions', {
      description, 
      price, 
      category, 
      type,
      createdAt: new Date()
    })

    setTransaction(state => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  
  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      fetchTransactions, 
      createTransaction 
    }}>
      { children }
    </TransactionContext.Provider>
  )
}