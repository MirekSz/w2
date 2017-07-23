import React from 'react';

export default class Card extends React.Component {
      constructor(props) {
            super(props);
      }
      getComponent(key) {
            var result = this.props.children.filter((comp) => {
                  return comp.key === key;
            });
            return result.length > 0 ? result : key;
      }
      render() {
            return (<div>
                  <h3>{this.getComponent('header')}</h3>
                  <h3>{this.getComponent('content')}</h3>
                  <h3>{this.getComponent('footer')}</h3>
            </div>);
      }
}