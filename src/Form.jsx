import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
      constructor(props) {
            super(props);
            this.state = { tempForm: {}, form: {} }
      }
      json() {
            this.setState({ form: this.state.tempForm });
      }

      render() {
            let j = JSON.stringify(this.state.form);
            return (<div>
                  {j}
                  <Row>
                        <Field label="First name" bind={this.state.tempForm} path="fn" />
                        <Field label="Last name" bind={this.state.tempForm} path="ln" />
                  </Row>
                  <Field label="First name" bind={this.state.tempForm} path="fn" />
                  <Field label="Last name" bind={this.state.tempForm} path="ln" />
                  <button className="btn" onClick={this.json.bind(this)}>JSON</button>
            </div>)
      }
}
class Row extends React.Component {
      constructor(props) {
            super(props);
      }
      render() {
            let length = this.props.children.length;
            return (<div>{React.Children.map(this.props.children, child => React.cloneElement(child, { elementsInRow: length }))})</div>);
      }
}
class Field extends React.Component {
      constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = { value: null }
      }
      handleChange(event) {
            let v = event.target.value;
            this.setState({ value: v });
            this.props.bind[this.props.path] = v;
      }
      render() {
            let classForColumns = 12 / this.props.elementsInRow;
            return (<div className={'form-group col-xs-' + classForColumns} W>
                  <label >{this.props.label}</label>
                  <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
            </div>);
      }
}
Field.propTypes = {
      label: PropTypes.string.isRequired
}