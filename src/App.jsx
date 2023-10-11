import { useState } from "react"
import { Link, Routes, Route, useMatch, useNavigate } from "react-router-dom"
import { useNotificationValue, useNotificationDispatch, notify } from "./NotificationContext"
import { useField } from "./hooks"

const initialState = [
  {
    content: "If it hurts, do it more often",
    id: 47145,
    votes: 17,
    author: "coala",
    url: "http://google.com",
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: 21149,
    votes: 2,
    author: "coala",
    url: "http://google.com",
  },
  {
    content: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: 69581,
    votes: 1,
    author: "coala",
    url: "http://google.com",
  },
  {
    content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: 36975,
    votes: 0,
    author: "coala",
    url: "http://google.com",
  },
  {
    content: "Premature optimization is the root of all evil.",
    id: 25170,
    votes: 1,
    author: "coala",
    url: "http://google.com",
  },
  {
    content: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    id: 98312,
    votes: 0,
    author: "coala",
    url: "http://google.com",
  },
]

const About = () => {
  return (
    <p>About</p>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {`${anecdote.content} by ${anecdote.author}`}
      </h2>
      <p>
        {`has ${anecdote.votes} votes`}
      </p>
      <p>
        for more info see <a href={anecdote.url}>{anecdote.url}</a>
      </p>
    </div>
  )
}

const Anecdotes = ({ anecdotes }) => {
  return (
    <div>

      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(a => {
          return (
            <li key={a.id}>
              <Link to={`anecdotes/${a.id}`} element={<Anecdote />}>{a.content}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const NewAnecdote = ({ anecdotes, setAnecdotes }) => {
  const content = useField("text")
  const author = useField("text")
  const url = useField("text")

  const generateId = () => {
    return Number((Math.random() * 1000000).toFixed(0))
  }
  const navigate = useNavigate()
  const dispatch = useNotificationDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    const anecdote = {
      id: generateId(),
      content: e.target[0].value,
      author: e.target[1].value,
      url: e.target[2].value,
      votes: 0,
    }
    setAnecdotes(anecdotes.concat(anecdote))
    const payload = `created anecdote ${anecdote.content}`
    notify(dispatch, payload)
    navigate("/")
  }

  const reset = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div>
          content: <input {...content.props} />
        </div>
        <div>
          author: <input {...author.props} />
        </div>
        <div>
          url for more info <input {...url.props} />
        </div>

        <button type="submit">create</button>
        <button type="button" onClick={reset}>reset</button>
      </form>
    </div>
  )
}

const Notification = () => {
  const notification = useNotificationValue()
  if (!notification) {
    return
  }

  const style = {
    border: "solid",
    borderColor: "red",
    borderWidth: 2,
    padding: 5,
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const App = () => {
  // not super happy with the old ways but guess not the focus of the exercise
  const [anecdotes, setAnecdotes] = useState(initialState)

  const match = useMatch("anecdotes/:id")

  const style = {
    paddingRight: 5,
  }

  const getMatchingAnecdote = () => {
    if (!match) {
      return
    }
    const id = match.params.id
    return anecdotes.find(a => a.id === Number(id))
  }

  const anecdote = getMatchingAnecdote()

  return (
    <div>
      <h1>Software anecdotes</h1>

      <div>
        <Link to="/" style={style}>anecdotes</Link>
        <Link to="/create" style={style}>create new</Link>
        <Link to="/about" style={style}>about</Link>
        <Notification />

        <Routes>
          <Route path="/" element={<Anecdotes anecdotes={anecdotes} />}></Route>
          <Route path="/create" element={<NewAnecdote anecdotes={anecdotes} setAnecdotes={setAnecdotes} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />}></Route>
        </Routes>
      </div>

      <footer>
        Anecdote app for Full Stack -sovelluskehitys. See <a href="https://github.com/mluukkai/routed-anecdotes">https://github.com/mluukkai/routed-anecdotes</a> for the source code
      </footer>
    </div>
  )
}

export default App
