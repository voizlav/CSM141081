import { useState } from 'react'


const Button = ({trigger, label}) => <button onClick={trigger}>{label}</button>

const Display = ({data}) => <p>{data}</p>

const Header = ({heading}) => <h2>{heading}</h2>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Object.assign({}, ...anecdotes.map((_, i) => ({ [i]: 0 }))))

  return (
    <>
      <Header heading={'Anecdote of the day'} />
      <Display data={anecdotes[selected]} />
      <Display data={`has ${points[selected]} points`} />
      <Button label={'vote'} trigger={() => setPoints({...points, [selected]: points[selected] + 1 })} />
      <Button label={'next anecdote'} trigger={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
      <Header heading={'Anecdote with most votes'} />
      <Display data={anecdotes[Object.keys(points)[Object.values(points).indexOf(Math.max(...Object.values(points)))]]} />
      <Display data={`has ${Math.max(...Object.values(points))} points`} />
    </>
  )
}

export default App