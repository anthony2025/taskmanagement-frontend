import type { FC } from 'react'
import { useState } from 'react'
import { keys } from 'ramda'

import Category from './Category'
import Task from './Task'

export type Categories = 'inbox' | 'work' | 'study'
export type ContainerState = Record<Categories, string[]>

const initialState: ContainerState = {
  inbox: [
    "Take out the garbage",
    "Read a book",
    "Cook lunch",
    "Find a date",
    "Finish report",
  ],
  work: [],
  study: [],
}

export type MoveTask = (
    taskName: string,
    category: keyof ContainerState,
    destination: keyof ContainerState
  ) => void

const Container: FC = () => {
  const [state, setState] = useState<ContainerState>(initialState)

  const moveTask: MoveTask = (taskName, origin, destination) => {
    setState(function(previousState: ContainerState): ContainerState {
      const newState = {
        ...previousState,
        [origin]: previousState[origin].filter(task => task !== taskName),
        [destination]: previousState[destination].concat(taskName)
      }
      return newState
    })
  }


  return (
    <div className='container'>
      {keys(state).map(category =>
        <Category name={category} key={category}>
          {state[category].map(task =>
            <Task
              name={task}
              category={category}
              moveTask={moveTask}
              key={task}
              data-testid='task'
            />
          )}
        </Category>
      )}
    </div>
  )
}

export default Container
