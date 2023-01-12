import { useState } from 'react'


const Header = ({heading}) => <h1>{heading}</h1>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header heading={'Give feedback'} />
      <Header heading={'statistics'} />
    </div>
  )
}

export default App