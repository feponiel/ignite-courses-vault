import { signIn } from 'next-auth/react'
import { AuthButton, Container } from './styles'
import nookies, { setCookie } from 'nookies'
import { useRouter } from 'next/router'
import GoogleLogo from '../../../public/images/icons/google.svg'
import GithubLogo from '../../../public/images/icons/github.svg'
import GuestLogo from '../../../public/images/icons/rocket.svg'
import Image from 'next/image'

type AuthButtonsProps = {
  canGuest?: boolean
  callbackUrl?: string
}

export const AuthButtons = ({
  canGuest,
  callbackUrl = '/',
}: AuthButtonsProps) => {
  const router = useRouter()

  const handleSignIn = async (provider?: string) => {
    if (!provider) {
      setCookie(null, '@bookwise:guest', '', {
        maxAge: 60 * 60 * 24, // 1 dia
        path: '/',
      })

      return await router.push('/')
    }

    signIn(provider, {
      callbackUrl,
    })

    nookies.destroy(null, '@bookwise:guest')
  }
  return (
    <Container>
      <AuthButton onClick={() => handleSignIn('google')}>
        <Image src={GoogleLogo} alt="" />
        Login with Google
      </AuthButton>
      <AuthButton onClick={() => handleSignIn('github')}>
        <Image src={GithubLogo} alt="" />
        Login with Github
      </AuthButton>
      {canGuest && (
        <AuthButton onClick={() => handleSignIn()}>
          <Image src={GuestLogo} alt="" />
          Enter as a Guest
        </AuthButton>
      )}
    </Container>
  )
}
