import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: relative;

  & > img {
    width: 9.25rem;
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const CoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.875rem 0;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme['base-profile']},
    #14589c 190%
  );

  img:first-of-type,
  img:last-of-type {
    width: 25.563rem;
  }
`
