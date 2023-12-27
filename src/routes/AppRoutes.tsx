// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from '../components/Home/Home';
import Play from '../components/Play/Play';
import End from '../components/End/End';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/play' element={<Play user={''} />} />
                <Route path='/end' element={<End user={''} />} />
            </Routes>
        </BrowserRouter>
    )
}