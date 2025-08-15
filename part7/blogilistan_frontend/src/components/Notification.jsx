import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    backgroundColor: notification.isError ? 'salmon' : 'lightgreen'
  }

  if (!notification.text) {
    console.log(notification.text)
    
    return null
  }

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification