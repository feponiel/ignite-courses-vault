import { IssueContentContainer } from './styles'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

interface IssueContentProps {
  content: string | null
}

export function IssueContent({ content }: IssueContentProps) {
  return (
    <IssueContentContainer>
      <ReactMarkdown className="line-break" rehypePlugins={[rehypeRaw]}>
        {content!}
      </ReactMarkdown>
    </IssueContentContainer>
  )
}
