import type { FC } from 'react'
import { useDrag } from 'react-dnd'

import type { MoveTask, ContainerState } from './Container'

export type TaskProps = {
  name: string,
  category: keyof ContainerState,
  moveTask: MoveTask,
}

type DropResult = {
  name: keyof ContainerState
}

const Task: FC<TaskProps> = function Task({ name, category, moveTask }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        const task = item.name
        const origin = category
        const destination = dropResult.name
        console.log(`You dropped ${task} into ${destination}!`)
        moveTask(name, origin, destination)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <div ref={drag} className='task' style={{ opacity }} data-testid={`box`}>
      {name}
    </div>
  )
}

export default Task
