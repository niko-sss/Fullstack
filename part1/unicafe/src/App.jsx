import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const NoFeedback = ({text, value}) => {
  if (value === 0) {
    return (
      <p>{text}</p>
    )
  }
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, variable, total}) => {
  if (total > 0) {
    return (
      <>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{variable}</td>
        </tr>
      </tbody>
      </>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)
  const [avgClicks, setAvgClicks] = useState(0)
  const [positiveness, setPositiveness] = useState(0)
  const head1 = 'give feedback'
  const head2 = 'statistics'
  const nofeedback = 'No feedback given'
  const handleClickGood = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    setGood(updatedGood)
    setAllClicks(updatedGood + neutral + bad)
    setAvgClicks((updatedGood - bad) / updatedTotal)
    setPositiveness(updatedGood / updatedTotal * 100)
  }

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + updatedNeutral + bad
    setNeutral(updatedNeutral)
    setAllClicks(good + updatedNeutral + bad)
    setAvgClicks((good - bad) / updatedTotal)
    setPositiveness(good / updatedTotal * 100)
  }

  const handleClickBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + neutral + updatedBad
    setBad(updatedBad)
    setAllClicks(good + neutral + updatedBad)
    setAvgClicks((good - updatedBad) / updatedTotal)
    setPositiveness(good / updatedTotal * 100)
  }

  const props = {
    good: {
      text: 'good',
      variable: good
    },
    neutral: {
      text: 'neutral',
      variable: neutral
    },
    bad: {
      text: 'bad',
      variable: bad
    },
    allClicks: {
      text: 'all',
      variable: allClicks
    },
    avgClicks: {
      text: 'average',
      variable: avgClicks
    },
    positiveness: {
      text: 'positive',
      variable: positiveness
    },
    totalClicks: allClicks
  }

  return (
    <>
    <Header text={head1}/>
    <div>
      <Button onClick={handleClickGood} text={'good'}/>
      <Button onClick={handleClickNeutral} text={'neutral'}/>
      <Button onClick={handleClickBad} text={'bad'}/>
    </div>
    <Header text={head2}/>
    <div>
      <NoFeedback text={nofeedback} value={allClicks}/>
      <table>
        <StatisticLine text={props.good.text} variable={props.good.variable} total={allClicks}/>
        <StatisticLine text={props.neutral.text} variable={props.neutral.variable} total={allClicks}/>
        <StatisticLine text={props.bad.text} variable={props.bad.variable} total={allClicks}/>
        <StatisticLine text={props.allClicks.text} variable={props.allClicks.variable} total={allClicks}/>
        <StatisticLine text={props.avgClicks.text} variable={props.avgClicks.variable} total={allClicks}/>
        <StatisticLine text={props.positiveness.text} variable={props.positiveness.variable + ' %'} total={allClicks}/>
      </table>
    </div>
    </>
  )
}

export default App
