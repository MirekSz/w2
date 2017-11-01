import React from 'react';
export function Title(props) {
      return (<h2>{props.children}</h2>)
}
export default class Card extends React.Component {
      constructor(props) {
            super(props);
      }

      getTitle() {
            var result = this.props.children.filter((comp) => {
                  return comp.type.name === 'Title';
            });
            return result.length > 0 ? result : null;
      }
      getComponent(key) {
            var result = this.props.children.filter((comp) => {
                  return comp.key === key;
            });
            return result.length > 0 ? result : key;
      }
      render() {
            return (<div>
                  {this.getTitle()}
                  <h3>{this.getComponent('header')}</h3>
                  <h3>{this.getComponent('content')}</h3>
                  <h3>{this.getComponent('footer')}</h3>
            </div>);
      }
}