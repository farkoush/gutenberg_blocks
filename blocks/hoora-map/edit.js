const { __ } = wp.i18n;
const { Component } = wp.element;
const { SelectControl } = wp.components;
import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Edit extends Component {
    // const defaultProps = {
    //   center: {
    //     lat: 59.95,
    //     lng: 30.33
    //   },
    //   zoom: 11
    // };
   
    render() {
        const { attributes, className, setAttributes  } = this.props;
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            // bootstrapURLKeys={{ key: 'AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g'}}
            bootstrapURLKeys={{ key: 'AIzaSyAjyDspiPfzEfjRSS5fQzm-3jHFjHxeXB4'}}
            defaultCenter={attributes.center}
            defaultZoom={attributes.zoom}
          >
            {console.log(attributes.center[0].lat)}
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default Edit;