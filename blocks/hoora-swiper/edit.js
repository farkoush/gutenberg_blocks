/**
 * WordPress Dependencies.
 */
// import { InnerBlocks } from '@wordpress/block-editor';
const {
	InnerBlocks,
} = wp.editor;
import { blockColumns } from './templates';
const {  TabPanel } = wp.components;

const INNER_BLOCKS_TEMPLATE = [
	[
		'core/group',
		{
			className: 'hoora-swiper__group',
			backgroundColor: 'pale-cyan-blue',
		},
		blockColumns,
	],
];

const ALLOWED_BLOCKS = [ 'core/group' ];

/**
 * Edit function.
 *
 * @return {Object} Content.
 */
const Edit = () => {
	const onSelect = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
	};
	return (
		<div>
			<TabPanel className="my-tab-panel"
					activeClass="active-tab"
					onSelect={ onSelect }
					tabs={ [
						{
							name: 'tab1',
							title: 'Tab 1',
							className: 'tab-one',
						},
						{
							name: 'tab2',
							title: 'Tab 2',
							className: 'tab-two',
						},
					] }>
					{
						// ( tab ) => <p>{ tab.title }</p>
						(tab) => 
						<div>
							<p>{ tab.title }</p>
							<InnerBlocks
								template={ INNER_BLOCKS_TEMPLATE }
								allowedBlocks={ ALLOWED_BLOCKS }
								templateLock={ true }
							/>
						</div>			
					}
				</TabPanel>
		</div>
	);
};

export default Edit;
