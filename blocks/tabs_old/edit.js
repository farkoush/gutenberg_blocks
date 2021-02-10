import icons from '../icons';
import times from 'lodash/times';
// import map from 'lodash/map';
import classnames from 'classnames';
import memoize from 'memize';
import filter from 'lodash/filter';
import KadenceColorOutput from '../kadence-color-output';
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
const getPanesTemplate = memoize( ( panes ) => {
	return times( panes, n => [ 'hoora/tab', { id: n + 1 } ] );
} );
const kttabsUniqueIDs = [];
/**
 * Build the row edit
 */
class KadenceTabs extends Component {
	constructor() {
		super( ...arguments );
		// this.showSettings = this.showSettings.bind( this );
		// this.onMoveForward = this.onMoveForward.bind( this );
		// this.onMoveBack = this.onMoveBack.bind( this );
		this.state = {
			// hovered: 'false',
			showPreset: false,
			// settings: {},
		};
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
	saveArrayUpdate( value, index ) {
		const { attributes, setAttributes } = this.props;
		const { titles } = attributes;

		const newItems = titles.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			titles: newItems,
		} );
	}
	// onMove( oldIndex, newIndex ) {
	// 	const titles = [ ...this.props.attributes.titles ];
	// 	titles.splice( newIndex, 1, this.props.attributes.titles[ oldIndex ] );
	// 	titles.splice( oldIndex, 1, this.props.attributes.titles[ newIndex ] );
	// 	this.props.setAttributes( { titles: titles, currentTab: parseInt( newIndex + 1 ) } );
	// 	if ( this.props.attributes.startTab === ( oldIndex + 1 ) ) {
	// 		this.props.setAttributes( { startTab: ( newIndex + 1 ) } );
	// 	} else if ( this.props.attributes.startTab === ( newIndex + 1 ) ) {
	// 		this.props.setAttributes( { startTab: ( oldIndex + 1 ) } );
	// 	}
	// 	this.props.moveTab( this.props.tabsBlock.innerBlocks[ oldIndex ].clientId, newIndex );
	// 	this.props.resetOrder();
	// 	this.props.setAttributes( { currentTab: parseInt( newIndex + 1 ) } );
	// }

	// onMoveForward( oldIndex ) {
	// 	return () => {
	// 		if ( oldIndex === this.props.realTabsCount - 1 ) {
	// 			return;
	// 		}
	// 		this.onMove( oldIndex, oldIndex + 1 );
	// 	};
	// }

	// onMoveBack( oldIndex ) {
	// 	return () => {
	// 		if ( oldIndex === 0 ) {
	// 			return;
	// 		}
	// 		this.onMove( oldIndex, oldIndex - 1 );
	// 	};
	// }
	render() {
		const { attributes: { uniqueID, tabCount, currentTab, layout, innerPadding, minHeight, maxWidth, titles, lineType, lineHeight,titleMargin, iSize, startTab, enableSubtitle,contentBorder, tabWidth, widthType }, clientId, className, setAttributes } = this.props;
		const layoutClass = ( ! layout ? 'tabs' : layout );
		const classes = classnames( className, `kt-tabs-wrap kt-tabs-id${ uniqueID } kt-tabs-has-${ tabCount }-tabs kt-active-tab-${ currentTab } kt-tabs-layout-${ layoutClass }` );
		const renderTitles = ( index ) => {
			return (
				<Fragment>
					<li className={ `kt-title-item kt-title-item-${ index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tabs-has-icon-${ ( titles[ index ] && titles[ index ].icon ? 'true' : 'false' ) } kt-tab-title-${ ( 1 + index === currentTab ? 'active' : 'inactive' ) }${ ( enableSubtitle ? ' kb-tabs-have-subtitle' : '' ) }` } style={ {
						margin: ( titleMargin ? titleMargin[ 0 ] + 'px ' + ( 'tabs' === layout && widthType === 'percent' ? '0px ' : titleMargin[ 1 ] + 'px ' ) + titleMargin[ 2 ] + 'px ' + ( 'tabs' === layout && widthType === 'percent' ? '0px ' : titleMargin[ 3 ] + 'px ' ) : '' ),
					} }>
						<div className={ `kt-tab-title kt-tab-title-${ 1 + index }` }
							 onClick={ () => setAttributes( { currentTab: 1 + index } ) } onKeyPress={ () => setAttributes( { currentTab: 1 + index } ) } tabIndex="0" role="button">
							{ titles[ index ] && titles[ index ].icon && 'right' !== titles[ index ].iconSide && (
								<IconRender className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } htmltag="span" />
							) }
							{ ( undefined === enableSubtitle || ! enableSubtitle ) && (
								<RichText
									tagName="div"
									placeholder={ __( 'Tab Title' ) }
									value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : '' ) }
									unstableOnFocus={ () => setAttributes( { currentTab: 1 + index } ) }
									onChange={ value => {
										this.saveArrayUpdate( { text: value }, index );
									} }
									formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
									allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
									className={ 'kt-title-text' }
									style={ {
										lineHeight: lineHeight + lineType,
									} }
									keepPlaceholderOnFocus
								/>
							) }
							{ enableSubtitle && (
								<div className="kb-tab-titles-wrap">
									<RichText
										tagName="div"
										placeholder={ __( 'Tab Title' ) }
										value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : '' ) }
										unstableOnFocus={ () => setAttributes( { currentTab: 1 + index } ) }
										onChange={ value => {
											this.saveArrayUpdate( { text: value }, index );
										} }
										formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
										allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
										className={ 'kt-title-text' }
										style={ {
											lineHeight: lineHeight + lineType,
										} }
										keepPlaceholderOnFocus
									/>
									<RichText
										tagName="div"
										placeholder={ __( 'Tab subtitle' ) }
										value={ ( undefined !== titles[ index ] && undefined !== titles[ index ].subText ? titles[ index ].subText : '' ) }
										unstableOnFocus={ () => setAttributes( { currentTab: 1 + index } ) }
										onChange={ value => {
											this.saveArrayUpdate( { subText: value }, index );
										} }
										formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
										allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
										className={ 'kt-title-sub-text' }
										keepPlaceholderOnFocus
									/>
								</div>
							) }
							{ titles[ index ] && titles[ index ].icon && 'right' === titles[ index ].iconSide && (
								<IconRender className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } htmltag="span" />
							) }
						</div>
						<div className="kadence-blocks-tab-item__control-menu">
							{/* { index !== 0 && (
								<IconButton
									icon={ ( 'vtabs' === layout ? 'arrow-up' : 'arrow-left' ) }
									onClick={ index === 0 ? undefined : this.onMoveBack( index ) }
									className="kadence-blocks-tab-item__move-back"
									label={ ( 'vtabs' === layout ? __( 'Move Item Up' ) : __( 'Move Item Back' ) ) }
									aria-disabled={ index === 0 }
									disabled={ index === 0 }
								/>
							) } */}
							{/* { ( index + 1 ) !== tabCount && (
								<IconButton
									icon={ ( 'vtabs' === layout ? 'arrow-down' : 'arrow-right' ) }
									onClick={ ( index + 1 ) === tabCount ? undefined : this.onMoveForward( index ) }
									className="kadence-blocks-tab-item__move-forward"
									label={ ( 'vtabs' === layout ? __( 'Move Item Down' ) : __( 'Move Item Forward' ) ) }
									aria-disabled={ ( index + 1 ) === tabCount }
									disabled={ ( index + 1 ) === tabCount }
								/>
							) } */}
							{ tabCount > 1 && (
								<IconButton
									icon="no-alt"
									onClick={ () => {
										const removeClientId = this.props.tabsBlock.innerBlocks[ index ].clientId;
										const currentItems = filter( this.props.attributes.titles, ( item, i ) => index !== i );
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
									disabled={ ! currentTab === ( index + 1 ) }
								/>
							) }
						</div>
					</li>
				</Fragment>
			);
		};
		const renderPreviewArray = (
			<Fragment>
				{ times( tabCount, n => renderTitles( n ) ) }
			</Fragment>
		);
		return (
			<Fragment>
				<div className={ classes } >
						<div className="kt-tabs-wrap" style={ {
							maxWidth: maxWidth + 'px',
						} }>
							<div className="kb-add-new-tab-contain">
								<Button
									className="kt-tab-add"
									isPrimary={ true }
									onClick={ () => {
										const newBlock = createBlock( 'hoora/tab', { id: tabCount + 1 } );
										setAttributes( { tabCount: tabCount + 1 } );
										this.props.insertTab( newBlock );
										//wp.data.dispatch( 'core/block-editor' ).insertBlock( newBlock, clientId );
										const newtabs = titles;
										newtabs.push( {
											text: sprintf( __( 'Tab %d' ), tabCount + 1 ),
											icon: titles[ 0 ].icon,
											iconSide: titles[ 0 ].iconSide,
											onlyIcon: titles[ 0 ].onlyIcon,
											subText: '',
										} );
										setAttributes( { titles: newtabs } );
										this.saveArrayUpdate( { iconSide: titles[ 0 ].iconSide }, 0 );
									} }
								>
									<Dashicon icon="plus" />
									{ __( 'Add Tab' ) }
								</Button>
							</div>
							<ul className={ `kt-tabs-title-list${ ( 'tabs' === layout && widthType === 'percent' ? ' kb-tabs-list-columns kb-tab-title-columns-' + tabWidth[ 0 ] : '' ) }` }>
								{ renderPreviewArray }
							</ul>
							<div className="kt-tabs-content-wrap" style={ {
								padding: ( innerPadding ? innerPadding[ 0 ] + 'px ' + innerPadding[ 1 ] + 'px ' + innerPadding[ 2 ] + 'px ' + innerPadding[ 3 ] + 'px' : '' ),
								borderWidth: ( contentBorder ? contentBorder[ 0 ] + 'px ' + contentBorder[ 1 ] + 'px ' + contentBorder[ 2 ] + 'px ' + contentBorder[ 3 ] + 'px' : '' ),
								minHeight: minHeight + 'px',
								// backgroundColor: KadenceColorOutput( contentBgColor ),
								// borderColor: KadenceColorOutput( contentBorderColor ),
							} }>
								<InnerBlocks
									template={ getPanesTemplate( tabCount ) }
									templateLock={ false }
									allowedBlocks={ ALLOWED_BLOCKS } />
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
				times( block.innerBlocks.length, n => {
					updateBlockAttributes( block.innerBlocks[ n ].clientId, {
						id: n + 1,
					} );
				} );
			},
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
