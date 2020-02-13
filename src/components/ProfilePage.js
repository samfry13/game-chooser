import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import {games} from "../data/games";


export default class ProfilePage extends Component {
  render() {
    return (
        <div id="profile">
            <div className="grid-wrapper">
                <div className="key">Name:</div>
                <div className="value">Sam</div>
                <div className="key">Email:</div>
                <div className="value">email@example.com</div>
                <PrimaryButton id="edit-profile" onClick={this.EditProfile} text="Edit Profile"/>
                <PrimaryButton id="add-game" onClick={this.AddGame} text="Add Game"/>
            </div>
            <div id="game-table">
                <div className="table-header row">
                    <div className="game-col">Game</div>
                    <div className="players-col">Players</div>
                    <div className="diff-col">Difficulty</div>
                    <div className="length-col">Length</div>
                </div>
                {games.map(game => {
                    return <div className="row">
                        <div className="game-col">{game.name}</div>
                        <div className="players-col">{game.players}</div>
                        <div className="diff-col">{game.difficulty}</div>
                        <div className="length-col">{game.time}</div>
                    </div>
                })}
            </div>
        </div>
    );
  }

  EditProfile() {
      alert("You clicked the \"Edit Profile\" button.");
  }

  AddGame() {
      alert("You clicked the \"Add Game\" button.");
  }
}
