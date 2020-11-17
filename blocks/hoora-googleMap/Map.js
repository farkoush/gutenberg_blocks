const { Component } = wp.element;

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
      } 
    onScriptLoad() {
        const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
        this.props.onMapLoad(map)
    }
    // componentDidMount() {
    //   const map = new window.google.maps.Map(document.getElementById('map'), {
    //     center: { lat: 41.0082, lng: 28.9784 },
    //     zoom: 8
    //   });
    // }
    componentDidMount() {
        // console.log('componentDidMount')
        if (!window.google) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(script, x);
          // Below is important. 
          //We cannot access google.maps until it's finished loading
          script.addEventListener('load', e => {
            this.onScriptLoad()
          })
        } 
        else {
          this.onScriptLoad()
        }
      }
  
    render() {
    //   ready(() => {
    //     this.onScriptLoad()
    //   });
    
    // // Thank you http://youmightnotneedjquery.com/
    // function ready(fn) {
    //     if (
    //         document.attachEvent
    //             ? document.readyState === "complete"
    //             : document.readyState !== "loading"
    //     ) {
    //         fn();
    //     } else {
    //         document.addEventListener("DOMContentLoaded", fn);
    //     }
    // }
      console.log(this.props.options);
        return (
          <div style={{  height: this.props.height }} id={this.props.id} />
        );
      }
  }
  export default Map
