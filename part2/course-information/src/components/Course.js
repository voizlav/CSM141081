const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) =>
  <p><b>Total of {sum.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  parts.map(part => <Part key={part.id} part={part} />)

const Course = ({courses}) => 
  courses.map(course => 
    <div key={course.id} >
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts} />
    </div>
  )

export default Course