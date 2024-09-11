import type { FC } from 'react'
import { useDrop } from 'react-dnd'

import type { MoveTask, ContainerState } from './Container'
import Task from './Task'

export type CategoryProps = {
  name: keyof ContainerState,
  tasks: string[],
  moveTask: MoveTask
}

const Category: FC<CategoryProps> = function Category({ name, tasks, moveTask }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = isActive ? 'darkgreen' : 'darkkhaki'

  return (
    <div
      ref={drop}
      className='category'
      style={{ backgroundColor }}
      data-testid={`category`}
    >
      {isActive ? 'Release to drop' : name}
      {tasks.map(task =>
        <Task name={task} category={name} moveTask={moveTask} key={task} />
      )}
    </div>
  )
}

export default Category
