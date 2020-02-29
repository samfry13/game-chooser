import React, {Component} from 'react';

export default class InputField extends Component {
  render() {
    const {type, label, value, onChange} = this.props;
    return <div className="input-text">
      <input type={type ? type : "text"} value={value} onChange={e => onChange(e.target.value)} required/>
      <span className="highlight"/>
      <span className="bar"/>
      <label>{label}</label>
    </div>
  }
}