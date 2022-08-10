import classes from './App.module.css';
import {Routes,Route,Link} from 'react-router-dom'
import Lay from './Components/Layout/Lay';
import Login from "./Pages/Auth"
 import Game from "./Components/Minesweeper_elems/Game"
import Home from "./Pages/Home"
import  Level from "./Pages/Level";
import {useSelector,useDispatch} from 'react-redux';
import GameContext from './Context/Game_Context';
import {useState} from 'react';
import Sign from './Pages/Sign';
function App() {
  const  isLogedIn=useSelector((state)=>state.data.isLogedIn)
  const dispatch=useDispatch()
  const [state,setstate]=useState({})
  return (
    <GameContext.Provider value={[state,setstate]}>
      <Routes>
        <Route path='/' element={<Lay/>}>
          <Route index element={<Home/>} />
          {!isLogedIn && <Route path='login' element={<Login/>}/>}
          {!isLogedIn && <Route path='signup' element={<Sign/>}/>}
          <Route path='level' element={<Level/>}/>
          <Route path="game" element={<Game/>}/>
            
          
          
        </Route>
        
      </Routes>
    
    </GameContext.Provider>
  );
}

export default App;
