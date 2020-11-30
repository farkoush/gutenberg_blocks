const { Component } = wp.element;
import './editor.scss';

class Item extends Component {
  // this component just use in Edit
    constructor(props) {
        super(props);
        // this.onScriptLoad = this.onScriptLoad.bind(this)
    } 
    // onScriptLoad() {
    //     const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
    //     this.props.onMapLoad(map)
    // }

    // componentDidUpdate() {        
    componentDidMount() {        
      // console.log('componentDidUpdate()')
    //   if (window.accordion) {
        var acc = document.getElementsByClassName("accordion");
        var i;
        console.log("accccccccccccccc", acc);
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
      // else {
      //   this.onScriptLoad()
      // }
    }


    render() {
      // window._wpLoadBlockEditor.then( function() {
      //     // console.log( 'hooray!' );
      //     this.onScriptLoad();
      // });
      // console.log(this.props.options);
        return (
          <div>

            <h2>Animated Accordion</h2>
            <p>Click on the buttons to open the collapsible content.</p>

            <button class="accordion">Section 1</button>
            <div class="panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            </div>

            <button class="accordion">Section 2</button>
            <div class="panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <button class="accordion">Section 3</button>
            <div class="panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        );
      }
  }
  export default Item
