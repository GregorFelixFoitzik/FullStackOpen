const Course = ({course}) => {
  
    const Header = ({course}) => <h2>{course}</h2>
    const Content = (course) => {
      const { parts } = course.parts
      return (
        <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        </>
      )
    }
    const Part = ({part}) => <p>{part.name} {part.exercises}</p>
    const Total = ({sum}) => <b>Number of exercises {sum}</b>
  
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course} />
        <Total  sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
      </div>
    )
  }

  export default Course