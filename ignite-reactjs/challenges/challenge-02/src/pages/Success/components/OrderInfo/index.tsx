import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { useContext } from 'react'
import { ClientInfoContext } from '../../../../contexts/ClientInfoContext'
import { OrderInfoContainer } from './styles'

export function OrderInfo() {
  const { clientInfo } = useContext(ClientInfoContext)

  return (
    <OrderInfoContainer>
      <div className="info">
        <div className="info__icon">
          <MapPin size={16} weight="fill" />
        </div>
        <p className="info__text">
          Delivery to{' '}
          <strong>
            {clientInfo?.street}, {clientInfo?.number}
          </strong>{' '}
          <br /> {clientInfo?.district} - {clientInfo?.city}, {clientInfo?.uf}
        </p>
      </div>

      <div className="info">
        <div className="info__icon">
          <Timer size={16} weight="fill" />
        </div>
        <p className="info__text">
          Delivery forecast <br /> <strong>20 min - 30 min</strong>
        </p>
      </div>

      <div className="info">
        <div className="info__icon">
          <CurrencyDollar size={16} />
        </div>
        <p className="info__text">
          Payment on delivery <br /> <strong>{clientInfo?.payment}</strong>
        </p>
      </div>
    </OrderInfoContainer>
  )
}
