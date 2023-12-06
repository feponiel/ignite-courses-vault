import { PageTitle } from '../ui/PageTitle'
import { Container, RatingsList } from './styles'
import { MagnifyingGlass, User } from '@phosphor-icons/react'
import { Input } from '../ui/form/Input'
import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import { ProfileRatingCard } from './ProfileRatingCard'
import { useMemo, useState } from 'react'
import { Text } from '../Typography'
import { Link } from '../ui/Link'

export type ProfileRating = Rating & {
  book: Book & {
    categories: CategoriesOnBooks &
      {
        category: Category
      }[]
  }
}

type ProfileRatingsProps = {
  ratings: ProfileRating[]
  isOwnProfile?: boolean
}

export const ProfileRatings = ({
  ratings,
  isOwnProfile,
}: ProfileRatingsProps) => {
  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.book.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ratings, search])

  return (
    <Container>
      {isOwnProfile ? (
        <PageTitle icon={<User size={25} />} title="Profile" />
      ) : (
        <Link
          href="/"
          text="Back"
          iconSide="left"
          color="white"
          css={{ alignSelf: 'flex-start' }}
        />
      )}
      <Input
        placeholder="Search rated book"
        icon={<MagnifyingGlass size={20} />}
        css={{ marginTop: 40, marginBottom: 32 }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <RatingsList>
        {filteredRatings?.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
        {filteredRatings.length <= 0 && (
          <>
            <Text color="gray-400" css={{ textAlign: 'center' }}>
              {search ? 'No results found' : 'No reviews found'}
            </Text>
          </>
        )}
      </RatingsList>
    </Container>
  )
}
