import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import { NextSeo } from 'next-seo'

import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Uncomplicate your schedule | Ignite Call"
        description="Connect your calendar and allow people to schedule meetings in your free time."
      />

      <Container>
        <Hero>
          <Heading size="4xl">Hassle-free scheduling</Heading>
          <Text size="xl">
            Connect your calendar and allow people to schedule meetings in your
            free time.
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendar symbolizing the application running"
          />
        </Preview>
      </Container>
    </>
  )
}
