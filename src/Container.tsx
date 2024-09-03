import type { FC } from 'react'
import { memo } from 'react'

import { Task } from './Task'
import { Category } from './Category'

export const Container: FC = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Category />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Task name="Glass" />
        <Task name="Banana" />
        <Task name="Paper" />
      </div>
    </div>
  )
})

export default Container
