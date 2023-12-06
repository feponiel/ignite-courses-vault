import styled from 'styled-components'

export const QuantityCounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  width: 4.5rem;
  height: 2.375rem;
  background: ${(props) => props.theme['base-button']};
  border-radius: 6px;

  button {
    color: ${(props) => props.theme.purple};
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme['purple-dark']};
    }
  }

  span {
    width: 1.25rem;
    text-align: center;
    color: ${(props) => props.theme['base-title']};
  }
`
