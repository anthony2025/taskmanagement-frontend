import { useState } from 'react'
import type { FC } from 'react'
import Task from './Task'
import Category from './Category'

export type ContainerState = {
  inbox: Array<string>,
  work: Array<string>,
  study: Array<string>,
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

const Container: FC = function Container() {
  const [state, setState] = useState<ContainerState>(initialState)
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {Object.keys(state).map(category =>
          <Category name={category} />
        )}
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {state.inbox.map(task =>
          <Task name={task} setState={setState} />
        )}
      </div>
    </div>
  )
}

export default Container
