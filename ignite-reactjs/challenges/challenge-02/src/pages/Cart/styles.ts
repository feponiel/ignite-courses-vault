import styled from 'styled-components'

export const CartContainer = styled.div`
  gap: 2rem;
  padding: 2.5rem 0;

  section > h2 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.125rem;
    color: ${(props) => props.theme['base-subtitle']};
  }

  section > div {
    margin-top: 0.75rem;
    padding: 2.5rem;
    background-color: ${(props) => props.theme['base-card']};
    border-radius: 6px;
  }

  section#complete-order {
    width: 60%;
  }

  section#your-cart {
    width: 40%;
  }

  section#your-cart > div {
    border-radius: 6px 44px;
  }

  section > div > header {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;

    h3 {
      line-height: 1.3;
      font-size: 1rem;
      font-weight: 400;
      color: ${(props) => props.theme['base-subtitle']};
    }

    p {
      line-height: 1.3;
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-text']};
    }
  }

  section > div > header > div {
    margin-top: 0.14rem;
  }
`

export const AddressFormContainer = styled.div`
  header svg {
    color: ${(props) => props.theme['yellow-dark']};
  }

  form {
    display: grid;
    grid-template-columns: 40% 46% 10%;
    grid-template-areas:
      'cep . .'
      'street street street'
      'number complement complement'
      'district city uf';
    gap: 0.75rem 2%;

    > [placeholder='CEP'] {
      grid-area: cep;
    }
    > [placeholder='Street'] {
      grid-area: street;
    }
    > [placeholder='Number'] {
      grid-area: number;
    }
    > div {
      grid-area: complement;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.25rem;

      input {
        flex: 1;
        height: 100%;
        background: none;
        border: none;
      }

      label {
        -webkit-user-select: none;
        user-select: none;
        font-size: 0.75rem;
        font-style: italic;
        color: ${(props) => props.theme['base-label']};
      }
    }
    > [placeholder='District'] {
      grid-area: district;
    }
    > [placeholder='City'] {
      grid-area: city;
    }
    > [placeholder='UF'] {
      grid-area: uf;
    }

    & > * {
      height: 2.625rem;
      padding: 0 0.75rem;
      background: ${(props) => props.theme['base-input']};
      border: 1px solid ${(props) => props.theme['base-button']};
      border-radius: 0.25rem;
    }

    & > *:focus-within {
      border-color: ${(props) => props.theme['yellow-dark']};
    }

    input {
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-text']};
      outline: none;
    }

    input::placeholder {
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-label']};
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

export const PaymentMethodFormContainer = styled.div`
  header svg {
    color: ${(props) => props.theme.purple};
  }

  form {
    display: flex;
    justify-content: space-between;
  }

  input {
    display: none;
  }

  input:checked + label {
    background: ${(props) => props.theme['purple-light']};
    outline: 1px solid ${(props) => props.theme.purple};
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 11.167rem;
    padding: 1rem;
    -webkit-user-select: none;
    user-select: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: ${(props) => props.theme['base-text']};
    background: ${(props) => props.theme['base-button']};
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;

    svg {
      color: ${(props) => props.theme.purple};
    }

    &:hover {
      background: ${(props) => props.theme['base-hover']};
    }
  }
`

export const OrderContainer = styled.div`
  > ul {
    list-style: none;
    max-height: 18.75rem;
    overflow-y: scroll;

    > p {
      color: ${(props) => props.theme['base-subtitle']};
      margin-bottom: 4rem;
    }

    li {
      padding: 1.5rem 0;
      border-bottom: 1px solid ${(props) => props.theme['base-button']};
    }

    li:first-of-type {
      padding-top: 0;
    }
  }

  > table {
    width: 100%;
    margin: 1.5rem 0;

    td {
      padding: 0.375rem 0;
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-text']};
    }

    td:nth-child(even) {
      text-align: right;
      font-size: 1rem;
    }

    tr:first-child td {
      padding-top: 0;
    }

    tr:last-child td {
      padding-bottom: 0;
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  > button,
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 700;
    color: white;
    background: ${(props) => props.theme.yellow};
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
  }

  > button {
    opacity: 0.6;
    cursor: not-allowed;
  }

  > a:hover {
    background: ${(props) => props.theme['yellow-dark']};
  }
`
