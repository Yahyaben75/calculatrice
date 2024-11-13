let input = document.getElementById('calculatorInput');
let board, currentPlayer, isAI;

// Fonction pour effacer l'écran
function clr() {
    input.value = "";
}

// Fonction pour ajouter un caractère dans l'affichage
function dis(val) {
    input.value += val;
}

// Fonction pour supprimer le dernier caractère
function back() {
    input.value = input.value.slice(0, -1);
}

// Fonction pour résoudre l'expression
function solve() {
    let expression = input.value;

    // Vérification spéciale pour 1+1=3
    if (expression === "1+1") {
        input.value = "3";
        return;
    }

    // Activer le jeu Tic-Tac-Toe si l'utilisateur entre "2+2"
    if (expression === "2+2") {
        document.querySelector('.calc').classList.add('hidden');
        document.getElementById('game-choice').classList.remove('hidden');
        return;
    }

    // Gestion du pourcentage
    expression = expression.replace(/(\d+)%/g, '($1/100)');

    // Gestion de la racine carrée
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

    // Exécution de l'expression
    try {
        input.value = eval(expression);
    } catch {
        input.value = "Error";
    }
}

// Fonction pour démarrer le jeu Tic-Tac-Toe
function startTicTacToe(aiMode) {
    isAI = aiMode;
    document.getElementById('game-choice').classList.add('hidden');
    document.getElementById('tic-tac-toe').classList.remove('hidden');
    resetGame();
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    document.getElementById('game-info').textContent = `Turn: ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

function backToCalculator() {
    document.getElementById('tic-tac-toe').classList.add('hidden');
    document.querySelector('.calc').classList.remove('hidden');
    clr();
}

function makeMove(index) {
    if (board[index] === "" && !isWinner()) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;
        if (isWinner()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        } else if (board.every(cell => cell !== "")) {
            setTimeout(() => alert("It's a draw!"), 100);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (isAI && currentPlayer === "O") aiMove();
        }
    }
}

function aiMove() {
    let emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function isWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(index => board[index] === currentPlayer));
}