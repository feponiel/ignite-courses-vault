import styled from 'styled-components'

export const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 32.875rem;
  margin-top: 2.5rem;
  padding: 2.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px 36px;
    padding: 1px;
    background: linear-gradient(
      to right bottom,
      ${(props) => props.theme.yellow},
      ${(props) => props.theme.purple}
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .info__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      color: white;
      border-radius: 50%;
    }

    .info__text {
      flex: 1;
      font-size: 1rem;
    }
  }

  .info:nth-of-type(1) .info__icon {
    background: ${(props) => props.theme.purple};
  }
  .info:nth-of-type(2) .info__icon {
    background: ${(props) => props.theme.yellow};
  }
  .info:nth-of-type(3) .info__icon {
    background: ${(props) => props.theme['yellow-dark']};
  }
`
