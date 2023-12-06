import {
  LogoContainer,
  LogoSection,
  WelcomeSection,
} from '@/pages/login/styles'
import { Heading, Text } from '@/components/Typography'
import Head from 'next/head'
import { AuthButtons } from '@/components/AuthButtons'
import logo from '../../../public/images/logo.svg'
import Image from 'next/image'

export default function Login() {
  return (
    <LogoContainer>
      <Head>
        <title>Login | BookWise</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>

      <LogoSection>
        <Image src={logo} alt="" />
      </LogoSection>
      <WelcomeSection>
        <Heading size="lg" color="gray-100">
          Welcome!
        </Heading>
        <Text color="gray-200">Login or enter as a guest.</Text>

        <AuthButtons canGuest />
      </WelcomeSection>
    </LogoContainer>
  )
}
