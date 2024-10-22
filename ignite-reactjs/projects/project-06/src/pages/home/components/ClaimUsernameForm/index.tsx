import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Form, FormNote } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: 'The username must have 3 characters at least!' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'The username can only contain letters and hyphens!',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = zod.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="Your username"
          {...register('username')}
        />
        <Button type="submit" size="sm" disabled={isSubmitting}>
          Reserve
          <ArrowRight />
        </Button>
      </Form>

      <FormNote>
        <Text size="sm">
          {errors.username
            ? errors.username?.message
            : 'Enter the desired username'}
        </Text>
      </FormNote>
    </>
  )
}
