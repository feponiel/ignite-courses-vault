import { useState } from 'react'
import { TaskCreatingBar } from './components/TaskCreatingBar'
import { Task } from './components/Task'

import './global.css'
import styles from './App.module.css'
import logo from './assets/todo.svg'
import clipboard from './assets/clipboard.svg'

export function App() {
  const [tasks, setTask] = useState<string[]>([])
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const addTask = (taskContent: string) => {
    setTask([...tasks, taskContent])
  }

  const toggleTaskCheck = (task: string, isChecked: boolean) => {
    if(isChecked) {
      setCompletedTasks([...completedTasks, task])
    } else {
      const newTaskList = completedTasks.filter(taskContent => taskContent !== task)

      setCompletedTasks(newTaskList)
    }
  }

  const removeTask = (task: string) => {
    const newTaskList = tasks.filter(taskContent => taskContent !== task)

    setTask(newTaskList)
  }

  return (
    <>
      <header className={ styles.header }>
        <img src={ logo } alt="Logotipo do ToDo" />
      </header>

      <section className={ styles.tasks }>
        <TaskCreatingBar add={ addTask } />
        
        <div className={ styles.tasksContainer }>
          <header className={ styles.taskCounters }>
            <p>Created Tasks <span>{ tasks.length }</span></p>
            <p>Completed <span>{ completedTasks.length } / { tasks.length }</span></p>
          </header>

          <main>
            {
              tasks.length > 0 ? (
                tasks.map(text => {
                  return <Task content={ text } toggleCheck={ toggleTaskCheck } remove={ removeTask } key={ text } />
                })
              ) : (
                <div className={ styles.noTasks }>
                  <img src={ clipboard } alt="clipboard" />
                  <p><strong>You don't have any tasks registered yet</strong><br />Create tasks and organize your to-do items</p>
                </div>
              )
            }
          </main>
        </div>
      </section>
    </>
  )
}
