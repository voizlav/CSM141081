import { useState } from 'react'


const Header = ({heading}) => <h1>{heading}</h1>

const Stats = ({feedback, data}) => <p>{feedback} {data}</p>

const Button = ({trigger, feedback}) => <button onClick={trigger}>{feedback}</button>


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header heading={'Give feedback'} />
      <Button feedback={'good'} trigger={() => setGood(good + 1)} />
      <Button feedback={'neutral'} trigger={() => setNeutral(neutral + 1)} />
      <Button feedback={'bad'} trigger={() => setBad(bad + 1)} />
      <Header heading={'statistics'} />
      <Stats feedback={'good'} data={good} />
      <Stats feedback={'neutral'} data={neutral} />
      <Stats feedback={'bad'} data={bad} />
      <Stats feedback={'all'} data={good + neutral + bad} />
      <Stats feedback={'average'} data={(good - bad) / (good + neutral + bad)} />
      <Stats feedback={'positive'} data={`${(good) / (good + neutral + bad) * 100}%`} />
    </div>
  )
}

export default App