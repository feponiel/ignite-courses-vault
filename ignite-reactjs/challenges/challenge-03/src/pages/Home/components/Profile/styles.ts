import styled from 'styled-components'

export const ProfileContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 2.438rem;
  position: relative;
  top: -5.5rem;
  background: ${(props) => props.theme['base-profile']};
  border-radius: 10px;
  box-shadow: 0 2px 28px 0 rgba(0, 0, 0, 20%);

  & > img {
    width: 9.25rem;
    height: 9.25rem;
    border-radius: 8px;
  }
`

export const ProfileInfo = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.5rem;
      color: ${(props) => props.theme['base-title']};
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 0.75rem;
      color: ${(props) => props.theme.blue};

      &:hover::after {
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

  & > p {
    margin-top: 1.125rem;
    line-height: 1.6;
  }
`

export const AboutList = styled.ul`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  list-style: none;
`

export const AboutItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.125rem;
    color: ${(props) => props.theme['base-label']};
  }

  span {
    color: ${(props) => props.theme['base-subtitle']};
  }
`
