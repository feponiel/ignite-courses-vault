import { CoverContainer, HeaderContainer } from './styles'
import lEffect from '../../assets/l_effect.svg'
import rEffect from '../../assets/r_effect.svg'
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />

      <CoverContainer>
        <img src={lEffect} alt="" />
        <img src={rEffect} alt="" />
      </CoverContainer>
    </HeaderContainer>
  )
}
