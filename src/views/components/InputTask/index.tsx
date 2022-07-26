import React, { useEffect, useRef, useState } from 'react'
import deleteIcon from './images/delete.svg'
import editIcon from './images/Edit.svg'
import saveIcon from './images/Save.svg'
import styles from './index.module.scss'

interface InputTaskProps {
  id: string,
  title: string,
  onDone: (id: string) => void,
  onEdited: (id: string, value: string) => void,
  onRemoved: (id: string) => void,
}

export const InputTask: React.FC<InputTaskProps> = (props) => {
  const {
    id,
    title,
    onDone,
    onEdited,
    onRemoved
  } = props

  const [check, setCheck] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editValue, setEditValue] = useState(title)

  const taskItemRef = useRef<HTMLDivElement>(null);
  const editFieldRef = useRef<HTMLInputElement>(null);

  const checkToggler = () => {
    check
      ? setCheck(false)
      : setCheck(true)
  }

  const callRemove = () => {
    if(confirm('Вы уверены?')) {
      onRemoved(id)
    }
  }

  const changeEditValue = (event: React.ChangeEvent<HTMLInputElement>): void=> {
    setEditValue(event.target.value)
  }

  useEffect(() => {
    if (isEditMode) {
      editFieldRef?.current?.focus()
    }
  }, [isEditMode])

  useEffect(() => {
    if (check) {
      taskItemRef?.current?.classList.add('done')
      setTimeout(() => onRemoved(id), 5000)
    }
  }, [check])

  return (
    <div
      className={`${styles.inputTask} ${check ? styles.inputTaskDone : ''}`}
      ref={taskItemRef}
    >
      <div className={styles.inputTaskContainer}>
        <div>
          <input
            type='checkbox'
            checked={check}
            onChange={checkToggler}
            className={styles.inputTaskCheckbox}
            disabled={isEditMode}
          />
        </div>

        { isEditMode ?
          <input
            value={editValue}
            onInput={changeEditValue}
            ref={editFieldRef}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEdited(id, editValue);
                setIsEditMode(false)
              }
            }}
          />
          :
          <h3 className={styles.inputTaskTitle}>
              { editValue }
          </h3>
        }
      </div>

      { isEditMode ?
        <button
          aria-label="Edit"
          className={styles.inputTaskControl}
          onClick={ () => setIsEditMode(false) }
        >
          <img src={saveIcon} alt=""/>
        </button>
      :
        <button
          aria-label="Edit"
          className={styles.inputTaskControl}
          onClick={() => setIsEditMode(true)}
        >
          <img src={editIcon} alt=""/>
        </button>
      }

      <button
        aria-label="Edit"
        className={styles.inputTaskControl}
        onClick={callRemove}
      >
        <img src={deleteIcon} alt=""/>
      </button>
    </div>
  )
}
