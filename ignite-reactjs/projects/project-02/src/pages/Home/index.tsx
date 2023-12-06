import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer } from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { createNewCycle } = useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'There must be at least one character.'),
    minutesAmount: zod
      .number()
      .min(5, 'It must be at least 5 minutes.')
      .max(60, 'It must be a maximum of 60 minutes.'),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <FormProvider {...newCycleForm}>
        <form id="pomodoroForm" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm />
        </form>
      </FormProvider>
      <Countdown submitState={isSubmitDisabled} />
    </HomeContainer>
  )
}
