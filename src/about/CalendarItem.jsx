import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import Perf from 'react-addons-perf';

const dataSource = ['Urlop', 'Święto', 'Opieka', 'Chorobowe'];

export default class CalendarItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleUpdateInput(day, value) {
        day.offReason = value;
//        this.props.onOffReasonChange(day, value);
    };

    editComplete(day, value) {
        this.props.onOffReasonChange(this.props.day, this.props.day.offReason);
    };


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.day !== this.props.day || this.props.project !== nextProps.project;
    }

    render() {
        return (<TableRow>
            <TableRowColumn>{this.props.day.day}</TableRowColumn>
            <TableRowColumn>
                {this.props.project}
            </TableRowColumn>
            <TableRowColumn>8</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn> <AutoComplete
                onUpdateInput={this.handleUpdateInput.bind(this, this.props.day)}
                onBlur={this.editComplete.bind(this)}
                searchText={this.props.day.offReason}
                filter={AutoComplete.noFilter}
                openOnFocus={true}
                dataSource={dataSource}
            /></TableRowColumn>
        </TableRow>);
    }
}

CalendarItem.propTypes = {
    day: PropTypes.object.isRequired,
    project: PropTypes.string.isRequired,
    onOffReasonChange: PropTypes.func.isRequired,
};
