const Course = ({course}) => {
    
  const Header = ({course}) => <h1>{course}</h1>
  const Total = ({sum}) => <p>Number of exercises {sum}</p>
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  const Content = (course) => {
    const { parts } = course.parts

    return (
      <>
      {parts.map(part => <Part key={part.name} part={part} />)}
      </>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course} />
      <Total  sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

const App = () => {
  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }

  return <Course course={course}/>
}

export default App