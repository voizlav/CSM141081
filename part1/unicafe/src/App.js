import { useState } from 'react'


const Header = ({heading}) => <h1>{heading}</h1>

const Button = (props) => {
  console.log(props.trigger)
  return (
    <button onClick={props.trigger}>{props.feedback}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(`good: ${good}`)
  console.log(`neutral: ${neutral}`)
  console.log(`bad: ${bad}`)
  return (
    <div>
      <Header heading={'Give feedback'} />
      <Button feedback={'good'} trigger={() => setGood(good + 1)} />
      <Button feedback={'neutral'} trigger={() => setNeutral(neutral + 1)} />
      <Button feedback={'bad'} trigger={() => setBad(bad + 1)} />
      <Header heading={'statistics'} />
    </div>
  )
}

export default App