
const Total = ({course}) => {
  const total = course.parts.reduce((accumulatedValue, accumulator) => accumulatedValue + accumulator.exercises, 0)
  return (
    <p><b>total of exercises {total}</b></p>
  )
}

export default Total
