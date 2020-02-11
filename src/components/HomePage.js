import React, {Component} from 'react';

const games = [
  {
    url: "https://images.unsplash.com/photo-1563941402830-3bae42b67b38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
  {
    url: "https://images.unsplash.com/photo-1530328411047-7063dbd29029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
  {
    url: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
  {
    url: "https://images.unsplash.com/photo-1543338227-5cab7f6c9af3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
  {
    url: "https://images.unsplash.com/photo-1563811771046-ba984ff30900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
  {
    url: "https://images.unsplash.com/photo-1546512636-028082dff74d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80",
    players: "3-5",
    time: "30 min",
    difficulty: "Moderate",
  },
];

export default class HomePage extends Component {
  render() {
    return (
        <div id="home">
          <div className="grid-wrapper">
            <div className="choose button"><div>Choose a Game</div></div>
            <div className="games">
              {games.map(game => {
                return <div className="game">
                  <div className="image">
                    <img src={game.url} alt="game"/>
                  </div>
                  <div className="players">Players {game.players}</div>
                  <div className="length">Length: {game.time}</div>
                  <div className="difficulty">{game.difficulty}</div>
                </div>
              })}
            </div>
          </div>
        </div>
    );
  }
}
