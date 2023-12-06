import { format, formatDistanceToNow } from 'date-fns'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
    avatarUrl: string
    name: string
    role: string
}

interface Content {
    type: 'paragraph' | 'link'
    text: string
}

export interface PostProps {
    author: Author
    content: Content[]
    publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
    const publishedDateFormated = format(publishedAt, "LLLL dd 'at' h:mmaaa")
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { addSuffix: true })

    const [newCommentText, setNewCommentText] = useState('')
    const [comments, setComment] = useState(['What a cool post!'])

    const handleChangeCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    const handleCreateNewComment = (event: FormEvent) => {
        event.preventDefault()
        
        setComment([...comments, newCommentText])
        setNewCommentText('')
    }

    const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('This field is required!')
    }

    const deleteComment = (commentToDelete: string) => {
        const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)

        setComment(commentsWithoutDeletedOne)
    }

    const isCommentTextEmpty = newCommentText.length < 1

    return (
        <article className={ styles.post }>
            <header>
                <div className={ styles.author }>
                    <Avatar src={ author.avatarUrl } />
                    <div className={ styles.authorInfo }>
                        <strong>{ author.name }</strong>
                        <span>{ author.role }</span>
                    </div>
                </div>

                <time title={ publishedDateFormated } dateTime={ publishedAt.toISOString() }>{ publishedDateRelativeToNow }</time>
            </header>

            <div className={ styles.content }>
                {
                    content.map(line => {
                        if(line.type === 'paragraph') {
                            return <p key={ line.text }>{ line.text }</p>
                        } else {
                            return <p key={ line.text }><a href="#">{ line.text }</a></p>
                        }
                    })
                }
            </div>

            <form className={ styles.commentForm } onSubmit={ handleCreateNewComment }>
                <strong>Leave your feedback</strong>

                <textarea
                    placeholder='Leave a comment...'
                    value={ newCommentText }
                    onChange={ handleChangeCommentText }
                    onInvalid={ handleNewCommentInvalid }
                    required
                />
                
                <footer>
                    <button
                        type="submit"
                        disabled={ isCommentTextEmpty }
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={ styles.commentList }>
                {
                    comments.map(comment => {
                        return (
                            <Comment
                                content={ comment }
                                onDelete={ deleteComment }
                                key={ comment }
                            />
                        )
                    })
                }
            </div>
        </article>
    )
}