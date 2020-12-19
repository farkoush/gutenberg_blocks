/**
 * WordPress dependencies
 */
const { TabPanel } = wp.components;
const { __ } = wp.i18n;

const blocksTab = {
	name: 'blocks',
	/* translators: Blocks tab title in the block inserter. */
	title: __( 'Blocks' ),
};
const patternsTab = {
	name: 'patterns',
	/* translators: Patterns tab title in the block inserter. */
	title: __( 'Patterns' ),
};
const reusableBlocksTab = {
	name: 'reusable',
	/* translators: Reusable blocks tab title in the block inserter. */
	title: __( 'Reusable' ),
};

function Edit( {
	children,
	showPatterns = false,
	showReusableBlocks = false,
	onSelect,
} ) {
	const tabs = [ blocksTab ];

    
     const t =   {
            name: 'tab1',
            title: 'Tab 1',
            className: 'tab-one',
        };
        // {
        //     name: 'tab2',
        //     title: 'Tab 2',
        //     className: 'tab-two',
        // },
    

	if ( showPatterns ) {
        tabs.push( patternsTab );
        tabs.push(t)
	}
	// if ( showReusableBlocks ) {
	// 	tabs.push( reusableBlocksTab );
	// }

	return (
		<TabPanel
			className="block-editor-inserter__tabs"
			tabs={ tabs }
			onSelect={ onSelect }
		>
			{ children }
		</TabPanel>
	);
}

export default Edit;