import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';
import About from './About.jsx';
import * as emiter from 'event-emitter';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Navigo from 'navigo';
import App from './App.css'

injectTapEventPlugin();
let ee = emiter();
setTimeout(() => {
    ee.emit('addItem', 5)
}, 2000);

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [1, 2]};
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
                <div>
                    <Ife val={2 > 1}>children content</Ife>
                    <ShoppingList {...this.state} />
                </div>
            </MuiThemeProvider>
        );
    }
}


function Square(props) {
    return (<h2>Hello, {props.name}</h2>);
}

function Ife(props) {
    if (props.val === true) {
        return (<h1>{props.children}</h1>);
    }
    return null;
}

class ShoppingList extends React.Component {
    add() {
        ee.emit('addItem', this.refs._input.getValue())
    }

    render() {
        var items = this.props.items.map((i) => {
            return (<Square key={i} name={i}/>);
        });
        var items2 = this.props.items.map((i) => {
            return (<ListItem key={i}><h3>{i}</h3></ListItem>);
        });
        return (
            <div className="shopping-list">
                <TextField defaultValue="Item text" ref="_input"/>
                <RaisedButton label="Add" primary="true" onClick={this.add.bind(this)}/>
                <br/>
                <Badge badgeContent={items2.length} primary={true}>
                    <NotificationsIcon/>
                </Badge>
                <h1>Shopping List for</h1>
                <div className="col-xs-6">
                    <List>{items2}</List>
                </div>
                <div className="col-xs-6">
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}


var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
//as
export default function render(where) {

    router.hooks({
        before: (done, params) => {
            ReactDOM.unmountComponentAtNode($("#app")[0])
            done();
        },
        after: (params) => {

        }
    });

    $(where[0]).append(`<a class="btn btn-default" href="about" data-navigo>About</a>
                        <a class="btn btn-default" href="app" data-navigo>App</a>
                        <a class="btn btn-default" href="form" data-navigo>Form</a>
                        <br/><br/>
                        <div style="margin:10px">
                        <div class="panel panel-default">
                        <div class="panel-heading">Panel</div>
                        <div class="panel-body">
                            <div id="app">
                            </div>
                        </div>
                        </div>
                        </div>`);
    router.updatePageLinks();
    router
        .on('/app', function () {
            ReactDOM.render(<AppContainer/>, $("#app")[0])
        }).on('/about', function () {
        ReactDOM.render(<About router={router}/>, $("#app")[0])
    }).on('/about/subabout', function () {
        ReactDOM.render(<About sub="true" router={router}/>, $("#app")[0])
    }).on('/form', function () {
        ReactDOM.render(<Form/>, $("#app")[0])
    }).on(function () {
    }).resolve();
}


