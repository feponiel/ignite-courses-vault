import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activedCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I will work on:</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestion"
        placeholder="Give your project a name"
        disabled={!!activedCycle}
        {...register('task')}
      />
      <datalist id="task-suggestion">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
        <option value="Banana" />
      </datalist>
      <label htmlFor="minutesAmount">During:</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        min={5}
        max={60}
        step={5}
        placeholder="00"
        disabled={!!activedCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
