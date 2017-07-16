import React from 'react';
import {
      Table,
      TableBody,
      TableHeader,
      TableHeaderColumn,
      TableRow,
      TableRowColumn,
} from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const dataSource2 = ['Urlop', 'Święto', 'Opieka', 'Chorobowe'];
export default class About extends React.Component {
      constructor(props) {
            super(props);
            this.state = { value: '' }
      }
      handleUpdateInput(value) {
            debugger
            this.setState({
                  value: value
            });
      };
      render() {
            // return (
            //       <div>about {this.props.sub} <a className="btn btn-success" href="about/subabout" data-navigo>subabout</a>
            //       </div>)

            var rows = [];
            for (var i = 0; i <= 31; i++) {
                  rows.push(<TableRow>
                        <TableRowColumn>{i}</TableRowColumn>
                        <TableRowColumn>Next VERTO</TableRowColumn>
                        <TableRowColumn>8</TableRowColumn>
                        <TableRowColumn>0</TableRowColumn>
                        <TableRowColumn> <AutoComplete
                              filter={AutoComplete.noFilter} searchText={this.state.value}
                              onUpdateInput={this.handleUpdateInput}
                              openOnFocus={true}
                              dataSource={dataSource2}
                        /></TableRowColumn>
                  </TableRow>)
            }
            return (
                  <MuiThemeProvider>
                        <div>
                              <Table adjustForCheckbox={false}>
                                    <TableHeader>
                                          <TableRow>
                                                <TableHeaderColumn>Dzien</TableHeaderColumn>
                                                <TableHeaderColumn>Projekt</TableHeaderColumn>
                                                <TableHeaderColumn>Czas pracy</TableHeaderColumn>
                                                <TableHeaderColumn>Czas nieobecnosci</TableHeaderColumn>
                                                <TableHeaderColumn>Przyczyna nieobecnosci</TableHeaderColumn>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} displaySelectAll={false}
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