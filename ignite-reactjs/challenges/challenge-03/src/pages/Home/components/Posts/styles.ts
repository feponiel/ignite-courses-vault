import styled from 'styled-components'

export const PostsContainer = styled.section`
  margin-bottom: 14.875rem;

  & > header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'title counter'
      'searchbar searchbar';
    align-items: center;
    gap: 0.75rem;

    h2 {
      grid-area: title;
      text-align: left;
      font-size: 1.125rem;
      color: ${(props) => props.theme['base-subtitle']};
    }

    span {
      grid-area: counter;
      text-align: right;
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-span']};
    }

    input {
      grid-area: searchbar;
      height: 3.125rem;
      padding: 0 1rem;
      color: ${(props) => props.theme['base-text']};
      background: ${(props) => props.theme['base-input']};
      border: 1px solid ${(props) => props.theme['base-border']};
      border-radius: 6px;

      &::placeholder {
        color: ${(props) => props.theme['base-label']};
      }
    }
  }
`

export const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`
