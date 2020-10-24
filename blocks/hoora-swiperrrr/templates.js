/**
 *  Get Block Column.
 *
 * @param {String} optionVal Option
 * @param {String} colClassName ClassName
 * @param {String} heading Heading
 * @return {Array} Block column.
 */
const getBlockColumn = ( optionVal, colClassName, heading ) => {
	return [
		'core/column',
		{ className: colClassName },
		[
			[
                // 'aquila-blocks/heading',
                'hoora/card',
				{
					className: 'hoora-swiper__heading',
					option: optionVal,
					content: `<strong><span>${ heading }</span></strong>`,
				},
			],
			[ 'core/list', { className: 'hoora-swiper__list' } ],
		],
	];
};

export const blockColumns = [
	[
		'core/columns',
		{
			className: 'hoora-swiper__cols',
		},
		[
			getBlockColumn( 'dos', 'hoora-swiper__col-one', 'Dos' ),
			getBlockColumn(
				'donts',
				'hoora-swiper__col-two',
				"Dont's"
			),
		],
	],
];
