import create, { State, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { generateId } from "../helpers";

interface Task {
  id: string,
  title: string,
  createdAt: number,
}

interface TodoStore {
  tasks: Task[],
  createTask: (title: string) => void,
  updateTask: (id: string, title: string) => void,
  removeTask: (id: string) => void,
}

function isTodoStore (object: any): object is TodoStore {
  return 'tasks' in object;
}

const localStorageUpdate = <T extends State> (config: StateCreator<T>): StateCreator<T> => (set, get, api) =>
  config(
    (nextState, ...args) => {
      if(isTodoStore(nextState )) {
        window.localStorage.setItem('tasks', JSON.stringify(
          nextState.tasks
        ))
      }
      set(nextState, ...args)
    },
    get, api
  )

const getCurrentState = () => {
  try {
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[]
    return currentState
  } catch (error) {
    window.localStorage.setItem('tasks', '[]')
  }

  return []
}

export const useTodoStore = create<TodoStore>
  (
    localStorageUpdate(
    devtools(
      (set, get) => ({
            tasks: getCurrentState(),
            createTask: (title) => {
              const { tasks } = get()
              const newTask = {
                id: generateId(),
                title: title,
                createdAt: Date.now()
              }

              set({
                tasks: [newTask].concat(tasks)
              })
            },
            updateTask: (id, title) => {
              const { tasks } = get()

              set({
                tasks: tasks.map((task) => ({
                  ...task,
                  title: task.id === id ? title : task.title
                })),
              })
            },
            removeTask: (id) => {
              const { tasks } = get()

              set({
                tasks: tasks.filter((task) => task.id !== id),
              })
            }
        })
      )
    )
  )
