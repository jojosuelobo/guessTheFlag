// Styles
import './Play.sass'

// Router dom
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [points, setPoints] = useState<number>(0)

  const [randomCountry, setRandomCountry] = useState(() => sampleSize(countries, 1)[0]);
  const [hints, setHints] = useState<any[]>([]);

  const [class0, setClass0] = useState<string>('')
  const [class1, setClass1] = useState<string>('')
  const [class2, setClass2] = useState<string>('')
  const [class3, setClass3] = useState<string>('')
  const [disabledStatus, setDisabledStatus] = useState<boolean>(false)

  const timeoutInSeconds = 1.5

  const navigate = useNavigate()

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

  const giveAnwserCountry = () => {
    if (randomCountry.nome_pais === hints[0]?.nome_pais) {
      setClass0('success')
      setClass1('error')
      setClass2('error')
      setClass3('error')
    }
    if (randomCountry.nome_pais === hints[1]?.nome_pais) {
      setClass0('error')
      setClass1('success')
      setClass2('error')
      setClass3('error')
    }
    if (randomCountry.nome_pais === hints[2]?.nome_pais) {
      setClass0('error')
      setClass1('error')
      setClass2('success')
      setClass3('error')
    }
    if (randomCountry.nome_pais === hints[3]?.nome_pais) {
      setClass0('error')
      setClass1('error')
      setClass2('error')
      setClass3('success')
    }
    setDisabledStatus(true)
  }

  const handleSubmitHint = (guess: string) => {
    if (guess === randomCountry.nome_pais) {
      setPoints(points + 1)
      giveAnwserCountry()
      setTimeout(() => {
        getRandomCountry()
        setDisabledStatus(false)
        setHintIsActive(false)
        setClass0('')
        setClass1('')
        setClass2('')
        setClass3('')
      }, (1000*timeoutInSeconds));
    } else {
      setLife(life - 1)
      giveAnwserCountry()
      setTimeout(() => {
        getRandomCountry()
        setDisabledStatus(false)
        setHintIsActive(false)
        setClass0('')
        setClass1('')
        setClass2('')
        setClass3('')
      }, (1000*timeoutInSeconds));
    }
  }

  const writingAnwser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnwser(e.target.value)
    if ((e.target.value).toLocaleLowerCase() === (randomCountry.nome_pais).toLocaleLowerCase()) {
      setPoints(points + 1)
      setAnwser('')
      getRandomCountry()
    }
  }

  const activeHint = () => {
    setHintIsActive(true)
    setAnwser('')
  }

  useEffect(() => {
    if (life === 0) {
      navigate('/end', { state: { username, points } })
    }
  }, [life])

  randomCountry?.nome_pais && console.log(`RESPOSTA: ${randomCountry.nome_pais}`)
  hints[0]?.nome_pais && console.log(`DICAS: ${hints[0]?.nome_pais} | ${hints[1]?.nome_pais} | ${hints[2]?.nome_pais} | ${hints[3]?.nome_pais}`)

  return (
    <div className='play'>
      <h1>Pontuação: {points}</h1  >
      <div className='lifeAndFlag'>
        <div className='lifes'>
          {life === 3 && (
            <div>
              <FaHeart className='icon' />
              <FaHeart className='icon' />
              <FaHeart className='icon' />
            </div>
          )}
          {life === 2 && (
            <div>
              <FaRegHeart className='icon' />
              <FaHeart className='icon' />
              <FaHeart className='icon' />
            </div>
          )}
          {life === 1 && (
            <div>
              <FaRegHeart className='icon' />
              <FaRegHeart className='icon' />
              <FaHeart className='icon' />
            </div>
          )}

        </div>
        <div className='img'>
          {/* <img src={`https://flagsapi.com/${randomCountry.sigla}/flat/64.png`} /> */}
          <img src={`https://flagcdn.com/${(randomCountry.sigla).toLocaleLowerCase()}.svg`} alt={`${randomCountry.nome_pais}`}></img>
        </div>
      </div>
      <div className='playForm'>
        <TextField.Input
          className='formInput'
          size="3"
          placeholder="País"
          required
          disabled={hintIsActive}
          value={anwser}
          onChange={(e) => writingAnwser(e)} />
        {hintIsActive ? (
          <div className='formsHint'>
            <div className='option'>
              <Button
                size="4"
                radius="full"
                className={`btn ${class0}`}
                disabled={disabledStatus}
                onClick={() => handleSubmitHint(hints[0]?.nome_pais)}
              > {hints[0]?.nome_pais}
              </Button>
              <Button
                size="4"
                radius="full"
                className={`btn ${class1}`}
                disabled={disabledStatus}
                onClick={() => handleSubmitHint(hints[1]?.nome_pais)}
              > {hints[1]?.nome_pais}
              </Button>
            </div>
            <div className='option'>
              <Button
                size="4"
                radius="full"
                className={`btn ${class2}`}
                disabled={disabledStatus}
                onClick={() => handleSubmitHint(hints[2]?.nome_pais)}
              > {hints[2]?.nome_pais}
              </Button>
              <Button
                size="4"
                radius="full"
                className={`btn ${class3}`}
                disabled={disabledStatus}
                onClick={() => handleSubmitHint(hints[3]?.nome_pais)}
              > {hints[3]?.nome_pais}
              </Button>
            </div>
          </div>
        ) : (
          <div className='formsButtons'>
            {/* <Button
              size="4"
              radius="full"
              className='Playbtn submitButton'
            > TESTE
            </Button> */}
            <Button
              size="4"
              radius="full"
              className='btn'
              onClick={() => activeHint()}
            > Dica
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}