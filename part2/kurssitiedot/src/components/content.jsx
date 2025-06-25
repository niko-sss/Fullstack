
import Part from "./part"

const Content = ({parts}) => {
  const result = parts.map(part => {
    return <li key={part.id}>{part.name} {part.exercises}</li>
  })
  return <Part partContent={result} />
}

export default Content
