import type { FC } from 'react'
import { useDrag } from 'react-dnd'

import type { MoveTask } from './Container'

export type TaskComponentProps = {
  id: string,
  description: string,
  category: string,
  moveTask: MoveTask,
}

type DropResult = {
  name: string,
}

export const TaskComponent: FC<TaskComponentProps> = ({ id, description, category, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        const taskId = item.id
        const origin = category
        const destination = dropResult.name
        moveTask(taskId, origin, destination)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <div
      ref={drag}
      className='task'
      style={{ opacity }}
      data-testid='box'
    >
      {description}
    </div>
  )
}

