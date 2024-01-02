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
    const { username, setUsername } = useContext(GameContext)

    const [selectNicknameScreen, setSelectNicknameScreen] = useState<boolean>(false)

    const navigate = useNavigate()

    return (
        <div className='home'>
            <img className='logo' src={logo} alt="game logo" />
            <div>
                {
                    selectNicknameScreen ? (
                        <form className='homeOptions'>
                            <TextField.Input
                                size="3"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)} />
                            {
                                username ? (
                                    <Button
                                        size="4"
                                        radius="full"
                                        className='btn'
                                        onClick={() => navigate('/play')}
                                    > COMEÇAR
                                    </Button>
                                ) : (
                                    <Button
                                        size="4"
                                        radius="full"
                                    > COMEÇAR
                                    </Button>
                                )
                            }
                            <Button
                                size="4"
                                radius="full"
                                className='btn'
                                onClick={() => setSelectNicknameScreen(false)}
                            >
                                VOLTAR
                            </Button>
                        </form>
                    ) : (
                        <div className='homeOptions'>
                            <Button size="4" radius="full" className='btn' onClick={() => setSelectNicknameScreen(true)}>JOGAR</Button>
                            <Button size="4" radius="full" className='btn' onClick={() => navigate('/ranking')}>RANKING</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}