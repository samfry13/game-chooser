import React, {Component} from 'react';
import PrimaryButton from "./PrimaryButton";
import {updateUser, getUserAttributes} from "../HttpConnector";


export default class ProfilePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          editing: false,
          name: sessionStorage.getItem('Name'),
          email: sessionStorage.getItem('Email')
      };
      this.games = Object.values(JSON.parse(sessionStorage.getItem('Games')));
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
                {editing ? <PrimaryButton id={"edit-profile"} onClick={async () => await this.saveChanges()} text="Save Changes"/> : <PrimaryButton id="edit-profile" onClick={() => this.editProfile()} text="Edit Profile"/>}
                {editing ? <div/> : <PrimaryButton id="add-game" onClick={() => this.addGame()} text="Add Game"/>}
            </div>
            <div id="game-table">
                <div id="table-header" className="row">
                    <div className="game-col">Game</div>
                    <div className="players-col">Players</div>
                    <div className="diff-col">Difficulty</div>
                    <div className="length-col">Length</div>
                </div>
                {this.games.map(game => {
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

  async saveChanges() {
      let name = document.getElementById('edit-name').value;
      let email = document.getElementById('edit-email').value;
      if (!this.validateEmail(email)) {
          alert('Invalid email.');
          return;
      }
      try {
          let id = sessionStorage.getItem('UserId');
          await updateUser(id, name, email);
          let attributes = await getUserAttributes(id);
          sessionStorage.setItem('Name', attributes.name);
          sessionStorage.setItem('Email', attributes.email);
          sessionStorage.setItem('Games', JSON.stringify(attributes.games));
          this.setState({
              name: sessionStorage.getItem('Name'),
              email: sessionStorage.getItem('Email'),
              editing: false,
          });
          window.location.reload();
      } catch (e) {
          alert(e.message);
      }

  }

  validateEmail(email) {
      if (email === undefined) {
          return false;
      }
      // eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  addGame() {
      alert("The \"Add Game\" feature has not been implemented yet. Stay tuned!");
  }
}
