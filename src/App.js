import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';
import './App.css';


function App() {
  const [advice, setAdvice] = useState('');
  const { speak, speaking } = useSpeechSynthesis();

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const speakAdvice = () => {
    if (!speaking) {
      speak({ text: advice });
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="heading">{advice}</h1>
        <button className="button" onClick={fetchAdvice}>
          <span>Generate</span>
        </button>
        <button className="button" onClick={speakAdvice}>
          <span>Narrate</span>
        </button>
      </div>
    </div>
  );
}

export default App;




