import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Container, Header } from '../styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormNote, ProfileBox } from './styles'
import { GetServerSideProps } from 'next'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const updateProfileSchema = zod.object({
  bio: zod.string(),
})

type UpdateProfileData = zod.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Finish | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Welcome to Ignite Call!</Heading>
          <Text>
            We need some information to create your profile! Oh, and you can
            edit these informations later.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Profile picture</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">About you</Text>
            <TextArea placeholder="About you..." {...register('bio')} />
            <FormNote size="sm">
              Talk a little about you. This will be shown in your bio.
            </FormNote>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finish
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
