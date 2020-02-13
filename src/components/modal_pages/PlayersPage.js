import React, {Component} from "react";

export default class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };

    props.setValue(this.state.value);
  }

  render() {
    const {setValue, active} = this.props;
    const {value} = this.state;

    return (
        <div className={"body players" + (active ? " active" : "")}>
          <div className="title">How many players do you have?</div>
          <div className="input">
            <div className="start">2</div>
            <div className="slider">
              <input type="range" min="2" max="7" value={value} onChange={e => {
                this.setState({value: e.target.value});
                setValue(e.target.value);
              }}/>
            </div>
            <div className="end">7</div>
          </div>
        </div>
    );
  }
}