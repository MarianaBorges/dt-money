import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionSchema = z.object({
  description: z.string(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
  price: z.number()
})

type NewTransactionInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const { 
    control,
    register, 
    handleSubmit,
    formState: { isSubmitting } 
  } = useForm<NewTransactionInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type:'income'
    }
  })

  async function handleNewTransactions(data: NewTransactionInputs){
    await new Promise(resolver => setTimeout(resolver, 2000))
    console.log(data)
  }

  return(
    <Dialog.Portal>
    <Overlay />

    <Content>
      <Dialog.Title>Nova transação</Dialog.Title>

      <CloseButton>
        <X size={24}/>
      </CloseButton>

      <form action="" onSubmit={handleSubmit(handleNewTransactions)}>
        <input 
          type="text" 
          placeholder="Descrição" 
          required 
          {...register('description')}/>

        <input 
          type="number" 
          placeholder="Preço" 
          required 
          {...register('price', { valueAsNumber: true})}/>

        <input 
          type="text" 
          placeholder="Categoria" 
          required 
          {...register('category')}/>

        
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            console.log(field)
            return(
              <TransactionType 
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
      
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />

        <button type="submit" disabled={isSubmitting}>
          Cadastrar
        </button>
      </form>


    </Content>
  </Dialog.Portal>
  )
}