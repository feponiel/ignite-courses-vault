import { formatDistanceToNowStrict } from 'date-fns'
import { NavLink } from 'react-router-dom'
import { InfoItem, InfoList, IssueInfoContainer } from './styles'

interface IssueInfoProps {
  url: string | null
  title: string | null
  author: string | null
  date: Date | null
  comments: number | null
}

export function IssueInfo({
  url,
  title,
  author,
  date,
  comments,
}: IssueInfoProps) {
  const creationTime =
    typeof date !== 'string' &&
    formatDistanceToNowStrict(date!, {
      addSuffix: true,
    })

  return (
    <IssueInfoContainer>
      <header>
        <nav>
          <NavLink to="/">
            <i className="fa-solid fa-chevron-left"></i>
            Back
          </NavLink>

          <a href={url!} target="_blank" rel="noreferrer">
            View on Github
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </nav>
      </header>

      <h1>{title}</h1>

      <InfoList>
        <InfoItem>
          <i className="fa-brands fa-github"></i>
          <span>{author}</span>
        </InfoItem>
        <InfoItem>
          <i className="fa-solid fa-calendar-day"></i>
          <span>{creationTime}</span>
        </InfoItem>
        <InfoItem>
          <i className="fa-solid fa-comment"></i>
          <span>{comments} comments</span>
        </InfoItem>
      </InfoList>
    </IssueInfoContainer>
  )
}
