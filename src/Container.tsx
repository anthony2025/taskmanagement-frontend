import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { findIndex, clone } from 'ramda'

import Category from './Category'
import { TaskComponent } from './TaskComponent'

import type { Task } from './types'
import { tasksUrl, categoryChangeUrl } from './constants'

export type ContainerState = {
  tasks: Task[]
}

const initialState: ContainerState = {
  tasks: []
}

export type MoveTask = (
    taskId: string,
    category: string,
    destination: string
  ) => void

const Container: FC = () => {
  const [state, setState] = useState<ContainerState>(initialState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(tasksUrl, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tasks = await response.json()
        setState({ tasks })
        console.log(tasks)
      } catch (error) {
        console.warn('API error', error)
      }
    }
    fetchData();
  }, [])

  const moveTask: MoveTask = (taskId, origin, destination) => {
    setState((previousState: ContainerState): ContainerState => {
      if (origin === destination) return previousState
      let tasks = clone(previousState.tasks)
      const taskIndex = findIndex(task => (task as Task).id === taskId)(tasks)
      tasks[taskIndex].categoryName = destination
      const newState = { tasks }
      const changeCategoryOnServer = async () => {
        try {
          const url = `${categoryChangeUrl}/${destination}/taskId`
          await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          })
          console.log("changed category")
        } catch (error) {
          console.warn('API error', error)
        }
      }
      changeCategoryOnServer()
      return newState
    })
  }

  const categories = ['inbox', 'work', 'study']
  const tasks: Task[] = state.tasks

  return (
    <div className='container'>
      {categories.map(category =>
        <Category name={category} key={category}>
          {tasks.filter(task => task.categoryName === category).map(task =>
            <TaskComponent
              id={task.id}
              description={task.description}
              category={category}
              moveTask={moveTask}
              key={task.id}
              data-testid='task'
            />
          )}
        </Category>
      )}
    </div>
  )
}

export default Container
