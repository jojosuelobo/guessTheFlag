// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from '../components/Home/Home';
import Play from '../components/Play/Play';
import End from '../components/End/End';
import Ranking from '../components/Ranking/Ranking';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/play' element={<Play user={''} />} />
                <Route path='/end' element={<End user={''} points={0} />} />
                <Route path='/ranking' element={<Ranking/>} />
            </Routes>
        </BrowserRouter>
    )
}