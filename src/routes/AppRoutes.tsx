// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from '../components/Home/Home';
import Play from '../components/Play';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/play' element={<Play />} />
            </Routes>
        </BrowserRouter>
    )
}