import type { FC } from 'react'
import { useDrag } from 'react-dnd'

export type TaskProps = {
  name: string,
  setState: Function,
}

type DropResult = {
  name: string
}

const Task: FC<TaskProps> = function Task({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`)
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
