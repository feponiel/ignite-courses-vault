import { Post } from './components/Post'
import { PostList, PostsContainer } from './styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'dotenv/config'

export function Posts() {
  const [postList, setPostList] = useState([])

  const createPostList = async () => {
    const response = await axios.get(
      'https://api.github.com/repos/feponiel/ignite-courses-vault/issues',
    )

    setPostList(await response.data)
  }

  useEffect(() => {
    createPostList()
  }, [])

  const { register, watch } = useForm()

  const currentPostList = postList.filter((post) => {
    const postTitle = JSON.stringify(post.title).toLowerCase()
    const postContent = JSON.stringify(post.body).toLowerCase()
    const watcher = watch('searchPosts').toLowerCase()

    return postTitle.includes(watcher) || postContent.includes(watcher)
  })

  return (
    <PostsContainer>
      <header>
        <h2>Posts</h2>
        <span>{postList.length} posts</span>
        <input
          type="text"
          placeholder="Search content"
          {...register('searchPosts')}
        />
      </header>

      <PostList>
        {currentPostList.map((post) => {
          return (
            <Post
              title={post.title}
              date={new Date(post.created_at)}
              content={post.body}
              number={post.number}
              key={post.created_at}
            />
          )
        })}
      </PostList>
    </PostsContainer>
  )
}
