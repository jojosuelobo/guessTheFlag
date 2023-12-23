// Styles
import './Home.sass'
// Images
import logo from '../../images/worldFlag.png'

// React
import { useState } from 'react'

// Radix UI
import { Button, TextField } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [selectNicknameScreen, setSelectNicknameScreen] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('');

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
                                        className='homeButton'
                                        onClick={() => navigate('/play', { state: { username } })}
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
                                className='homeButton'
                                onClick={() => setSelectNicknameScreen(false)}
                            >
                                VOLTAR
                            </Button>
                        </form>
                    ) : (
                        <div className='homeOptions'>
                            <Button size="4" radius="full" className='homeButton' onClick={() => setSelectNicknameScreen(true)}>JOGAR</Button>
                            <Button size="4" radius="full" className='homeButton'>RANKING</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}