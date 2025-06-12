

const Header = ({props}) => {
  return (
    <h1>{props}</h1>
  )
}

const Content = ({contents}) => {
  return (
    <>
    <p>
      {contents.part1} {contents.exercises1}
    </p>
    <p>
      {contents.part2} {contents.exercises2}
    </p>
    <p>
      {contents.part3} {contents.exercises3}
    </p>
    </>
  )
}

const Total = ({contents}) => {
  return (
    <p>Number of exercises {contents.exercises1 + contents.exercises2 + contents.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const contents = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header props={course} />
      <Content contents={contents} />
      <Total contents={contents}/>
    </div>
  )
}

export default App