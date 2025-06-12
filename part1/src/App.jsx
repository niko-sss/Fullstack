
const Part = ({props}) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Header = ({props}) => {
  return (
    <h1>{props}</h1>
  )
}

const Content = ({props}) => {
  return (
    <>
    <Part props={props[0]} />
    <Part props={props[1]} />
    <Part props={props[2]} />
    </>
  )
}

const Total = ({props}) => {
  return (
    <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header props={course.name} />
      <Content props={course.parts} />
      <Total props={course.parts}/>
    </div>
  )
}

export default App