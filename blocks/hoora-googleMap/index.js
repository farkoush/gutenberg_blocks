/**
 * Block dependencies
 */
// import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl, PanelBody,RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

/**
 * Register example block
 */
export default registerBlockType(
	'hoora/google-map',
	{
		title: 'Google Map Block',
		description: 'An advanced Gutenberg Block that allows you to build an interactive Google Map.',
		category: 'common',
		icon: 'location-alt',
		attributes: {
			text: {
				type: 'string',
				// default:''
				source: 'meta',
				meta: 'googlemapblock_gb_googlemap',
			},
			center: {
                type: "array",
                default:[
                    {
                        // lat: 59.95,
                        // lng: 30.33
                        lat: 23.7806365,
                        lng: 90.4193257,
                        // title: "Bangladesh",
                        // content: "A Beautiful Country",
                        // iconType: "default",
                        // customIconUrl: "",
                        // customIconWidth: 25,
                        // customIconHeight: 40,
                    }
                ]
			},
			address: {
                type: 'string',
                default: 'Theater District, New York, USA',
            }, 
			zoom: {
                type: 'number',
                default: '11',
            },
            height: {
                type: 'number',
                default: '300',
            }
		},
		edit: props => {
			const { attributes, className, setAttributes, isSelected } = props;
			console.log("fffffffffff");
			return [
				isSelected && (
					<InspectorControls>
						<PanelBody>
							<TextControl
								label= 'Google Map Block' 
								value={ attributes.text }
								onChange={ text => setAttributes( { text } ) }
							/>
						</PanelBody>
						<PanelBody>
							<TextControl
								label= 'address '
								value= { attributes.address }
								onChange={ address => setAttributes( { address } ) }
							/>
						</PanelBody>
						
						<PanelBody>
							<RangeControl
								beforeIcon="arrow-left-alt2"
								afterIcon="arrow-right-alt2"
								label= 'zoom'
								value={ attributes.zoom }
								onChange={ zoom => setAttributes( { zoom } ) }
								min={ 1 }
								max={ 21 }
							/>
						</PanelBody>

						<PanelBody>
							<RangeControl
								beforeIcon="arrow-left-alt2"
								afterIcon="arrow-right-alt2"
								label= 'height'
								value={ attributes.height }
								onChange={ height => setAttributes( { height } ) }
								min={ 50 }
								max={ 1000 }
							/>
						</PanelBody>
					</InspectorControls>
				),
				<div className={ className } >
					<div id="map">'Check the meta yo!' </div>
					{/* <iframe width="600" height="450" frameborder="0" style="border:0" src={"https://www.google.com/maps/embed/v1/place?q=" + encodeURIComponent(attributes.address) + "&key='AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g"}></iframe> */}
    {/* return <div class="wp-block-webfactory-map"><iframe width='100%' height={parseInt(attributes.height, 10) + 'px'} src={'https://www.google.com/maps/embed/v1/place?q=' + encodeURIComponent(attributes.address) + '&maptype=roadmap&zoom=' + parseInt(attributes.zoom, 10) + '&key=' + attributes.api_key} frameBorder='0'></iframe></div> */}

				</div>
			];
		},
		save: () => {
			return (
				<p>'Check the meta' </p>
			);
		},
	},
);
