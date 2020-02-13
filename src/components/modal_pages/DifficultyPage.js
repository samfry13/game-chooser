import React, {Component} from "react";

export default class DifficultyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.5
    };

    props.setValue(this.state.value);
  }

  render() {
    const {setValue, active} = this.props;
    const {value} = this.state;

    return (
        <div className={"body difficulty" + (active ? " active" : "")}>
          <div className="title">How intensive of a game do you want to play?</div>
          <div className="input">
            <div className="slider">
              <input type="range" min="0" max="1" step="0.1" value={value} onChange={e => {
                this.setState({value: e.target.value});
                setValue(e.target.value);
              }}/>
            </div>
          </div>
        </div>
    );
  }
}