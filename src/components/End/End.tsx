// Styles
import './End.sass'

// Router dom
import { useNavigate } from 'react-router-dom';

// Radix 
import { Button } from '@radix-ui/themes'

// Axios
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

// Context
import { GameContext } from '../../context/context'

type Props = {
  user: string,
  points: number
}

interface User {
  id: string
  username: string;
  points: number;
}


export default function End({ }: Props) {

  const { username, points, setPoints } = useContext(GameContext)
  const id = uuidv4()

  const [newUser] = useState<User>({
    id: id,
    username: username,
    points: points,
  });

  console.log(newUser)

  const navigate = useNavigate()

  const sendPostRequest = async () => {
    if (username === '') {
      navigate('/')
    } else {
      try {
        await axios.post('http://localhost:3000/ranking', newUser);
        console.log('Usuário criado com sucesso!');
        return
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    };
  }
  useEffect(() => {
    sendPostRequest();
  }, [username]);

  const playAgain = () => {
    setPoints(0)
    navigate('/play', { state: { username } })
  }

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
          onClick={() => playAgain()}
        > Jogar Novamente
        </Button>
      </div>
    </div>
  )
}