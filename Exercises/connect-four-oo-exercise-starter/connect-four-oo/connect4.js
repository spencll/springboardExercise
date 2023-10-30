//Class creation 
//Changes: Global variables now constructed object arguements (this.height, this.width)
class Game {
  //what variables important 
  constructor (p1,p2,height=6,width=7){
    //predetermined board size
    this.height =height;
    this.width = width;
    //players array, current player is first element
    this.players= [p1,p2];
    this.currPlayer = p1;
    //board generation
    this.makeBoard();
    this.makeHtmlBoard();
  }

 makeBoard() {
  this.board = [];
    for (let y = 0; y < this.height; y++) {
      //generating array of length of this.width
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    //resets board 
    board.innerHTML = ``;
    // make column tops (clickable area for adding a piece to that column)
    //creating a clickable table row with id of column top and listening for click
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    //binded handleclick to this for removal later
    this.handleGameClick = this.handleClick.bind(this)
    top.addEventListener("click", this.handleGameClick);
  
    //WIDTH is now constructed this.width 
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    //adding rest of board row by row
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      //adding each cell of each row with id of x,y coordinate and appending
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
//make sure there's an empty spot for piece drop based on x coordinate 
//if array spot unoccupied, gives y coordinate 
findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
//creating a div piece with class of piece to be styled in css

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  //inline color 
  piece.style.backgroundColor = this.currPlayer.color;
  piece.style.top = -50 * (y + 2);
//creating spot DOM and attaching piece
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */
//just alerts the end of the game
endGame(msg) {
  alert(msg);
  //accessing bound attribute to remove listener for the top 
  const top = document.querySelector("#column-top")
  top.removeEventListener("click", this.handleGameClick)
}

/** handleClick: handle click of column top to play piece */
//runs after a click in drop down location 
handleClick(evt) {

  // get x from ID of clicked cell from makeHtmlBoard
  //+ makes it a number
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  //function returns a empty y spot
  const y = this.findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  //adds player number to that array spot
  //then creates a piece in that table 
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);
  
  // check for win
  if (this.checkForWin()) {
    return this.endGame(`Player ${this.currPlayer.color} won!`);
  }
  
  // check for tie
  //every board position has something 
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }
    
  // if game still running, switch turns
  this.currPlayer = this.currPlayer === this.players[0]  ? this.players[1] : this.players[0];
}

checkForWin() {
//making sure conditions are met for all the cells
  const _win = cells =>
  cells.every(
    ([y, x]) =>
      y >= 0 &&
      y < this.height &&
      x >= 0 &&
      x < this.width &&
      this.board[y][x] === this.currPlayer
  );

  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

}
//new class of player accepting a color arguement 
class Player {
  constructor(color) {
    //
    this.color = color;
  }
}

//Creating players and color selection 


//Game start/reset button to generate new game with player chosen colors
document.querySelector("#start").addEventListener('click', () => {
  let p1 = new Player(document.querySelector("#p1").value);
  let p2 = new Player(document.querySelector("#p2").value);
  new Game(p1,p2)
})




