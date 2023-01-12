import { useState } from 'react'


const Header = ({heading}) => <h1>{heading}</h1>

const Button = ({trigger, feedback}) => <button onClick={trigger}>{feedback}</button>

const Stat = ({feedback, data}) => <p>{feedback} {data}</p>

const Stats = ({feedback: {good, neutral, bad}}) => 
  good + neutral + bad === 0 ? <p>No feedback given</p> : (
    <>
      <Stat feedback={'good'} data={good}/>
      <Stat feedback={'neutral'} data={neutral}/>
      <Stat feedback={'bad'} data={bad}/>
      <Stat feedback={'all'} data={good + neutral + bad} />
      <Stat feedback={'average'} data={(good - bad) / (good + neutral + bad)} />
      <Stat feedback={'positive'} data={`${(good) / (good + neutral + bad) * 100}%`} />
    </>
  )


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header heading={'Give feedback'} />
      <Button feedback={'good'} trigger={() => setGood(good + 1)} />
      <Button feedback={'neutral'} trigger={() => setNeutral(neutral + 1)} />
      <Button feedback={'bad'} trigger={() => setBad(bad + 1)} />
      <Header heading={'statistics'} />
      <Stats feedback={{'good': good, 'neutral': neutral, 'bad': bad}} />
    </>
  )
}

export default App