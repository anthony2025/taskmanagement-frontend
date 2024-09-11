import type { FC } from 'react'
import { useState } from 'react'
import { keys } from 'ramda'

import Category from './Category'

export type ContainerState = {
  inbox: string[],
  work: string[],
  study: string[],
}

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

export type MoveTask = (taskName: string, category: keyof ContainerState, destination: keyof ContainerState) => void

const Container: FC = function Container() {
  const [state, setState] = useState<ContainerState>(initialState)

  const moveTask: MoveTask = (taskName, origin, destination) => {
    setState(function(previousState: ContainerState): ContainerState {
      console.log('previousState', previousState)
      const newState = {
        ...previousState,
        [origin]: previousState[origin].filter(task => task !== taskName),
        [destination]: previousState[destination].concat(taskName)
      }
      console.log('newState', newState)
      return newState
    })
  }


  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {keys(state).map(category =>
          <Category
            name={category}
            key={category}
            tasks={state[category]}
            moveTask={moveTask}
          />
        )}
      </div>
    </div>
  )
}

export default Container
