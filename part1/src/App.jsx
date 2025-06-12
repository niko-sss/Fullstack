
const Part = ({props}) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Header = ({props}) => {
  return (
    <h1>{props}</h1>
  )
}

const Content = ({contents}) => {
  const part1 = {
    part: contents.part1,
    exercise: contents.exercises1
  }
  const part2 = {
    part: contents.part2,
    exercise: contents.exercises2
  }
  const part3 = {
    part: contents.part3,
    exercise: contents.exercises3
  }
  return (
    <>
    <Part props={part1} />
    <Part props={part2} />
    <Part props={part3} />
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