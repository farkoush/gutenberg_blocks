wp.domReady( function() {
	wp.blocks.registerBlockVariation(
		'hoora/column',
		{
			name: 'faq-column',
			title: 'FAQ Column',
			icon:'heart',
			// attributes: {
			// 	align: 'full'
			// },
			innerBlocks: [
				[ 'core/heading', {className:'accordion',placeholder: 'FAQ header'} ],
				[ 'hoora/section', {className: 'panel'}]
		],
			// isDefault: true
		}
	);
} );