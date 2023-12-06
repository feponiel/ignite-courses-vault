import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
  background: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme['gray-500']};

  &:focus {
    border-color: ${(props) => props.theme['green-500']};
    box-shadow: none;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
