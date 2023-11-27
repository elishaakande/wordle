const getColors = (solution, word) => {
    const result = Array(solution.length).fill("wrong");

    for (let i = 0; i < solution.length; i++) {
        result[i] = getCellColor(word[i], solution[i], solution);
    }

    return result;
};

const getCellColor = (letter, solutionAtPosition, solution) => {
    if (letter === solutionAtPosition) {
        return "correct";
    }
    if (solution.includes(letter)) {
        return "semi-correct";
    }
    return "wrong";
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