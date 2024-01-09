// Styles
import './Home.sass'

// Images
import logo from '../../images/worldFlag.png'

// React
import { useState, useContext } from 'react'

// Radix UI
import { Button, TextField } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'

// Context
import { GameContext } from '../../context/context'

export default function Home() {
    const { username, setUsername, portuguese, setPortuguese } = useContext(GameContext)

    const [selectNicknameScreen, setSelectNicknameScreen] = useState<boolean>(false)

    const navigate = useNavigate()

    return (
        <div className='home'>
            {
                !selectNicknameScreen && (
                    <div className='language'>
                    <img
                        className={portuguese ? 'languageBtn active' : 'languageBtn'}
                        onClick={() => setPortuguese(true)}
                        src="https://hatscripts.github.io/circle-flags/flags/br.svg"
                        alt='portuguese'
                    ></img>
                    <img
                        className={portuguese ? 'languageBtn' : 'languageBtn active'}
                        onClick={() => setPortuguese(false)}
                        src="https://hatscripts.github.io/circle-flags/flags/us.svg"
                        alt='english'
                    ></img>
                </div>
                )
            }

            <img className='logo' src={logo} alt="game logo" />
            <div>
                {
                    selectNicknameScreen ? (
                        <div className='homeOptions'>
                            <TextField.Input
                                name='usernameInput'
                                id='usernameInput'
                                size="3"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)} />
                            {
                                username ? (
                                    <Button
                                        name='start'
                                        id='start'
                                        size="4"
                                        radius="full"
                                        className='btn'
                                        onClick={() => navigate('/play')}
                                    > COMEÇAR
                                    </Button>
                                ) : (
                                    <Button
                                        name='start'
                                        id='start'
                                        size="4"
                                        radius="full"
                                        disabled
                                    > COMEÇAR
                                    </Button>
                                )
                            }
                            <Button
                                name='back'
                                id='back'
                                size="4"
                                radius="full"
                                className='btn'
                                onClick={() => setSelectNicknameScreen(false)}
                            >
                                VOLTAR
                            </Button>
                        </div>
                    ) : (
                        <div className='homeOptions'>
                            <Button id='jogar' name='jogar' size="4" radius="full" className='btn' onClick={() => setSelectNicknameScreen(true)}>JOGAR</Button>
                            <Button id='ranking' name='ranking' size="4" radius="full" className='btn' onClick={() => navigate('/ranking')}>RANKING</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}