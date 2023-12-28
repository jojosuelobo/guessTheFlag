// Styles
import './End.sass'

// Router dom
import { useLocation, useNavigate } from 'react-router-dom';

// Radix 
import { Button } from '@radix-ui/themes'

// Axios
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const { state: { username } } = useLocation();
  const { state: { points } } = useLocation();
  const id = (Math.floor((Math.random()*100))).toString()

  const [newUser, setNewUser] = useState<User>({
    id: id,
    username: username,
    points: points,
  });

  const navigate = useNavigate()

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        await axios.post('http://localhost:3000/ranking', newUser);
        console.log('Usuário criado com sucesso!');
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    };

    sendPostRequest();
  }, []);

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