import { MagnifyingGlass } from "phosphor-react";
import { SeachFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const seachFormSchema = z.object({
  query: z.string(),
})

type SeachFormInputs = z.infer<typeof seachFormSchema>

export function SearchForm() {
const { 
  register, 
  handleSubmit,
  formState: { isSubmitting } 
} = useForm<SeachFormInputs>({
  resolver: zodResolver(seachFormSchema)
})

async function handleSeachTransactions(data: SeachFormInputs){
  await new Promise(resolver => setTimeout(resolver, 2000))
  console.log(data)
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