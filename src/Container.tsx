import type { FC } from 'react'
import { useState } from 'react'

import Category from './Category'
import { TaskComponent } from './Task'

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
      console.log('taskId', taskId)
      console.log('origin', origin)
      console.log('destination', destination)
      //const newState = {
       // ...previousState,
        //[origin]: previousState[origin].filter(task => task !== taskName),
        //[destination]: previousState[destination].concat(taskName)
      //}
      return previousState
    })
  }

  const categories = ['inbox', 'work', 'study']
  const tasks: Task[] = state.tasks


  return (
    <div className='container'>
      {categories.map(category =>
        <Category name={category} key={category}>
          {tasks.map(task =>
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
