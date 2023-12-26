// Styles
import './Play.sass'
import IMAGE from '../../images/background.png'

// Router dom
import { useLocation } from 'react-router-dom';

// Radix 
import { Button, TextField } from '@radix-ui/themes'

// React
import { useState } from 'react'

// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  user: string
}

export default function Play({ }: Props) {
  const { state: { username } } = useLocation();
  const [anwser, setAnwser] = useState<string>('')
  const [hint, setHint] = useState<boolean>(false)
  const [life, setLife] = useState<number>(3)

  return (
    <div className='play'>
      <div className='lifeAndFlag'>
        <div className='lifes'>
          <FaHeart className='icon' />
          <FaHeart className='icon' />
          <FaHeart className='icon' />
        </div>
        <img src={IMAGE} />
      </div>
      <div className='playForm'>
        <TextField.Input
          className='formInput'
          size="3"
          placeholder="País"
          required
          disabled={hint}
          onChange={(e) => setAnwser(e.target.value)} />
        {hint ? (
          <div className='formsHint'>
            <div className='option'>
              <Button
                size="4"
                radius="full"
                className='Playbtn submitButton'
              > DICA 1
              </Button>
              <Button
                size="4"
                radius="full"
                className='Playbtn submitButton'
              > DICA 2
              </Button>
            </div>
            <div className='option'>
              <Button
                size="4"
                radius="full"
                className='Playbtn submitButton'
              > DICA 3
              </Button>
              <Button
                size="4"
                radius="full"
                className='Playbtn submitButton'
              > DICA 4
              </Button>
            </div>
          </div>
        ) : (
          <div className='formsButtons'>
            <Button
              size="4"
              radius="full"
              className='Playbtn submitButton'
            > Enviar
            </Button>
            <Button
              size="4"
              radius="full"
              className='Playbtn hintButton'
              onClick={() => setHint(true)}
            > Dica
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}