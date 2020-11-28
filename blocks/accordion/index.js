/**
 * Block dependencies
 */
// import Edit from "./edit";
// import Save from "./save";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register example block
 */
export default registerBlockType(
	'hoora/accordion',
	{
		title: 'hoora accordion',
		description: 'hoora accordion',
		category: 'common',
		icon: 'heart',
		attributes: {
			lat: {
				type: 'number',
				default: 35.700700
			},
		},
		edit: () =>{
			return (
				<div>Edit</div>
			)
		},
		// save() {
		// 	return null;
		// },
		// save:Save,
		save: () => {
			return (
				<div>save</div>
			);
		},
	},
);
