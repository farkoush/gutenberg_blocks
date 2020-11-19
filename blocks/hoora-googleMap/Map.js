const { Component } = wp.element;
// this component just use in Edit
class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
      } 
    onScriptLoad() {
        const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
        this.props.onMapLoad(map)
    }
    componentDidMount() {
        console.log('componentDidMount')
    //     if (!window.google) {
    //       var script = document.createElement('script');
    //       script.type = 'text/javascript';
    //       script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
    //       var x = document.getElementsByTagName('script')[0];
    //       x.parentNode.insertBefore(script, x);
    //       // Below is important. 
    //       //We cannot access google.maps until it's finished loading
    //       script.addEventListener('load', e => {
    //         this.onScriptLoad();
    //       })
    //     } 
    //     else {
    //       this.onScriptLoad()
    //     }
      }


    componentDidUpdate() {        
      console.log('componentDidUpdate()')
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
      else {
        this.onScriptLoad()
      }
    }
  
     


    render() {
      window._wpLoadBlockEditor.then( function() {
          console.log( 'hooray!' );
      });
      // console.log(this.props.options);
        return (
          <div style={{  height: this.props.height }} id={this.props.id} />
        );
      }
  }
  export default Map
