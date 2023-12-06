import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import {
  CountdownContainer,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface CountdownProps {
  submitState: boolean
}

export function Countdown({ submitState }: CountdownProps) {
  const {
    activedCycle,
    activedCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    interruptCurrentCycle,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activedCycle ? activedCycle.minutesAmount * 60 : 0

  const currentSeconds = activedCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activedCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activedCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    activedCycle,
    totalSeconds,
    activedCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activedCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activedCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <div id="countdown">
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </div>

      {!activedCycle ? (
        <StartCountdownButton
          type="submit"
          form="pomodoroForm"
          disabled={submitState}
        >
          <Play size={24} />
          Start
        </StartCountdownButton>
      ) : (
        <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
          <HandPalm size={24} />
          Stop
        </StopCountdownButton>
      )}
    </CountdownContainer>
  )
}
