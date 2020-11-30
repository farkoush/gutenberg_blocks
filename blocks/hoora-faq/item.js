const { Component } = wp.element;
import './editor.scss';

class Item extends Component {
  // this component just use in Edit
    constructor(props) {
        super(props);
    }     
    componentDidMount() {        
      // console.log('componentDidUpdate()')
    //   if (window.accordion) {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });
        }
    //   } 
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
