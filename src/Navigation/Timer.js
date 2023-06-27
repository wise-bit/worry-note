import { useEffect, useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

export default function Timer() {
  const [counter, setCounter] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 &&
      timerRunning &&
      setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0 && timerRunning) {
      alert('Study timer over, congrats!');
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [counter, timerRunning]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const addTime = (time) => {
    setCounter(counter + time);
  };

  const resetTimer = () => {
    setCounter(0);
  };

  // eslint-disable-next-line
  var addZeros = (num) => {
    if (num < 10 && num >= 0) {
      return '0' + num;
    } else {
      return num;
    }
  };

  return (
    <>
      <button
        onClick={() => toggleTimer()}
        style={{
          width: 'auto',
          height: '40px',
          background: '#444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid 2px black',
        }}
      >
        {timerRunning ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
      </button>

      {/* Timer Display */}
      <div style={{ marginTop: '7px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Study timer:{' '}
          {new Date(counter * 1000).toISOString().substring(11, 19)}
        </div>
      </div>

      {/* Button to add 10 seconds */}
      <button
        onClick={() => addTime(10)}
        style={{ width: '60px', background: '#444' }}
      >
        +10s
      </button>

      {/* Button to add 1 minute */}
      <button
        onClick={() => addTime(60)}
        style={{ width: '60px', background: '#444', marginLeft: '0px' }}
      >
        +1m
      </button>

      {/* Button to add 1 hour */}
      <button
        onClick={() => addTime(3600)}
        style={{ width: '60px', background: '#444', marginLeft: '0px' }}
      >
        +1h
      </button>

      {/* Reset Button */}
      <button
        onClick={() => resetTimer()}
        style={{
          width: '70px',
          border: 'solid 2px black',
          background: '#FFF',
          color: 'black',
          marginLeft: '0px',
        }}
      >
        Reset
      </button>
    </>
  );
}
