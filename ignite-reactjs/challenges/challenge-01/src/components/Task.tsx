import { ChangeEvent, useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface Task {
  content: string
  toggleCheck: (task: string, bool: boolean) => void
  remove: (task: string) => void
}

export function Task({ content, toggleCheck, remove }: Task) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false)

  const toggleTaskCheck = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked) {
      toggleCheck(content, true)
      setIsTaskCompleted(true)
    } else {
      toggleCheck(content, false)
      setIsTaskCompleted(false)
    }
  }

  const removeTask = () => {
    remove(content)
    toggleCheck(content, false)
  }

  return (
    <div className={ styles.task }>
      <input type="checkbox" onChange={ toggleTaskCheck } />
      <p className={ isTaskCompleted ? styles.completed : '' }>{ content }</p>
      <button onClick={ removeTask }>
        <Trash size={ 24 } />
      </button>
    </div>
  )
}