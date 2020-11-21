const { Component } = wp.element;
class Map extends Component {
  // this component just use in Edit
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    } 
    onScriptLoad() {
        const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
        this.props.onMapLoad(map)
    }

    // componentDidUpdate() {        
    componentDidMount() {        
      // console.log('componentDidUpdate()')
      if (!window.google) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(script, x);
        script.addEventListener('load', e => {
          this.onScriptLoad();
        })
      } 
      // else {
      //   this.onScriptLoad()
      // }
    }

    componentDidUpdate(prevProps) {
      this.onScriptLoad();
    }

    render() {
      // window._wpLoadBlockEditor.then( function() {
      //     // console.log( 'hooray!' );
      //     this.onScriptLoad();
      // });
      // console.log(this.props.options);
        return (
          <div style={{  height: this.props.height }} id={this.props.id} />
        );
      }
  }
  export default Map
