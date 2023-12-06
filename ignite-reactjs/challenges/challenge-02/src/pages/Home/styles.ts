import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  #intro {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 5.5rem 0;
  }

  .intro__presentation {
    h1 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 3rem;
      line-height: 1.3;
      color: ${(props) => props.theme['base-title']};
    }

    p {
      margin-top: 1rem;
      line-height: 1.3;
      font-size: 1.25rem;
      color: ${(props) => props.theme['base-subtitle']};
    }
  }

  .intro__image {
    height: 22.5rem;
    text-align: right;
  }

  #products {
    padding: 1.875rem 0 9.813rem 0;

    h2 {
      font-family: 'Baloo 2', sans-serif;
      font-size: 2rem;
    }
  }
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3.375rem;
`
