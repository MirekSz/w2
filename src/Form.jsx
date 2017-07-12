import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { form: {} };
        this.updateState = this.updateState.bind(this);
    }


    updateState(path, value) {
        let form = this.state.form;
        form[path] = value;
        this.setState({ form: form });
    }

    componentDidMount() {
        console.log('start: ');
    }

    componentWillUnmount() {
        console.log('stop: ');
    }

    render() {
        let j = JSON.stringify(this.state.form);
        return (<div className="container">
            <form>
                tu={j}
                <Row>
                    <Field label="First name" bind={this.state.form} path="fn" onValChange={this.updateState} />
                    <Field label="Last name" bind={this.state.form} path="ln" onValChange={this.updateState} />
                </Row>
                <Field label="First name" bind={this.state.form} path="fn" onValChange={this.updateState} />
                <Field label="Last name" bind={this.state.form} path="ln" onValChange={this.updateState} />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>)
    }
}
class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let length = this.props.children.length;
        return (
            <div>{React.Children.map(this.props.children, child => React.cloneElement(child, { elementsInRow: length }))}</div>);
    }
}
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let v = event.target.value;
        this.props.onValChange(this.props.path, v)
    }

    render() {
        let classForColumns = 12 / (this.props.elementsInRow ? this.props.elementsInRow : 1);
        return (<div className={'form-group col-xs-' + classForColumns}>
            <label >{this.props.label}</label>
            <input type="text" className="form-control" value={this.props.bind[this.props.path]}
                onChange={this.handleChange} />
        </div>);
    }
}
Field.propTypes = {
    label: PropTypes.string.isRequired,
    onValChange: PropTypes.func.isRequired
};
