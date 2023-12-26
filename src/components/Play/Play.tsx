// Styles
import './Play.sass'
import IMAGE from '../../images/background.png'

// Router dom
import { useLocation } from 'react-router-dom';

// Radix 
import { Button, TextField } from '@radix-ui/themes'

// React
import { useState, useEffect } from 'react'

// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Sample
import { sampleSize } from 'lodash';

import countries from '../../contries/countries.json'

interface Props {
  user: string
}

export default function Play({ }: Props) {
  const { state: { username } } = useLocation();
  const [anwser, setAnwser] = useState<string>('')
  const [hintIsActive, setHintIsActive] = useState<boolean>(false)
  const [life, setLife] = useState<number>(3)

  const [randomCountry, setRandomCountry] = useState(() => sampleSize(countries, 1)[0]);
  const [hints, setHints] = useState<any[]>([]);

  const getRandomCountry = () => {
    const newRandomCountry = sampleSize(countries, 1)[0];
    setRandomCountry(newRandomCountry);
  };

  useEffect(() => {
    generateHints();
  }, [randomCountry]);

  const generateHints = () => {
    // Adiciona randomCountry aos hints
    const newHints = [randomCountry];

    // Adiciona mais três países aleatórios aos hints
    const additionalCountries = sampleSize(countries.filter(country => country !== randomCountry), 3);
    newHints.push(...additionalCountries);

    // Embaralha a ordem dos hints
    setHints(sampleSize(newHints, newHints.length));
  };

  console.log(randomCountry)
  console.log(hints)

  return (
    <div className='play'>
      <div className='lifeAndFlag'>
        <div className='lifes'>
          <FaHeart className='icon' />
          <FaHeart className='icon' />
          <FaHeart className='icon' />
        </div>
        <div className='img'>
          <img src={IMAGE} />
        </div>
      </div>
      <div className='playForm'>
        <TextField.Input
          className='formInput'
          size="3"
          placeholder="País"
          required
          disabled={hintIsActive}
          onChange={(e) => setAnwser(e.target.value)} />
        {hintIsActive ? (
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
              onClick={() => setHintIsActive(true)}
            > Dica
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}