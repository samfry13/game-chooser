import React, {Component} from 'react';

export default class HomePage extends Component {
  render() {
    const games = [0, 1, 2, 3, 4, 5];
    return (
        <div id="home">
          <div className="grid-wrapper">
            <div className="choose button"><div>Choose a Game</div></div>
            <div className="games">
              {games.map(() => {
                return <div className="game">
                  <div className="image"/>
                  <div className="players">Players 3 - 5</div>
                  <div className="length">Length: 30 min</div>
                  <div className="difficulty">Moderate</div>
                </div>
              })}
            </div>
          </div>
        </div>
    );
  }
}