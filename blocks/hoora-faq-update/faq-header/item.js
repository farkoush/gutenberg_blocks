const { Component } = wp.element;
import './editor.scss';

class Item extends Component {
  // this component just use in Edit
    constructor(props) {
        super(props);
    }     


    render() {
        return (
          <div>
            <button class="accordion">{this.props.header}</button>
            <div class="panel">
              <p>{this.props.body}</p>
            </div>
          </div>
        );
      }
  }
  export default Item
