import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { findIndex, clone } from 'ramda'

import { CategoryComponent } from './CategoryComponent'
import { TaskComponent } from './TaskComponent'

import type { Task, Category } from './types'
import { baseUrl } from './constants'

export type ContainerState = {
  tasks: Task[],
  categories: any[]
}

const initialState: ContainerState = {
  tasks: [],
  categories: [],
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
        const tasksResponse = await fetch(`${baseUrl}/tasks`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const categoriesResponse = await fetch(`${baseUrl}/categories`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tasks: Task[] = await tasksResponse.json()
        const categories: Category[] = await categoriesResponse.json()
        setState({ tasks, categories })
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
      const newState = { categories: previousState.categories, tasks }
      const changeCategoryOnServer = async () => {
        try {
          const url = `${baseUrl}/${taskId}/category/categoryId`
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
        <CategoryComponent name={category} key={category}>
          {tasks.filter(task => task.categoryName === category).map(task =>
            <TaskComponent
              id={task.id}
              description={task.description}
              categoryName={category}
              moveTask={moveTask}
              key={task.id}
              data-testid='task'
            />
          )}
        </CategoryComponent>
      )}
    </div>
  )
}

export default Container
