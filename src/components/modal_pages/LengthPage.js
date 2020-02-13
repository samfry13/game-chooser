import React, {Component} from "react";

export default class LengthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 30
    };

    props.setValue(this.state.value);
  }

  render() {
    const {setValue, active} = this.props;
    const {value} = this.props;

    return (
        <div className={"body length" + (active ? " active" : "")}>
          <div className="title">How long of a game do you want to play?</div>
          <div className="input">
            <div className="start">15 min</div>
            <div className="slider">
              <input type="range" min="15" max="120" step="15" value={value} onChange={e => {
                this.setState({value: e.target.value});
                setValue(e.target.value);
              }}/>
            </div>
            <div className="end">2 hrs</div>
          </div>
        </div>
    );
  }
}