import React  from 'react'
import { useTodoStore } from "../../data/stores/useTodoStore";
import styles from './index.module.scss'
import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";
import notFound from './images/not-found.png'


export const App: React.FC = () => {
  const [
    tasks,
    createTask,
    updateTask,
    removeTask
  ] = useTodoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask
  ])

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To-Do list</h1>

      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if(title) {
              createTask(title)
            }
          }}
        />
      </section>

      <section
        className={styles.articleSection}
        style={{
          marginTop: '30px'
        }}
      >
        { !tasks.length && (
          <div className={ styles.articleEmptyHint }>
            <p>Нет текущих задач</p>
            <img
              className={ styles.articleEmptyHintImg }
              src={notFound}
              alt="not-found"/>
          </div>
        )}

        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  )
}
