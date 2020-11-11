import Edit from "./edit";

const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    RichText,
} = wp.editor;

/**
 * Register static block example block
 */
export default registerBlockType(
    'hoora/map2',
    {
        title: 'hoora map2',
        description: 'hoora map2',
        category: 'common',        
        icon: 'heart',         
        attributes: {
            zoom: {
                type: 'number',
                default: '11',
            },
            height: {
                type: 'number',
                default: '300',
            },
            address: {
                type: 'string',
                default: 'Theater District, New York, USA',
            },    
            map_id: {
                type: "string",
            },
            
            center: {
                type: "array",
                default:[
                    {
                        // lat: 59.95,
                        // lng: 30.33
                        lat: 23.7806365,
                        lng: 90.4193257,
                        title: "Bangladesh",
                        content: "A Beautiful Country",
                        iconType: "default",
                        customIconUrl: "",
                        customIconWidth: 25,
                        customIconHeight: 40,
                    }
                ]
            },
        },
        // edit: () => {return (<div>hoora mappppp</div>)},
        edit:Edit,
        // edit,
        save: () => {
            return (<div>hoora mappppp</div>);
        },
    },
);


// public function view_simple($args, $instance){
//     ?>
//     <div id="map" class="<?php echo $instance['map-height']; ?> shadow" style=" width: 100%;"></div>
//     <script>
//     function initMap() {
//         var uluru = {lat: -25.363, lng: 131.044};
//         var map = new google.maps.Map(document.getElementById('map'), {
//             scrollwheel: false,
//             zoom: <?php echo $instance['zoom'] ?>,
//             center: {lat: <?php echo $instance['center_latitude'] ?>, lng: <?php echo $instance['center_longitude'] ?>},
//         });
//         <?php foreach ($instance['locations'] as $key => $location):?>
//         var marker = new google.maps.Marker({
//             position: {lat: <?php echo $location['location_latitude']; ?>, lng: <?php echo $location['location_longitude']; ?>},
//             map: map,
//             title: 'test',
//             <?php if (!empty(trim($location['location_image'])))
//                 echo 'icon: "' . wp_get_attachment_image_src( $location['location_image'], 'small')[0] . '",';?>
//         });
//         <?php endforeach; ?>
//     }
//     </script>
//     <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g&callback=initMap"></script>
//     <?php
// }