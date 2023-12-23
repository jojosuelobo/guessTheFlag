import './Home.sass'
import logo from '../../images/worldFlag.png'
import { Button } from '@radix-ui/themes'



export default function Home() {
    return (
        <div className='home'>
            <img className='logo' src={logo} alt="game logo" />
            <div className='homeOptions'>
                <Button size="4" radius="full" className='homeButton'>JOGAR</Button>
                <Button size="4" radius="full" className='homeButton'>RANKING</Button>
            </div>
        </div>
    )
}