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


const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header data={course} />
      <Content 
      part1={part1} exercises1={exercises1} 
      part2={part2} exercises2={exercises2} 
      part3={part3} exercises3={exercises3} 
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App