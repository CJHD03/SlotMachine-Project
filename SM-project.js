// BY: Cj Delphias
// SLOT MACHINE GAME

// 1. depo some money done
// 2. determine number of lines to bet on done
// 3. collect a bet amount done
// 4. spin slots done
// 5. check if user won done
// 6. give user winnings done
// 7. play again done
// 8. no money left? done

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a Deposit Amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
}

function getNumberOfLines() {
  while (true) {
    const BetLines = prompt("Enter a the number of lines to bet on (1-3): ");
    const numberOfBetLines = parseFloat(BetLines);

    if (
      isNaN(numberOfBetLines) ||
      numberOfBetLines <= 0 ||
      numberOfBetLines > 3
    ) {
      console.log("Invalid line bet number, try again.");
    } else {
      return numberOfBetLines;
    }
  }
}

function getBet(balance, lines) {
  while (true) {
    const bet = prompt("Enter the bet per Line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet amount, try again.");
    } else {
      return numberBet;
    }
  }
}

function spin() {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelsymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomINdex = Math.floor(Math.random() * reelsymbols.length);
      const selectedSymbol = reelsymbols[randomINdex];
      reels[i].push(selectedSymbol);
      reelsymbols.splice(randomINdex, 1);
    }
  }
  return reels;
}

function transpose(reels) {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

function printRows(rows) {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

function getWinings(rows, bet, lines) {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
}

function game() {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numLlines = getNumberOfLines();
    const bet = getBet(balance, numLlines);
    balance -= bet * numLlines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinings(rows, bet, numLlines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }
    console.log("Your Balance is now $" + balance.toString());
    const playAgain = prompt("Do you want to play again(y/n): ");

    if (playAgain != "y") break;
  }
  console.log("You left with $" + balance.toString() + "!");
}
game();
