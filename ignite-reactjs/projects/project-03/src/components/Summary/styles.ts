import styled from 'styled-components'

export const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1120px;
  margin: -5rem auto 0;
  padding: 0 1.5rem;
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  padding: 2rem;
  background: ${(props) =>
    props.variant === 'green'
      ? props.theme['green-700']
      : props.theme['gray-600']};
  border-radius: 6px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  &:nth-of-type(1) {
    header svg {
      color: ${(props) => props.theme['green-300']};
    }
  }

  &:nth-of-type(2) {
    header svg {
      color: ${(props) => props.theme['red-300']};
    }
  }

  &:nth-of-type(3) {
    header svg {
      color: ${(props) => props.theme.white};
    }
  }
`
