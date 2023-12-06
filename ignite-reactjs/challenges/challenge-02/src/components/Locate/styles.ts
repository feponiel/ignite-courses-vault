import styled from 'styled-components'

export const LocateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  height: 2.375rem;
  padding: 0 0.5rem;
  background: ${(props) => props.theme['purple-light']};
  border-radius: 0.375rem;

  svg {
    color: ${(props) => props.theme.purple};
  }

  span {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => props.theme['purple-dark']};
  }
`
