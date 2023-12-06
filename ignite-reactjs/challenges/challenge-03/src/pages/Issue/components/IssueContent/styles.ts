import styled from 'styled-components'

export const IssueContentContainer = styled.div`
  padding: 2.5rem 2rem;

  a {
    color: ${(props) => props.theme.blue};
  }

  ul,
  ol {
    list-style-position: inside;
  }

  .line-break {
    white-space: pre-wrap;
    line-height: 1.6;
  }
`
