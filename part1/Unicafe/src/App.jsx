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
    <td>
      {!isNaN(props.value) && (
        <>
          {props.text} {props.value} {props.sign}
        </>
      )}
    </td>
  )
}

const Statistics = (props) => {
  const sumValues = props.goodValue + props.neutralValue + props.badValue
  const meanValue = (props.goodValue - props.badValue) / sumValues
  const percPositive = (props.goodValue / sumValues) * 100 
  
  if (props.goodValue === 0 && props.neutralValue === 0 && props.badValue === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <tr><StatisticsLine text="good" value={props.goodValue} /></tr>
        <tr><StatisticsLine text="neutral" value={props.neutralValue} /></tr>
        <tr><StatisticsLine text="bad" value={props.badValue} /></tr>
        <tr><StatisticsLine text="all" value={sumValues} /></tr>
        <tr><StatisticsLine text="average" value={meanValue} /></tr>
        <tr><StatisticsLine text="positive" value={percPositive} sign="%"/></tr>
      </tbody>
    </table>
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