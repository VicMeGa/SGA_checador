import './App.css';
import Cabeza from "./Components/Cabeza"
import DivDerecho from './Components/DivDerecho';
import DivIzquierdo from './Components/DivIzquierdo';


function App() {


  return (
    <>
    <Cabeza />
    <div className='divIzquierdo'>
      <DivIzquierdo />
    </div>
    <div className='divDerecho'>
      <DivDerecho />
    </div>
    </>
  )
}

export default App
