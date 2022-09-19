// import './assets/css/main.css';
import pages from './pages/pageIndex.js'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
        <Routes>
            {/* Index page */}
            <Route exact path='/' exact element={<pages.Page1 />} /> 

            <Route path='/page2' element={<pages.Page2/>} />
            <Route path='/page3' element={<pages.Page3/>} />
        </Routes>
        </Router>
    );
}

export default App;
