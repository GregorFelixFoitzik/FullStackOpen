import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text} </h1>
    </div>
  )
}

const Button = (props) => {
  const {handleClick, text} = props
  return  (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  const sumValues = props.goodValue + props.neutralValue + props.badValue
  const meanValue = (props.goodValue - props.badValue) / sumValues
  const percPositive = (props.goodValue / sumValues) * 100 

  const sumFeedback = () => {
    return (
      <div>
        all {sumValues}
      </div>
    )
  }
  const averageFeedback = () => {
    return (
      <div>
        average {meanValue}
      </div>
    )
  }
  const positiveFeedback = () => {
    return (
      <div>
        positive {percPositive}%
      </div>
    )
  }

  
  return (
    <div>
      <StatisticsLine text="good" value={props.goodValue} />
      <StatisticsLine text="neutral" value={props.neutralValue} />
      <StatisticsLine text="bad" value={props.badValue} />
      {sumFeedback()}
      {averageFeedback()}
      {positiveFeedback()}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"} />
    
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />

      <Header text={"statistics"} />
      <Statistics 
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
      />
    </div>
  )
}

export default App