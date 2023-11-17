import { useState } from 'react';
import './App.css';
import { words } from './words';
import { useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import { useCallback } from 'react';
import Modal from './Modal';
import { useRef } from 'react';

const ROWS = 6;

const merge = (letters, word) => Array.from(new Set(letters + word)).join('');

const App = () => {

  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(new Array(ROWS).fill(''));
  const [currentWord, setCurrentWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [letters, setLetters] = useState('');
  const [gameStatus, setGameStatus] = useState("");

  const ref = useRef();

  const selectWord = () => setSolution(words[Math.floor(Math.random() * words.length)]);

  useEffect(() => {
    selectWord();
  }, []);

  const handleGameReset = () => {
    selectWord();
    setGuesses(new Array(ROWS).fill(''));
    setCurrentRow(0);
    setCurrentWord('');
    setLetters('');
    setGameStatus('');
  }

  const handleKeyDown = useCallback(
    (e) => {
      const { keyCode, key } = e;
      if (keyCode === 8 && currentWord.length > 0) {
        setCurrentWord((currentWord) => currentWord.slice(0, -1))
        return;
      }

      if (currentWord.length === 5) {
        if (keyCode !== 13) return
        else {
          setGuesses((guesses) =>
            guesses.map((guess, idx) =>
              idx === currentRow ? currentWord : guess
            )
          );
          setLetters(letters => merge(letters, currentWord));
          setCurrentRow((currentRow) => currentRow + 1);
          setCurrentWord("");
          return;
        }
      }

      if (keyCode >= 65 && keyCode <= 90) {
        setCurrentWord((currentWord) => currentWord + key.toUpperCase());
        return;
      }
    }, [currentWord, currentRow]);

  useEffect(() => {
    if (guesses[currentRow-1] === solution && solution) {
      setGameStatus('You Won');
      ref.current.openModal()
    }
    else if (currentRow > ROWS -1){
      setGameStatus('You lost');
      ref.current.openModal()
    }
  }, [guesses, currentRow, solution])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="App">
      <div className="nav">Wordle</div>
      <Board 
        guesses={guesses} 
        currentRow={currentRow} 
        currentWord={currentWord}
        solution={solution}
      />
      <Keyboard 
        letters={letters} 
        solution={solution}
        guesses={guesses}
      />
      <Modal
        gameStatus={gameStatus}
        solution={solution}
        handleGameReset={handleGameReset}
        ref={ref}
      />
    </div>
  )
}

export default App