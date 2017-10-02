import React, {Component} from 'react';
import { connect } from 'react-redux';
import GameTile from './GameTile';

import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    if (this.props.grid) {
      let rows = this.props.grid.map((cell) => {
        return <GameTile key={'grid-cell-' + cell.x + ',' + cell.y} tile={cell}/>;
      });

      return <div className="gameBoard">{rows}</div>;
    } else {
      return <p>No data...</p>;
    }
  }

  drawSomething() {}

}

function mapStateToProps(state) {
  return {
    grid: state.grid
  };
}

export default connect(mapStateToProps)(GameBoard);