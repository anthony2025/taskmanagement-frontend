import type { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import type { ContainerState } from './Container'

export type CategoryProps = {
  name: keyof ContainerState,
  children: ReactNode,
}

const Category: FC<CategoryProps> = ({ name, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = isActive ? 'maroon': '#004643'

  return (
    <div
      ref={drop}
      className='category'
      style={{ backgroundColor }}
      data-testid='category'
    >
      {isActive ? 'Release to drop' : name}
      {children}
    </div>
  )
}

export default Category
