import styled from 'styled-components'

export const CoffeeItemContainer = styled.div`
  display: flex;
  padding: 0.5rem 0.25rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 auto 0 1.25rem;

    p {
      font-size: 1rem;
      font-weight: normal;
      color: ${(props) => props.theme['base-subtitle']};
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;

    > div {
      height: 2rem;
    }

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 5.688rem;
      height: 2rem;
      text-transform: uppercase;
      font-size: 0.75rem;
      color: ${(props) => props.theme['base-text']};
      background: ${(props) => props.theme['base-button']};
      border: none;
      border-radius: 6px;
      cursor: pointer;

      svg {
        color: ${(props) => props.theme.purple};
      }

      &:hover {
        background: ${(props) => props.theme['base-hover']};
      }
    }
  }

  strong {
    color: ${(props) => props.theme['base-text']};
  }
`
