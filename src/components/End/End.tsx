// Styles
import './End.sass'

// Router dom
import { useLocation } from 'react-router-dom';

type Props = {
  user: string
}

export default function End({}: Props) {
  const { state: { username } } = useLocation();

  return (
    <h1>End {username}</h1>
  )
}