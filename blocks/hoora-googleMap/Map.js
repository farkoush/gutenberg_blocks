const { Component } = wp.element;

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
      } 
    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        this.props.onMapLoad(map)
    }
    // componentDidMount() {
    //   const map = new window.google.maps.Map(document.getElementById('map'), {
    //     center: { lat: 41.0082, lng: 28.9784 },
    //     zoom: 8
    //   });
    // }
    componentDidMount() {
        if (!window.google) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
          // Below is important. 
          //We cannot access google.maps until it's finished loading
          s.addEventListener('load', e => {
            this.onScriptLoad()
          })
        } else {
          this.onScriptLoad()
        }
      }
  
    // render() {
    //   return (
    //     <div style={{ width: 500, height: 500 }} id="map" />
    //   );
    // }
    render() {
        return (
          <div style={{  height: 500 }} id={this.props.id} />
        );
      }
  }
  export default Map
