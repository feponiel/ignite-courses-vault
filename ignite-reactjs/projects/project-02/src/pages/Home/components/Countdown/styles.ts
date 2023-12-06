import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;

  #countdown {
    display: flex;
    gap: 1rem;
    line-height: 8rem;
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    color: ${(props) => props.theme['gray-100']};

    span {
      padding: 2rem 1rem;
      background: ${(props) => props.theme['gray-700']};
      border-radius: 8px;
    }
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  width: 4rem;
  padding: 2rem 0;
  overflow: hidden;
  color: ${(props) => props.theme['green-500']};
`

export const BaseCountdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
  border: none;
  border-radius: 8px;
  transition: background-color 0.1s;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
