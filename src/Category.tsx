import type { FC } from 'react'
import { useDrop } from 'react-dnd'

export type CategoryProps = {
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
  let backgroundColor = isActive ? 'darkgreen' : 'darkkhaki'

  return (
    <div ref={drop} className='category' style={{ backgroundColor }} data-testid={`category`}>
      {isActive ? 'Release to drop' : name}
    </div>
  )
}

export default Category
