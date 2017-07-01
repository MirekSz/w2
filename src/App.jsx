import React from 'react';
import ReactDOM from 'react-dom';
import * as emiter from 'event-emitter';
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
        return (
            <div >
                <ShoppingList {...this.state}/>
            </div>
        );
    }
}
class ShoppingList extends React.Component {
    add() {
        ee.emit('addItem', null)
    }

    render() {
        var items = this.props.items.map((i) => {
            return (<li key={i}>{i}</li>);
        });
        return (
            <div className="shopping-list">
                <button onClick={this.add}>Add</button>
                <h1>Shopping List for</h1>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}


export default function render(where) {
    ReactDOM.render(<AppContainer/>, $(where)[0])
}
