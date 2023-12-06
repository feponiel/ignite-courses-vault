import styled from 'styled-components'

export const SuccessContainer = styled.div`
  padding: 2.5rem 0;

  #success {
    width: 100%;
    display: flex;
  }

  .success__message {
    h2 {
      line-height: 1.3;
      font-family: 'Baloo 2', sans-serif;
      font-size: 2rem;
      color: ${(props) => props.theme['yellow-dark']};
    }

    p {
      line-height: 1.3;
      font-size: 1.25rem;
      color: ${(props) => props.theme['base-subtitle']};
    }
  }

  .success__image {
    align-self: flex-end;
    height: 18.313rem;
    margin-left: auto;
  }
`
