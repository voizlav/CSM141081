import { useState } from 'react'


const Header = ({heading}) => <h1>{heading}</h1>

const Button = ({trigger, feedback}) => <button onClick={trigger}>{feedback}</button>

const StatisticLine = ({feedback, data}) => <p>{feedback} {data}</p>

const Statistics = ({feedback: {good, neutral, bad}}) => 
  good + neutral + bad === 0 ? <p>No feedback given</p> : (
    <>
      <StatisticLine feedback={'good'} data={good}/>
      <StatisticLine feedback={'neutral'} data={neutral}/>
      <StatisticLine feedback={'bad'} data={bad}/>
      <StatisticLine feedback={'all'} data={good + neutral + bad} />
      <StatisticLine feedback={'average'} data={(good - bad) / (good + neutral + bad)} />
      <StatisticLine feedback={'positive'} data={`${(good) / (good + neutral + bad) * 100}%`} />
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
      <Statistics feedback={{'good': good, 'neutral': neutral, 'bad': bad}} />
    </>
  )
}

export default App