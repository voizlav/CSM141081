const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) =>
  <p><b>Total of {sum.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  parts.map(part => <Part key={part.id} part={part} />)

const Course = ({course}) => 
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <Course course={courses} />
    <Total sum={courses.parts} />
    </>
  )
}

export default App