import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Incomes</span>
          <ArrowCircleUp size={32} />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Expenses</span>
          <ArrowCircleDown size={32} />
        </header>
        <strong>{priceFormatter.format(summary.expense)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
