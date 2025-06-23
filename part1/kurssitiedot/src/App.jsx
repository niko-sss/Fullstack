
const Header = ({name}) => {
  return <h1>{name}</h1>
}

const Part = ({parts}) => {
  return (
    <>
    <p>{parts.name} {parts.exercises}</p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>
    </div>
)
}
const Total = ({total}) => {
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]
}
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  


  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default App