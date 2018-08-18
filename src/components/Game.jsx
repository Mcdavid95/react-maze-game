import React, { Component } from "react";

/**
 * @function ScoreBoard
 * @param {object} props props passed from component
 * @returns {DOM} returns DOM element
 */
const ScoreBoard = ({ movesLeft, moves }) => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Nos of moves</th>
              <th> Nos of moves left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                { moves }
              </td>
              <td>
                { movesLeft }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

/**
 * class Game
 * @class Game
 * @description Game Class for maze Game
 */
class Game extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    let width = Number(prompt("please pick a width: e.g - 10, 3, 6 "));
    let height = Number(prompt("please pick a height: e.g - 10, 3, 6 "));
    if (isNaN(width) || width === null || width < 2) {
      width = 10
    }
    if (isNaN(height) || height === null || height < 2) {
      height = 10
    }
    this.state = {
      width,
      height,
      currentPosition: Math.floor(width * height / 2 + width / 2),
      totalMoves: 0,
      movesLeft: 64,
      numOfMushroom: 0
    };
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
  }

  /**
   * 
   * @method
   * @param {number} width 
   * @param {number} height
   * @return {object} object styled object
   */
  cellBlockStyle(width, height) {
    return {
      display: 'grid',
      height: `${25 * height}px`,
      width: `${25 * width}px`,
      gridTemplateColumns: `repeat(${width}, 1fr`,
      gridTemplateRows: `repeat(${height}, 1fr`,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }

  /**
   * @method endGame
   * @description handles end of game and creates store
   */
  endGame() {
    const { numOfMushroom, totalMoves, movesLeft } = this.state;
    const mushrooms = document.getElementsByClassName('mushroom-image').length;
    let score;
    if (mushrooms === 0) {
      score = numOfMushroom * 5;
      alert(`Hurray you completed the game in ${totalMoves} moves \n Score: ${score + movesLeft}` )
      location.reload()
    }
    if (movesLeft === 0) {
      score = (numOfMushroom - mushrooms) * 5;
      alert(`oops sorry you exhausted your move \n Score: ${score}`)
      location.reload()
    }
  }

  /**
   * @method componentWillMount
   * @description listens for keypress event
   */
  componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
  }

  /**
   * @method componentDidMount
   * @description setups component state
   */
  componentDidMount() {
    const cells = document.getElementsByClassName('cell');
    cells[this.state.currentPosition].innerHTML = `<img src=${require('../../public/mario-icon.png')} alt='mario' height=15px width=15px className='maze-image'/>`;
    this.getMushroom();
    this.setState({
      numOfMushroom: document.getElementsByClassName('mushroom-image').length
    })
  }

  /**
   * 
   * @param {number} max maximum number to generate
   * @description generates random numbers
   */
  generateRandom(max) {
    const randomNumber = Math.floor((Math.random() * (max - 1)) + 0);
    return randomNumber;
  }

  /**
   * @method getMushroom
   * @description places mushroom in random cells
   */
  getMushroom() {
    let randomNumber;
    const { width, height, currentPosition } = this.state;
    const cells = document.getElementsByClassName('cell');
    const image = `<img src=${require('../../public/mario-mashroom.jpeg')} alt='mario' height=15px width=15px class='mushroom-image'/>`;
    for (let index = 0; index < width + height; index++) {
      randomNumber = this.generateRandom(cells.length);
      cells[(randomNumber === currentPosition ? this.generateRandom(cells.length) : randomNumber)].innerHTML = image;
    }
  }

  /**
   * 
   * @method handleMoveUp
   * @param {object} event event object
   * @description handles upward movement of character
   */
  handleMoveUp(event) {
    const { currentPosition, width, movesLeft, totalMoves } = this.state;
    const cells = document.getElementsByClassName('cell');
    const image = `<img src=${require('../../public/mario-icon.png')} alt='mario' height=15px width=15px className='maze-image'/>`
    const newPosition = currentPosition - width
    if (currentPosition > width - 1) {
      cells[this.state.currentPosition].innerHTML = "";
      cells[newPosition].innerHTML = image;
      this.setState({
        currentPosition: newPosition,
        totalMoves: totalMoves + 1,
        movesLeft: movesLeft - 1
      })
    }
  }

  /**
   * 
   * @method handleMoveDown
   * @param {event} event event object
   * @description handles downward movement of character
   */
  handleMoveDown(event) {
    const { currentPosition, width, height, movesLeft, totalMoves } = this.state;
    const cells = document.getElementsByClassName('cell');
    const image = `<img src=${require('../../public/mario-icon.png')} alt='mario' height=15px width=15px className='maze-image'/>`;
    const newPosition = this.state.currentPosition + width;
    if ((width * height) - currentPosition > width) {
      cells[currentPosition].innerHTML = "";
      cells[newPosition].innerHTML = image;
      this.setState({
        currentPosition: newPosition,
        totalMoves: totalMoves + 1,
        movesLeft: movesLeft - 1
      })
    }
  }

  /**
   * 
   * @method handleMoveLeft
   * @param {event} event event object
   * @description handles left movement of character
   */
  handleMoveLeft(event) {
    const { currentPosition, width, movesLeft, totalMoves } = this.state;
    const cells = document.getElementsByClassName('cell');
    const image = `<img src=${require('../../public/mario-icon.png')} alt='mario' height=15px width=15px className='maze-image'/>`;
    const newPosition = this.state.currentPosition - 1;
    if (!(currentPosition === 0 || currentPosition % width === 0)) {
      cells[currentPosition].innerHTML = "";
      cells[newPosition].innerHTML = image;
      this.setState({
        currentPosition: newPosition,
        totalMoves: totalMoves + 1,
        movesLeft: movesLeft - 1
      })
    }
  }

  /**
   * 
   * @method handleMoveRight
   * @param {event} event event object
   * @description handles right movement of character
   */
  handleMoveRight(event) {
    const { currentPosition, width, movesLeft, totalMoves } = this.state;
    const cells = document.getElementsByClassName('cell');
    const image = `<img src=${require('../../public/mario-icon.png')} alt='mario' height=15px width=15px className='maze-image'/>`;
    const newPosition = this.state.currentPosition + 1;
    if (!((currentPosition + 1) % width === 0)) {
      cells[currentPosition].innerHTML = "";
      cells[newPosition].innerHTML = image;
      this.setState({
        currentPosition: newPosition,
        totalMoves: totalMoves + 1,
        movesLeft: movesLeft - 1
      })
    }
  }

  /**
   * 
   * @method onKeyPress
   * @param {event} event event object
   * @description listens for keyPress events
   */
  onKeyPress(event) {
    if (event.which === 38) {
      this.handleMoveUp(event);
      this.endGame()
    }
    if (event.which === 40) {
      this.handleMoveDown(event);
      this.endGame()
    }
    if (event.which === 37) {
      this.handleMoveLeft(event);
      this.endGame()
    }
    if (event.which === 39) {
      this.handleMoveRight(event);
      this.endGame()
    }
  }

  /**
   * 
   * @method createCells
   * @param {number} width width of cell container
   * @param {number} height height of cell container
   * @description handles downward movement of character
   * @returns {Array} an array of cell elements
   */
  createCells(width, height) {
    const cellBlock = []
    for (let index = 0; index < width * height; index++) {
      cellBlock.push(<div key={index} className="cell" id={ `${index}` } />)
    }
    return cellBlock
  }

  /**
   * 
   * @method render react render method
   * @param {event} event event object
   * @description handles downward movement of character
   */
  render() {
    const { width, height } = this.state;
    
    return (
      <div>
        <ScoreBoard moves={this.state.totalMoves} movesLeft={this.state.movesLeft} />
        <div  style={this.cellBlockStyle(width, height)} >
          { this.createCells(width, height) }
        </div>
      </div>
    );
  }
}

export default Game;
