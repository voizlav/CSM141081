const Header = (props) => {
  return (
    <h1>{props.data}</h1>
  )
}


const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </div>
  )
}


const Total = ({parts}) => {
  const [part1, part2, part3] = parts
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]
  
  return (
    <div>
      <Total parts={parts} />
    </div>
  )
}

export default App