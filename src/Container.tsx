import type { FC } from 'react'
import { memo } from 'react'

import Task from './Task'
import Category from './Category'

const Container: FC = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Category name="Inbox" />
        <Category name="Work" />
        <Category name="Study" />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Task name="Take out the garbage" />
        <Task name="Read a book" />
        <Task name="Cook lunch" />
        <Task name="Find a date" />
        <Task name="Finish report" />
      </div>
    </div>
  )
})

export default Container
