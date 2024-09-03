import type { FC } from 'react'
import { useDrop } from 'react-dnd'

export interface CategoryProps {
  name: string
}

const Category: FC<CategoryProps> = function Category({ name }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} className="category" style={{ backgroundColor }}>
      {isActive ? 'Release to drop' : name}
    </div>
  )
}

export default Category
