import ContainerTask from './components/ContainerTask';
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <Routes>
    <Route path='/' element={ <ContainerTask />} />
    <Route path='/a' element={<Home />} />
    </Routes>
  );
}

export default App;
