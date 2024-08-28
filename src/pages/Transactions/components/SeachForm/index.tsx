import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionsContext";

const seachFormSchema = z.object({
  query: z.string(),
})

type SeachFormInputs = z.infer<typeof seachFormSchema>

export function SearchForm() {
const { 
  register, 
  handleSubmit,
  formState: { isSubmitting }, 
} = useForm<SeachFormInputs>({
  resolver: zodResolver(seachFormSchema)
})
const { fetchTransactions } = useContext(TransactionContext)

async function handleSeachTransactions(data: SeachFormInputs){
  await fetchTransactions(data.query)
}

  return (
    <SeachFormContainer onSubmit={handleSubmit(handleSeachTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}  
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />

        Buscar
      </button>
    </SeachFormContainer>
  )
}