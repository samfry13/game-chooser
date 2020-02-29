import React, {Component} from "react";

export default class SmallFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || props.minValue,
      displayValues: props.interpolateValues ?
          this.interpolateValues(props.minValue, props.maxValue, props.stepSize)
          : props.minDisplayValue && props.maxDisplayValue ? [props.minDisplayValue, props.maxDisplayValue]
              : [props.minValue, props.maxValue],
    };

    props.setValue(props.defaultValue || props.minValue);
  }

  interpolateValues(min, max, step) {
    let result = [];
    for (let i = min; i <= max; i += step) {
      result.push(i);
    }
    return result;
  }

  render() {
    const {setValue, title,
      minValue, maxValue, stepSize, hasGradient,
      showIntermediateValue, displayIntermediateValue} = this.props;
    const {value, displayValues} = this.state;

    let newDisplayValues = displayValues.slice();
    if (showIntermediateValue) {
      newDisplayValues.splice(1, 0, displayIntermediateValue
          ? displayIntermediateValue(value) : value);
    }

    return (
        <div className="filter">
          <div className="title">{title}</div>
          <div className={"input-bar" + (showIntermediateValue ? " display" : "")}>
            <div className="values" style={{
              gridTemplateColumns: "repeat(" + newDisplayValues.length + ", auto)"
            }}>
              {newDisplayValues.map((value, i) => {
                return showIntermediateValue && i === 1
                    ? <div key={i} className="value display">{value}</div>
                    : <div key={i} className="value">{value}</div>
              })}
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