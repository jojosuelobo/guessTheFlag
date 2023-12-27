// Styles
import './End.sass'

// Router dom
import { useLocation, useNavigate } from 'react-router-dom';

// Radix 
import { Button } from '@radix-ui/themes'

type Props = {
  user: string,
  points: number
}

export default function End({ }: Props) {
  const { state: { username } } = useLocation();
  const { state: { points } } = useLocation();

  const navigate = useNavigate()

  return (
    <div className='endContent'>
      <div className='endText'>
        <h2>{username}</h2>
        <h1>Você acertou</h1>
        <h1>{points} países!</h1>
      </div>
      <div className='endButtons'>
        <Button
          size="4"
          radius="full"
          className='EndButton'
          onClick={() => navigate('/')}
        > Menu Principal
        </Button>
        <Button
          size="4"
          radius="full"
          className='EndButton'
          onClick={() => navigate('/play', { state: { username } })}
        > Jogar Novamente
        </Button>
      </div>
    </div>
  )
}