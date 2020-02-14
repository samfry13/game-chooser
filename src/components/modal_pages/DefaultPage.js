import React, {Component} from "react";

export default class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || 0,
      displayValues: props.interpolateValues ?
          this.interpolateValues(props.minValue, props.maxValue, props.stepSize)
          : props.minDisplayValue && props.maxDisplayValue ? [props.minDisplayValue, props.maxDisplayValue]
              : [props.minValue, props.maxValue],
    }
  }

  interpolateValues(min, max, step) {
    let result = [];
    for (let i = min; i <= max; i += step) {
      result.push(i);
    }
    return result;
  }

  render() {
    const {setValue, active, title, minValue, maxValue, stepSize, hasGradient} = this.props;
    const {value, displayValues} = this.state;

    return (
        <div className={"body" + (active ? " active" : "")}>
          <div className="title">{title}</div>
          <div className="input">
            <div className="values" style={{
              gridTemplateColumns: "repeat(" + displayValues.length + ", auto)"
            }}>
              {displayValues.map((value, i) => <div key={i} className="value">{value}</div>)}
            </div>
            <div className={"slider" + (hasGradient ? " gradient" : "")}>
              <input type="range" min={minValue} max={maxValue} step={stepSize} value={value}
                     onChange={e => {
                       this.setState({value: e.target.value});
                       setValue(e.target.value);
                     }}/>
            </div>
          </div>
        </div>
    );
  }
}