const rows = ['QWERTYUIOP', 'ASDFGHJKL', '+ZXCVBNM-'];

const getColor = (letter, solution, guesses) => {
    const ind = solution.indexOf(letter)
    if (ind === -1) return 'wrong'

    if (guesses.find((guess) => guess[ind] === letter)) return "correct";

    return "semi-correct"
}

const Keyboard = ({ solution, letters, guesses, onPress }) => {
  return (
    <div className="keyboard">
        {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="keyboard-row">
                {row.split('').map((letter, letterIdx) => (
                    <button onClick={() => onPress(letter)} key={letterIdx} className={`keyboard-letter ${letters.includes(letter) && getColor(letter, solution, guesses)}`}>
                        {letter === '+' ? 'ENTER' : letter === '-' ? 'DELETE' : letter}
                    </button>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Keyboard