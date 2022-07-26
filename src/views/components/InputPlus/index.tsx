import React, { useCallback, useState } from 'react'
import DoneIcon from './images/done.svg'
import styles from './index.module.scss'

interface InputPlusProps {
  onAdd: (title: string) => void
}

export const InputPlus: React.FC<InputPlusProps> = ({
     onAdd
  }) => {

  const [inputValue, setInputValue] = useState('')
  const addTask = useCallback(() => {
      onAdd(inputValue)
      setInputValue('')
    },
    [inputValue])

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  return (
    <div className={styles.inputPlus}>
      <input
        type='text'
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={changeInputValue}
        onKeyDown={(event) => {
          if(event.key === 'Enter') {
            addTask()
          }
        }}
        placeholder="Добавьте новую задачу, [enter] чтобы сохранить"
      />

      <button
        className={`${styles.inputPlusButton} ${inputValue.length !== 0 ? styles.inputPlusButtonActive: ''}`}
        onClick={addTask}
      >
        <img
          src={DoneIcon}
          className={styles.inputPlusIcon}
          alt="add task"
        />
      </button>
    </div>
  )
}
