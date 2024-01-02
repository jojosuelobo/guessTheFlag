// Styles
import './Play.sass'

// Router dom
import { useNavigate } from 'react-router-dom';

// Radix 
import { Button, TextField } from '@radix-ui/themes'

// React
import { useState, useEffect, useContext } from 'react'

// Icons
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

// Sample
import { sampleSize } from 'lodash';

// Países
import countries from '../../contries/countries.json'

// Context
import { GameContext } from '../../context/context'

// Axios
import axios from 'axios';

interface Props {
  user: string
}

interface Country {
  gentilico: string,
  nome_pais: string,
  nome_pais_int: string,
  sigla: string
}

export default function Play({ }: Props) {
  const { username, points, setPoints } = useContext(GameContext)

  useEffect(() => {
    if (username === '') {
      navigate('/')
    }
  }, [])

  const [anwser, setAnwser] = useState<string>('')
  const [hintIsActive, setHintIsActive] = useState<boolean>(false)
  const [life, setLife] = useState<number>(3)

  const [randomCountry, setRandomCountry] = useState<null | Country>(null);
  const [hints, setHints] = useState<any[]>([]);

  const [class0, setClass0] = useState<string>('')
  const [class1, setClass1] = useState<string>('')
  const [class2, setClass2] = useState<string>('')
  const [class3, setClass3] = useState<string>('')
  const [disabledStatus, setDisabledStatus] = useState<boolean>(false)

  const [usedCountries, setUsedCountries] = useState<any[]>([]);
  const [win, setWin] = useState<boolean>(false)

  const timeoutInSeconds = 1.5

  const navigate = useNavigate()

  const fetchFlag = async (sigla: string) => {
    try {
      const response = await axios.get(`https://flagcdn.com/${sigla.toLowerCase()}.svg`);
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const getRandomCountry = async () => {
    const remainingCountries = countries.filter(country => !usedCountries.some(usedCountry => usedCountry.sigla === country.sigla));

    if (remainingCountries.length === 0) {
      // Todos os países já foram utilizados, faça o que for necessário nesse caso
      setWin(true)
      return;
    }

    const newRandomCountry = sampleSize(remainingCountries, 1)[0];

    // Verifica se a bandeira do novo país está disponível
    const isFlagAvailable = await fetchFlag(newRandomCountry.sigla);

    if (isFlagAvailable) {
      setRandomCountry(newRandomCountry);
      setUsedCountries(prevUsedCountries => [...prevUsedCountries, newRandomCountry]);
    } else {
      // Se a bandeira não estiver disponível, tenta novamente
      getRandomCountry();
    }
  };

  const generateHints = () => {
    // Adiciona randomCountry aos hints
    const newHints = [randomCountry];

    // Adiciona mais três países aleatórios aos hints
    const additionalCountries = sampleSize(countries.filter(country => country !== randomCountry), 3);
    newHints.push(...additionalCountries);

    // Embaralha a ordem dos hints
    setHints(sampleSize(newHints, newHints.length));

    randomCountry?.nome_pais && console.log(`RESPOSTA: ${randomCountry.nome_pais}`)
    hints[0]?.nome_pais && console.log(`DICAS: ${hints[0]?.nome_pais} | ${hints[1]?.nome_pais} | ${hints[2]?.nome_pais} | ${hints[3]?.nome_pais}`)
  };

  useEffect(() => {
    getRandomCountry();
  }, []);

  useEffect(() => {
    generateHints();
  }, [randomCountry]);

  const giveAnwserCountry = () => {
    if (randomCountry) {
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
  }

  const handleSubmitHint = (guess: string) => {
    if (randomCountry) {
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
        }, (1000 * timeoutInSeconds));
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
        }, (1000 * timeoutInSeconds));
      }
    }
  }

  const writingAnwser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnwser(e.target.value)
    if (randomCountry) {
      if ((e.target.value).toLocaleLowerCase() === (randomCountry.nome_pais).toLocaleLowerCase()) {
        setPoints(points + 1)
        setAnwser('')
        getRandomCountry()
      }
    }
  }

  const activeHint = () => {
    setHintIsActive(true)
    setAnwser('')
  }

  useEffect(() => {
    if (life === 0) {
      giveAnwserCountry()
      setTimeout(() => {
        navigate('/end')
      }, (1000 * timeoutInSeconds));
    }
  }, [life])

  useEffect(() => {
    if (win) {
      giveAnwserCountry()
      setTimeout(() => {
        navigate('/end')
      }, (1000 * timeoutInSeconds));
    }
  }, [win])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const confirmationMessage = 'Tem certeza que deseja sair?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [])

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
          {randomCountry ? <img src={`https://flagcdn.com/${(randomCountry.sigla).toLocaleLowerCase()}.svg`} alt={`${randomCountry.nome_pais}`}></img> : <AiOutlineLoading className='loading' />}
          {/* <AiOutlineLoading className='loading' /> */}
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