import icons from '../icons';
// import times from 'lodash/times';
// import map from 'lodash/map';
import classnames from 'classnames';
// import memoize from 'memize';
// import filter from 'lodash/filter';
// import KadenceColorOutput from '../kadence-color-output';
/**
 * Import Css
 */
import './editor.scss';
const {
	createBlock,
} = wp.blocks;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;
const {
	Component,
	Fragment,
} = wp.element;
const {
	InnerBlocks,
	InspectorControls,
	RichText,
} = wp.blockEditor;
const {
	Button,
	ButtonGroup,
	IconButton,
	Dashicon,
} = wp.components;
/**
 * Internal block libraries
 */
const { __, sprintf } = wp.i18n;

const ALLOWED_BLOCKS = [ 'hoora/tab' ];
// const getPanesTemplate = memoize( ( panes ) => {
// 	return times( panes, n => [ 'hoora/tab', { id: n + 1 } ] );
// } );

const kttabsUniqueIDs = [];
class KadenceTabs extends Component {
	constructor() {
		super( ...arguments );
		// this.state = {
		// 	showPreset: false,
		// 	// : {},
		// };
	}
	
	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			if ( this.props.attributes.showPresets ) {
				this.setState( { showPreset: true } );
			}
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kttabsUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else if ( kttabsUniqueIDs.includes( this.props.attributes.uniqueID ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kttabsUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else {
			kttabsUniqueIDs.push( this.props.attributes.uniqueID );
		}
	}
	// saveArrayUpdate( value, index ) {
	// 	const { attributes, setAttributes } = this.props;
	// 	const { titles } = attributes;

	// 	const newItems = titles.map( ( item, thisIndex ) => {
	// 		if ( index === thisIndex ) {
	// 			item = { ...item, ...value };
	// 		}
	// 		return item;
	// 	} );
	// 	setAttributes( {
	// 		titles: newItems,
	// 	} );
	// }
	render() {
		const { attributes: { uniqueID, tabCount, currentTab, layout, titles , startTab, enableSubtitle, tabWidth, widthType }, clientId, className, setAttributes } = this.props;
		const handleAddItem = () => {
			const newBlock = createBlock( 'hoora/tab', { id: tabCount + 1, activeTab : 1 + i === currentTab ? true : false } );
			setAttributes( { tabCount: tabCount + 1 } );
			this.props.insertTab( newBlock );
			//wp.data.dispatch( 'core/block-editor' ).insertBlock( newBlock, clientId );
			const newtabs = titles;
			newtabs.push( {
				text: sprintf( __( 'Tab %d' ), tabCount + 1 ),
				// icon: titles[ 0 ].icon,
				// iconSide: titles[ 0 ].iconSide,
				// onlyIcon: titles[ 0 ].onlyIcon,
				// subText: '',
			} );
			setAttributes( { titles: newtabs } );
		};

		const saveArrayUpdate = ( value, index ) => {
			const newItems = titles.map( ( item, thisIndex ) => {
				if ( index === thisIndex ) { item = { ...item, ...value } }
				return item;
			} );
			setAttributes( { titles: newItems } );
		}
		const layoutClass = ( ! layout ? 'tabs' : layout );
		const classes = classnames( className, `kt-tabs-wrap kt-tabs-id${ uniqueID } kt-tabs-has-${ tabCount }-tabs kt-active-tab-${ currentTab } kt-tabs-layout-${ layoutClass }` );
		// const getPanesTemplate = (tabCount) => Array.from({length:tabCount},(_,i)=> [ 'hoora/tab', { id: i + 1 } ]);
		const renderTitles = ( index ) => { 
			return (
				<Fragment>
					<li className={ `kt-title-item kt-title-item-${ index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tabs-has-icon-${ ( titles[ index ] && titles[ index ].icon ? 'true' : 'false' ) } kt-tab-title-${ ( 1 + index === currentTab ? 'active' : 'inactive' ) }${ ( enableSubtitle ? ' kb-tabs-have-subtitle' : '' ) }` }>
					{/* <li className={ `kt-title-item kt-title-item-${ index }  kt-tab-title-${ ( 1 + index === currentTab ? 'active' : 'inactive' ) }` }> */}
						<div className={ `kt-tab-title kt-tab-title-${ 1 + index }` }
							 onClick={ () => setAttributes( { currentTab: 1 + index } ) } 
							 onKeyPress={ () => setAttributes( { currentTab: 1 + index } ) } 
							 tabIndex="0" role="button">
							{ ( undefined === enableSubtitle || ! enableSubtitle ) && (
								<RichText
									tagName="div"
									placeholder={ __( 'Tab Title' ) }
									value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : '' ) }
									unstableOnFocus={ () => setAttributes( { currentTab: 1 + index } ) }
									onChange={ value => {
										saveArrayUpdate( { text: value }, index );
									} }
									formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
									allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
									className={ 'kt-title-text' }
									keepPlaceholderOnFocus
								/>
							) }
						</div>
						<div className="kadence-blocks-tab-item__control-menu">
							{ tabCount > 1 && (
								<IconButton
									icon="no-alt"
									onClick={ () => {
										const removeClientId = this.props.tabsBlock.innerBlocks[ index ].clientId;
										// const currentItems = filter( this.props.attributes.titles, ( item, i ) => index !== i );
										const currentItems = this.props.attributes.titles.filter( (item,i ) => index !== i );
										const newCount = tabCount - 1;
										let newStartTab;
										if ( startTab === ( index + 1 ) ) {
											newStartTab = '';
										} else if ( startTab > ( index + 1 ) ) {
											newStartTab = startTab - 1;
										} else {
											newStartTab = startTab;
										}
										setAttributes( { titles: currentItems, tabCount: newCount, currentTab: ( index === 0 ? 1 : index ), startTab: newStartTab } );
										this.props.removeTab( removeClientId );
										this.props.resetOrder();
									} }
									className="kadence-blocks-tab-item__remove"
									label={ __( 'Remove Item' ) }
									// disabled={ ! currentTab === ( index + 1 ) }
								/>
							) }
						</div>
					</li>
				</Fragment>
			);
		};
		const renderPreviewArray = (
			<Fragment>
				{Array.from({length:tabCount},(_,n)=> renderTitles( n ))}
				{/* { times( tabCount, n => renderTitles( n ) ) } */}
			</Fragment>
		);
		return (
			<Fragment>
				<div className={ classes } >
						<div className="kt-tabs-wrap" >
							<div className="kb-add-new-tab-contain">
								<Button
									className="kt-tab-add"
									isPrimary={ true }
									onClick = {handleAddItem}
								>
									<Dashicon icon="plus" />
									{ __( 'Add Tab' ) }
								</Button>
							</div>
							<ul className={ `kt-tabs-title-list${ ( 'tabs' === layout && widthType === 'percent' ? ' kb-tabs-list-columns kb-tab-title-columns-' + tabWidth[ 0 ] : '' ) }` }>
							{/* <ul> */}
								{ renderPreviewArray }
							</ul>
							<div className="kt-tabs-content-wrap">
								
								<InnerBlocks
									// template={ getPanesTemplate( tabCount ) }
									template = {Array.from({length:tabCount},(_,i)=> [ 'hoora/tab', { id: i + 1,  activeTab : 1 + i === currentTab ? true : false } ])}
									templateLock={ false }
									allowedBlocks={ ALLOWED_BLOCKS } 
								/>
							</div>
						</div>
				</div>
			</Fragment>
		);
	}
}
export default compose( [
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const {
			getBlock,
			getBlockOrder,
		} = select( 'core/block-editor' );
		const block = getBlock( clientId );
		return {
			tabsBlock: block,
			realTabsCount: block.innerBlocks.length,
			tabsInner: getBlockOrder( clientId ),
		};
	} ),
	withDispatch( ( dispatch, { clientId }, { select } ) => {
		const {
			getBlock,
		} = select( 'core/block-editor' );
		const {
			moveBlockToPosition,
			removeBlock,
			updateBlockAttributes,
			insertBlock,
		} = dispatch( 'core/block-editor' );
		const block = getBlock( clientId );
		return {
			resetOrder() {
				Array.from({length:block.innerBlocks.length},(_,n)=> {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						id: n + 1,
					} );
				})
			},
			// resetOrder() {
			// 	times( block.innerBlocks.length, n => {
			// 		updateBlockAttributes( block.innerBlocks[ n ].clientId, {
			// 			id: n + 1,
			// 		} );
			// 	} );
			// },
			moveTab( tabId, newIndex ) {
				moveBlockToPosition( tabId, clientId, clientId, parseInt( newIndex ) );
			},
			insertTab( newBlock ) {
				insertBlock( newBlock, parseInt( block.innerBlocks.length ), clientId );
			},
			removeTab( tabId ) {
				removeBlock( tabId );
			},
		};
	} ),
] )( KadenceTabs );
