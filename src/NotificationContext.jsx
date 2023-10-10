import { useReducer, useContext, createContext } from "react"

const NotificationContext = createContext()

const notificationReducer = (_state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
    default:
      return ""
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const elements = useContext(NotificationContext)
  return elements[0]
}

export const useNotificationDispatch = () => {
  const elements = useContext(NotificationContext)
  return elements[1]
}

export const notify = (dispatch, payload) => {
  dispatch({ type: "SET", payload })
  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, 5000)
}

export default NotificationContext
