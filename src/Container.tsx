import type { FC } from 'react'
import { useState } from 'react'
import { findIndex, clone } from 'ramda'

import Category from './Category'
import { TaskComponent } from './TaskComponent'

import type { Task } from './types'
import tasks from './tasks'

export type ContainerState = {
  tasks: Task[]
}

const initialState: ContainerState = { tasks }

export type MoveTask = (
    taskId: string,
    category: string,
    destination: string
  ) => void

const Container: FC = () => {
  const [state, setState] = useState<ContainerState>(initialState)

  const moveTask: MoveTask = (taskId, origin, destination) => {
    setState((previousState: ContainerState): ContainerState => {
      if (origin === destination) return previousState
      let tasks = clone(previousState.tasks)
      const taskIndex = findIndex(task => (task as Task).id === taskId)(tasks)
      tasks[taskIndex].category = destination
      const newState = { tasks }
      return newState
    })
  }

  const categories = ['inbox', 'work', 'study']
  const tasks: Task[] = state.tasks


  return (
    <div className='container'>
      {categories.map(category =>
        <Category name={category} key={category}>
          {tasks.filter(task => task.category === category).map(task =>
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
