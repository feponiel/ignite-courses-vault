import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 1rem;
    color: ${(props) => props.theme['gray-300']};
    background: ${(props) => props.theme['gray-900']};
    border: none;
    border-radius: 6px;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme['green-300']};
    background: none;
    border: 1px solid ${(props) => props.theme['green-300']};
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    }
  }
`
