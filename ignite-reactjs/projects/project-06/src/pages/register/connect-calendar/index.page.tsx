import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error

  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Connect the calendar | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Conenect your calendar!</Heading>
          <Text>
            Connect your calendar to automatically check your busy hours and new
            events as they are scheduled.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            {isSignedIn ? (
              <Button size="sm" disabled>
                Connected
                <Check weight="bold" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleConnectCalendar}
              >
                Connect
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError>
              An error occurred on connecting to Google Calendar. Please check
              your permissions and try again later.
            </AuthError>
          )}

          <Button
            type="submit"
            onClick={handleNavigateToNextStep}
            disabled={!isSignedIn}
          >
            Next step
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
