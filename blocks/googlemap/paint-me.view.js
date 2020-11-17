// import React from 'react';
// import ReactDOM from 'react-dom';

// // import Canvas from './components/Canvas';
// import Map2 from './map'


// ready(() => {
//     const containers = document.querySelectorAll(".wp-block-hoora-google-map2");
//     const containersArray = Array.prototype.slice.call(containers);

//     containersArray.forEach((element) => {

//         const reactProps = JSON.parse(element.dataset.reactProps);
//         console.log(reactProps);
//         ReactDOM.render(
//             <Map2 {...reactProps} viewMode={true}/>,
//             element
//         )
//     })
// });

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

console.log('main.js');

// import { map } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

// import Canvas from './components/Canvas';
// import Map2 from './map'


ready(() => {
    const containers = document.querySelectorAll(".wp-block-hoora-google-map2");
    const containersArray = Array.prototype.slice.call(containers);
    console.log('containers' + containers);
    containersArray.forEach((elementt) => {

        const reactProps = JSON.parse(element.dataset.reactProps);
        const element = <h1>Hello, world</h1>;
        console.log('map:::' + document.getElementById('map'));
ReactDOM.render(element, document.getElementById('map'));
        // ReactDOM.render(
        //     <p>testtttttttttttt</p>,
        //     element
        // )
        // ReactDOM.render(
        //     google_map(),
        //     // <Map2 {...reactProps} viewMode={true}/>,
        //     element
        // )
    })
});

// Thank you http://youmightnotneedjquery.com/
function ready(fn) {
    if (
        document.attachEvent
            ? document.readyState === "complete"
            : document.readyState !== "loading"
    ) {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


function google_map(){
if (!window.google) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(script, x);
    // Below is important. 
    //We cannot access google.maps until it's finished loading
    script.addEventListener('load', e => {
        // const map = new window.google.maps.Map( document.getElementById(this.props.id), this.props.options);
        const uluru = { lat: -25.363, lng: 131.044 };
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: uluru,
        });
        // this.props.onMapLoad(map)
    })
  } else {
    const uluru = { lat: -25.363, lng: 131.044 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
  }
  return map;
}
