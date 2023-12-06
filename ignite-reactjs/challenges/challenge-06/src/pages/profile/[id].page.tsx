import { DefaultLayout } from '@/layouts/DefaultLayout'
import { ReactElement } from 'react'
import { HomeContainer } from '@/pages/home/styles'
import { NextPageWithLayout } from '../_app.page'
import { ProfileRating, ProfileRatings } from '@/components/ProfileRatings'
import { ProfileDetails } from '@/components/ProfileDetails'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'

export type ProfileData = {
  ratings: ProfileRating[]
  user: {
    avatar_url: string
    name: string
    member_since: string
  }
  readPages: number
  ratedBooks: number
  readAuthors: number
  mostReadCategory?: string
}

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query.id as string

  const { data: session } = useSession()

  const isOwnProfile = session?.user?.id === userId

  const { data: profile } = useQuery<ProfileData>(
    ['profile', userId],
    async () => {
      const { data } = await api.get(`/profile/${userId}`)
      return data?.profile ?? {}
    },
    {
      enabled: !!userId,
    },
  )

  return (
    <HomeContainer>
      {profile ? (
        <>
          <ProfileRatings
            isOwnProfile={isOwnProfile}
            ratings={profile?.ratings}
          />
          <ProfileDetails profile={profile} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </HomeContainer>
  )
}

ProfilePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Profile">{page}</DefaultLayout>
}

export default ProfilePage
