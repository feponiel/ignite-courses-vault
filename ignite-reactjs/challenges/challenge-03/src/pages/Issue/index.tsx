import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IssueContent } from './components/IssueContent'
import { IssueInfo } from './components/IssueInfo'
import { IssueContainer } from './styles'

interface User {
  login: string | null
}

interface RootObject {
  html_url: string | null
  title: string | null
  user: User
  comments: number | null
  created_at: Date | null
  body: string | null
}

export function Issue() {
  const { issueId } = useParams()
  const [issue, setIssue] = useState<RootObject>({
    user: {
      login: null,
    },
    comments: null,
    created_at: null,
    html_url: null,
    title: null,
    body: null,
  })

  useEffect(() => {
    const getFullIssue = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/feponiel/Challenge-03_Ignite-ReactJS/issues/${issueId}`,
        )

        setIssue(await response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getFullIssue()
  }, [issueId])

  return (
    <IssueContainer className="container">
      <IssueInfo
        url={issue.html_url}
        title={issue.title}
        author={issue?.user?.login}
        date={new Date(issue.created_at!)}
        comments={issue.comments}
      />

      <IssueContent content={issue.body} />
    </IssueContainer>
  )
}
