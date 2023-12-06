import styled from 'styled-components'

export const CartContainer = styled.div`
  position: relative;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.375rem;
    height: 2.375rem;
    color: ${(props) => props.theme['yellow-dark']};
    background-color: ${(props) => props.theme['yellow-light']};
    border-radius: 0.375rem;
  }
`

export const ItemsCounter = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background: ${(props) => props.theme['yellow-dark']};
  border-radius: 50%;
`
