import { ChangeEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from './TaskCreatingBar.module.css'

interface TaskCreatingBar {
  add: (content: string) => void
}

export function TaskCreatingBar({ add }: TaskCreatingBar) {
  const [taskText, setTaskText] = useState('')

  const setNewTaskText = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value)
  }

  const createNewTask = () => {
    event?.preventDefault()
    
    if(taskText.length > 0) {
      add(taskText)
      setTaskText('')
    }
  }

  return (
    <form
      className={ styles.form }
      onSubmit={ createNewTask }
    >
      <input
        type="text"
        placeholder="Add a new task"
        onChange={ setNewTaskText }
        value={ taskText }
        required
      />
      <button
        type="submit"
        disabled={ taskText.length < 1 ? true : false }
      >
        Add
        <PlusCircle size={ 18 } weight="bold" />
      </button>
    </form>
  )
}