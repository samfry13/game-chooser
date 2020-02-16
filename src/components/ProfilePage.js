import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import {games} from "../data/games";


export default class ProfilePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          editing: false,
          name: "Sam",
          email: "email@example.com"
      }
  }

  render() {
    const {editing, name, email} = this.state;

    return (
        <div id="profile">
            <div id="profile-values" className="grid-wrapper">
                <div className="key">Name:</div>
                {editing ? <input id="edit-name" defaultValue={name}/> : <div className="value">{name}</div>}
                <div className="key">Email:</div>
                {editing ? <input id="edit-email" defaultValue={email}/> : <div className="value">{email}</div>}
                {editing ? <PrimaryButton id={"edit-profile"} onClick={() => this.saveChanges()} text="Save Changes"/> : <PrimaryButton id="edit-profile" onClick={() => this.editProfile()} text="Edit Profile"/>}
                {editing ? <div/> : <PrimaryButton id="add-game" onClick={() => this.addGame()} text="Add Game"/>}
            </div>
            <div id="game-table">
                <div id="table-header" className="row">
                    <div className="game-col">Game</div>
                    <div className="players-col">Players</div>
                    <div className="diff-col">Difficulty</div>
                    <div className="length-col">Length</div>
                </div>
                {games.map(game => {
                    return <div className="row">
                        <div className="game-col">{game.title}</div>
                        <div className="players-col">{game.minPlayers} - {game.maxPlayers}</div>
                        <div className="diff-col">{game.difficulty}</div>
                        <div className="length-col">{game.time}</div>
                    </div>
                })}
            </div>
        </div>
    );
  }

  editProfile() {
      this.setState({editing: true});
  }

  saveChanges() {
      this.setState({
          name: document.getElementById("edit-name").value,
          email: document.getElementById("edit-email").value,
          editing: false,
      });
  }

  addGame() {
      alert("The \"Add Game\" feature has not been implemented yet. Stay tuned!");
  }
}
