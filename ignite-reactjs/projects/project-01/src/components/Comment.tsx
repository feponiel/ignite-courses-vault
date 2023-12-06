import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
    content: string
    onDelete: (comment: string) => void
}

export function Comment({ content, onDelete }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    const handleDeleteComment = () => {
        onDelete(content)
    }

    const handleLikeComment = () => {
        setLikeCount(likeCount + 1)
    }

    return (
        <div className={ styles.comment }>
            <Avatar hasBorder={ false } src="https://github.com/diego3g.png" />

            <div className={ styles.commentBox }>
                <div className={ styles.commentContent }>
                    <header>
                        <div className={ styles.authorAndTime }>
                            <strong>Diego Fernandes</strong>
                            <time title="31 de Agosto às 14:39" dateTime="2022-08-31 14:39:00">About 1h ago</time>
                        </div>

                        <button title='Delete comment' onClick={ handleDeleteComment }>
                            <Trash size={ 24 } />
                        </button>
                    </header>

                    <p>{ content }</p>
                </div>
                <footer>
                    <button onClick={ handleLikeComment }>
                        <ThumbsUp />
                        Applaud <span>{ likeCount }</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}