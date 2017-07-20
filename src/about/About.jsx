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
import Rx from 'rxjs';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Perf from 'react-addons-perf';
import CalendarItem from './CalendarItem';

const dataSource = ['Urlop', 'Święto', 'Opieka', 'Chorobowe'];
let days = [];
for (let i = 0; i <= 31; i++) {
    let day = {day: i, offReason: ''};
    days.push(day);
}
const add$ = new Rx.Subject();
add$.debounceTime(500).distinctUntilChanged().subscribe((val) => {
    val.stateHolder.setState({project: val.project});
});
export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {days, project: 'Next Verto', time: 0};
    }

    componentWillUpdate() {
        this.time = Date.now();
//        Perf.start();
    }

    componentDidUpdate(prevProps, prevState) {
//        Perf.stop();
//        Perf.printInclusive();
//        Perf.printWasted();

        this.refreshTimes(this.state.time === prevState.time);
    }

    refreshTimes(hasTimeChanged) {
        if (hasTimeChanged) {
            this.setState({
                time:
                Date.now() - this.time,
            });
        }
        console.log('this.state.time: ', this.state.time);

    }

    handleUpdateInput(day, value) {
        day.offReason = value;
        var index = days.indexOf(day);
        if (index > -1) {
            days[index] = Object.assign({}, day);
        }
        this.setState({days});
    };

    handleProjectInput(event) {
        event.persist();
        add$.next({project: event.target.value, stateHolder: this});
    };

    render() {
        // return (
        //       <div>about {this.props.sub} <a className="btn btn-success" href="about/subabout" data-navigo>subabout</a>
        //       </div>)

        var rows = [];
        for (let day of days) {
            rows.push(<CalendarItem day={day} project={this.state.project}
                                    onOffReasonChange={this.handleUpdateInput.bind(this)}/>
                /*<TableRow>
                    <TableRowColumn>{day.day}</TableRowColumn>
                    <TableRowColumn>{this.state.project}</TableRowColumn>
                    <TableRowColumn>8</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn> <AutoComplete
                        onUpdateInput={this.handleUpdateInput.bind(this, day)}
                        searchText={day.offReason}
                        filter={AutoComplete.noFilter}
                        openOnFocus={true}
                        dataSource={dataSource}
                    /></TableRowColumn>
                </TableRow>
                    */
            )
        }
        return (
            <MuiThemeProvider>
                <div>
                    <TextField floatingLabelText="Projekt" defaultValue={this.state.project}
                               onChange={this.handleProjectInput.bind(this)}/>
                    <h3 className="times pull-right">Last Update Time: {this.state.time}</h3>
                    <Table adjustForCheckbox={false}>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style="align:center">Dzien</TableHeaderColumn>
                                <TableHeaderColumn>Projekt</TableHeaderColumn>
                                <TableHeaderColumn>Czas pracy</TableHeaderColumn>
                                <TableHeaderColumn>Czas nieobecnosci</TableHeaderColumn>
                                <TableHeaderColumn>Przyczyna nieobecnosci</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}
                                   adjustForCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }

    componentDidMount() {
        this.props.router.updatePageLinks();
    }

}

About.propTypes = {
    label: PropTypes.string.isRequired,
    onValChange: PropTypes.func.isRequired
};

