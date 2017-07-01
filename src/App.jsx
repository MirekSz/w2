import React from 'react';
import ReactDOM from 'react-dom';
import * as emiter from 'event-emitter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
let ee = emiter();
setTimeout(() => {
    ee.emit('addItem', 5)
}, 2000);
class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [1, 2] };
    }

    componentDidMount() {
        ee.on('addItem', (item) => {
            let state = this.state;
            if (!item) {
                item = state.items.length;
            }
            state.items.push(item);
            this.setState(state);
        })
    }

    render() {
        return (<MuiThemeProvider>
            <div >
                <ShoppingList {...this.state} />
            </div>
        </MuiThemeProvider>
        );
    }
}


function Square(props) {
    return (<h2>Hello, {props.name}</h2>);
}


class ShoppingList extends React.Component {
    add() {
        ee.emit('addItem', this.refs._input.getValue())
    }

    render() {
        var items = this.props.items.map((i) => {
            return (<Square key={i} name={i} />);
        });
        var items2 = this.props.items.map((i) => {
            return (<ListItem key={i}><h3>{i}</h3></ListItem>);
        });
        return (
            <div className="shopping-list">
                <TextField defaultValue="Item text" ref="_input" />
                <RaisedButton label="Add" primary="true" onClick={this.add.bind(this)} />
                <br />
                <Badge badgeContent={items2.length} primary={true} >
                    <NotificationsIcon />
                </Badge>
                <List>{items2}</List>
                <h1>Shopping List for</h1>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}



export default function render(where) {
    ReactDOM.render(<AppContainer />, $(where)[0])
}
