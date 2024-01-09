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

  const { username, points, setPoints, portuguese } = useContext(GameContext)
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
        saveToLocalStorage(newUser);
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

  const saveToLocalStorage = (user: User) => {
    // Get existing ranking data from localStorage
    const existingRanking = JSON.parse(localStorage.getItem('ranking') || '[]');

    // Add the new user to the ranking
    const updatedRanking = [...existingRanking, user];

    // Save the updated ranking back to localStorage
    localStorage.setItem('ranking', JSON.stringify(updatedRanking));
  };

  return (
    <div className='endContent'>
      <div className='endText'>
        <h2>{username}</h2>
        <h1> {portuguese ? 'Você acertou' : 'You got'} </h1>
        <h1>{points} {portuguese ? 'países' : 'flags'}!</h1>
      </div>
      <div className='endButtons'>
        <Button
          size="4"
          radius="full"
          className='EndButton'
          onClick={() => navigate('/')}
        > {portuguese ? 'Menu Principal' : 'Home Page'}
        </Button>
        <Button
          size="4"
          radius="full"
          className='EndButton'
          onClick={() => playAgain()}
        > {portuguese ? 'Jogar Novamente' : 'Play Again'}
        </Button>
      </div>
    </div>
  )
}