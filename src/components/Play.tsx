// Router dom
import { useLocation } from 'react-router-dom';

type Props = {
  user: string
}

export default function Play({}: Props) {
  const { state: { username } } = useLocation();

  return (
    <div>
      <h1>play</h1>
      <h1>{username}</h1>
    </div>
  )
}