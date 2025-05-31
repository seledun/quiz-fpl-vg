import { Card, Container } from 'react-bootstrap';
import { MNav } from './components/MNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { PlayArea } from './components/PlayArea';
import { useState } from 'react';

function App() {

  const [play, setPlay] = useState(true); // State control for quiz / graph mode

  return (
    <>
      <MNav setPlayMode = {setPlay}/>
      <PlayArea isPlayMode = {play} />
    </>
  )
}

export default App
