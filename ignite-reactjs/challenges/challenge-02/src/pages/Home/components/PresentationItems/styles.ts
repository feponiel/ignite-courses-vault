import styled from 'styled-components'

export const PresentationItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5rem;
`

export const PresentationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 50%;
  margin-top: 1.25rem;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    color: ${(props) => props.theme.background};
    border-radius: 50%;
  }

  &:nth-of-type(1) .icon {
    background: ${(props) => props.theme['yellow-dark']};
  }
  &:nth-of-type(2) .icon {
    background: ${(props) => props.theme['base-text']};
  }
  &:nth-of-type(3) .icon {
    background: ${(props) => props.theme.yellow};
  }
  &:nth-of-type(4) .icon {
    background: ${(props) => props.theme.purple};
  }

  .text {
    color: ${(props) => props.theme['base-text']};
  }
`
