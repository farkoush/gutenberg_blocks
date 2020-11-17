if (document.getElementById("map")){
    console.log('mainnnn.js');

}

    ready(() => {
        const containers = document.querySelectorAll("#map");
        const containersArray = Array.prototype.slice.call(containers);
    
        containersArray.forEach((element) => {
            console.log(containersArray);
            const reactProps = JSON.parse(element.dataset.reactProps);
            console.log('reactProps::' + reactProps.lat);
            // ReactDOM.render(
            //     <Canvas {...reactProps} viewMode={true}/>,
            //     element
            // )
            if (!window.google) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://maps.google.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g`;
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(script, x);
            }
            script.addEventListener('load', e => {
                const uluru = { lat: reactProps.lat, lng: reactProps.lng };
                // const map = new window.google.maps.Map(document.getElementById("map"), {
                const map = new window.google.maps.Map(element, {
                zoom: reactProps.zoom,
                center: uluru,
                
                });
                const marker = new google.maps.Marker({
                    position: uluru,
                    map,
                    title: "Uluru (Ayers Rock)",
                });
            })
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

  

//   function map_details(){
//     const uluru = { lat: -25.363, lng: 131.044 };
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: uluru,
//     });
//   }