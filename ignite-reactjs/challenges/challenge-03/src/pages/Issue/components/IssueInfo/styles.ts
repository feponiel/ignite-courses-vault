import styled from 'styled-components'

export const IssueInfoContainer = styled.div`
  width: 100%;
  padding: 2rem 2.438rem;
  background: ${(props) => props.theme['base-profile']};
  border-radius: 10px;
  box-shadow: 0 2px 28px 0 rgba(0, 0, 0, 20%);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 0.75rem;
      color: ${(props) => props.theme.blue};

      &:last-child:hover::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -2px;
        background-color: ${(props) => props.theme.blue};
      }
    }
  }

  h1 {
    margin-top: 1.25rem;
    line-height: 1.3;
    font-size: 1.5rem;
    color: ${(props) => props.theme['base-title']};
  }
`

export const InfoList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0.5rem;
  list-style: none;
`

export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.125rem;
    color: ${(props) => props.theme['base-label']};
  }

  span {
    font-size: 1rem;
    color: ${(props) => props.theme['base-span']};
  }
`
