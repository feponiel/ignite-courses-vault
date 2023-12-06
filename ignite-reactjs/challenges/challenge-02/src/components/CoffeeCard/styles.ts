import styled from 'styled-components'

export const CoffeeCardContainer = styled.div`
  display: grid;
  grid-template-rows: 9rem 1fr 4.138rem;
  padding: 0 1.5rem 1.25rem 1.5rem;
  text-align: center;
  background: ${(props) => props.theme['base-card']};
  border-radius: 6px 36px;

  header {
    position: relative;
    top: -1.3rem;

    img {
      height: 7.5rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.25rem;
      list-style: none;
    }

    li {
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 700;
      color: ${(props) => props.theme['yellow-dark']};
      background: ${(props) => props.theme['yellow-light']};
      border-radius: 100px;
    }
  }

  .card-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: auto;

    h3 {
      line-height: 1.3;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.25rem;
      color: ${(props) => props.theme['base-subtitle']};
    }

    p {
      line-height: 1.3;
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-label']};
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;

    .price {
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-text']};

      strong {
        font-family: 'Baloo 2', sans-serif;
        font-size: 1.5rem;
        font-weight: 800;
      }
    }

    .cart-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.375rem;
        height: 2.375rem;
        color: ${(props) => props.theme['base-card']};
        background: ${(props) => props.theme['purple-dark']};
        border-radius: 6px;

        &:hover {
          background: ${(props) => props.theme.purple};
        }
      }
    }
  }
`
