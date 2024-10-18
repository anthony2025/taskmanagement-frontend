import type { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import { toUpper } from 'ramda'

export type CategoryProps = {
  name: string,
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
      {isActive ? 'Release to drop' : toUpper(name)}
      <div className='taskList'>
        {children}
      </div>
    </div>
  )
}

export default Category
