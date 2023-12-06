import { PostContainer } from './styles'
import { formatDistanceToNowStrict } from 'date-fns'
import { NavLink } from 'react-router-dom'

interface PostProps {
  title: string
  date: Date
  content: string
  number: number
}

export function Post({ title, date, content, number }: PostProps) {
  const summary = content.split(' ').slice(0, 23).join(' ') + '...'
  const howMuchTime = formatDistanceToNowStrict(date, {
    addSuffix: true,
  })

  const issueURL = `/issues/${number}`

  return (
    <PostContainer>
      <NavLink to={issueURL}>
        <header>
          <h3>{title}</h3>
          <span>{howMuchTime}</span>
        </header>

        <p>{summary}</p>
      </NavLink>
    </PostContainer>
  )
}
