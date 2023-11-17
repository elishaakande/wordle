const getColors = (solution, word) => {
    const result = solution.split("");

    for (let i = 0; i < solution.length; i++) {
        if (word[i] === result[i]) result[i] = "*";
    }

    for (let i = 0; i < solution.length; i++) {
        const ind = result.indexOf(word[i])
        if(ind > -1) result[ind] = "$";
    }

    return result.map((letter) => {
        if (letter === "*") return 'correct';
        if (letter === "$") return 'semi-correct';
        return 'wrong'
    })
}

const Row = ({ word, isFinished, solution }) => {

    const colors = isFinished ? getColors(solution, word) : new Array(5).fill('');

    return new Array(5).fill("").map((_, idx) => (
        <div key={idx} className={`board-cell ${colors[idx]}`}>
            {word[idx] ?? ""}
        </div>
    ));
}

const Board = ({ guesses, currentRow, currentWord, solution }) => {
    return (
        <div className="board">
            {guesses.map((_, rowIdx) => (
                <div key={rowIdx} className="board-row">
                    <Row
                        word={currentRow === rowIdx ? currentWord : guesses[rowIdx]}
                        isFinished={currentRow > rowIdx}
                        solution={solution}
                    />
                </div>
            ))}
        </div>
    )
}

export default Board