import React, {Component} from 'react';


export default class PrimaryButton extends Component {
  render() {
    return (
        <div id={this.props.id}>
          <button className="primary-button" onClick={this.props.onClick}>{this.props.text}</button>
        </div>
    );
  }
}
