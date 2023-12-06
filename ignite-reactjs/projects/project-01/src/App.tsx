import { Header } from './components/Header'
import { Post, PostProps } from './components/Post'
import { Sidebar } from './components/Sidebar'

import styles from './App.module.css'

interface Post extends PostProps {
  id: number
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/felipemacci.png',
      name: 'Felipe Macci',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', text: 'Hey guyss 👋' },
      { type: 'paragraph', text: 'I just uploaded another project in my portfolio. It\'s a project I did at NLW Return, Rocketseat event. The project name is DoctorCare 🚀' },
      { type: 'link', text: '👉 macci.design/doctorcare' }
    ],
    publishedAt: new Date('2022-08-31 01:30:42')
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator at Rocketseat'
    },
    content: [
      { type: 'paragraph', text: 'Hey guys!' },
      { type: 'paragraph', text: 'New content just arrived for Discover\'s Specialize track, go check it out!' }
    ],
    publishedAt: new Date('2022-08-05 16:34:19')
  },

  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO at Rocketseat'
    },
    content: [
      { type: 'paragraph', text: 'Hey dev!' },
      { type: 'paragraph', text: 'Just passing by to test the Ignite Feed...' }
    ],
    publishedAt: new Date('2022-08-03 23:00:11')
  }
]

export function App() {
  return (
    <>
      <Header />

      <div className={ styles.wrapper }>
        <Sidebar />

        <main>
          {
            posts.map(post => {
              return (
                <Post author={ post.author } content={ post.content } publishedAt={ post.publishedAt } key={ post.id } />
              )
            })
          }
        </main>
      </div>
    </>
  )
}