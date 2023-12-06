import styled from 'styled-components'

export const PostContainer = styled.article`
  background: ${(props) => props.theme['base-post']};
  border-radius: 10px;

  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;
    text-decoration: none;
    color: ${(props) => props.theme['base-text']};
    border-radius: inherit;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      width: 15rem;
      line-height: 1.6;
      font-size: 1.25rem;
      color: ${(props) => props.theme['base-title']};
    }

    span {
      line-height: 2;
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-span']};
    }
  }

  p {
    margin-top: 1rem;
    line-height: 1.6;
  }

  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme['base-label']};
  }
`
