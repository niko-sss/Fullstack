
import Header from "./header"
import Content from "./content"
import Total from "./total"

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total course={course} />
    </div>
  )
}

export default Course
