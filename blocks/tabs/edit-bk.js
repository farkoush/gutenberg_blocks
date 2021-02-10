/**
 * BLOCK: Kadence Tabs
 */

/**
 * Import Icons
 */
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
// import './editor.scss';
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
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
} = wp.blockEditor;
const {
	Button,
	ButtonGroup,
	Tooltip,
	TabPanel,
	IconButton,
	Dashicon,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
} = wp.components;
/**
 * Internal block libraries
 */
const { __, sprintf } = wp.i18n;

const ALLOWED_BLOCKS = [ 'hoora/tab' ];

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

/**
 * Returns the layouts configuration for a given number of panes.
 *
 * @param {number} panes Number of panes.
 *
 * @return {Object[]} Panes layout configuration.
 */
const getPanesTemplate = memoize( ( panes ) => {
	return times( panes, n => [ 'hoora/tab', { id: n + 1 } ] );
} );
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const kttabsUniqueIDs = [];
/**
 * Build the row edit
 */
class KadenceTabs extends Component {
	constructor() {
		super( ...arguments );
		// this.showSettings = this.showSettings.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBack = this.onMoveBack.bind( this );
		this.state = {
			hovered: 'false',
			showPreset: false,
			// user: ( kadence_blocks_params.userrole ? kadence_blocks_params.userrole : 'admin' ),
			settings: {},
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
	onMove( oldIndex, newIndex ) {
		const titles = [ ...this.props.attributes.titles ];
		titles.splice( newIndex, 1, this.props.attributes.titles[ oldIndex ] );
		titles.splice( oldIndex, 1, this.props.attributes.titles[ newIndex ] );
		this.props.setAttributes( { titles: titles, currentTab: parseInt( newIndex + 1 ) } );
		if ( this.props.attributes.startTab === ( oldIndex + 1 ) ) {
			this.props.setAttributes( { startTab: ( newIndex + 1 ) } );
		} else if ( this.props.attributes.startTab === ( newIndex + 1 ) ) {
			this.props.setAttributes( { startTab: ( oldIndex + 1 ) } );
		}
		this.props.moveTab( this.props.tabsBlock.innerBlocks[ oldIndex ].clientId, newIndex );
		this.props.resetOrder();
		this.props.setAttributes( { currentTab: parseInt( newIndex + 1 ) } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.realTabsCount - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBack( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}
	render() {
		const { attributes: { uniqueID, tabCount, blockAlignment, mobileLayout, currentTab, tabletLayout, layout, innerPadding, minHeight, maxWidth, titles, titleColor, titleColorHover, titleColorActive, titleBg, titleBgHover, titleBgActive, size, sizeType, lineType, lineHeight, tabLineHeight, tabSize, mobileSize, mobileLineHeight, letterSpacing, borderRadius, titleBorderWidth, titleBorderControl, titleBorder, titleBorderHover, titleBorderActive, typography, fontVariant, fontWeight, fontStyle, fontSubset, googleFont, loadGoogleFont, innerPaddingControl, contentBorder, contentBorderControl, contentBorderColor, titlePadding, titlePaddingControl, titleMargin, titleMarginControl, contentBgColor, tabAlignment, titleBorderRadiusControl, titleBorderRadius, iSize, startTab, enableSubtitle, subtitleFont, tabWidth, gutter, widthType }, clientId, className, setAttributes } = this.props;
		const layoutClass = ( ! layout ? 'tabs' : layout );
		// const sizeTypes = [
		// 	{ key: 'px', name: __( 'px' ) },
		// 	{ key: 'em', name: __( 'em' ) },
		// ];
		// const gconfig = {
		// 	google: {
		// 		families: [ typography + ( fontVariant ? ':' + fontVariant : '' ) ],
		// 	},
		// };
		const sgconfig = {
			google: {
				families: [ ( subtitleFont && subtitleFont[ 0 ] && subtitleFont[ 0 ].family ? subtitleFont[ 0 ].family : '' ) + ( subtitleFont && subtitleFont[ 0 ] && subtitleFont[ 0 ].variant ? ':' + subtitleFont[ 0 ].variant : '' ) ],
			},
		};
		// const sconfig = ( subtitleFont && subtitleFont[ 0 ] && subtitleFont[ 0 ].google ? sgconfig : '' );
		const startlayoutOptions = [
			{ key: 'skip', name: __( 'Skip' ), icon: __( 'Skip' ) },
			{ key: 'simple', name: __( 'Simple' ), icon: icons.tabsSimple },
			{ key: 'boldbg', name: __( 'Boldbg' ), icon: icons.tabsBold },
			{ key: 'center', name: __( 'Center' ), icon: icons.tabsCenter },
			{ key: 'vertical', name: __( 'Vertical' ), icon: icons.tabsVertical },
		];
		const setInitalLayout = ( key ) => {
			if ( 'skip' === key ) {
			} else if ( 'simple' === key ) {
				setAttributes( {
					layout: 'tabs',
					tabAlignment: 'left',
					size: 1.1,
					sizeType: 'em',
					lineHeight: 1.4,
					lineType: 'em',
					titleBorderWidth: [ 1, 1, 0, 1 ],
					titleBorderControl: 'individual',
					titleBorderRadius: [ 4, 4, 0, 0 ],
					titleBorderRadiusControl: 'individual',
					titlePadding: [ 8, 20, 8, 20 ],
					titlePaddingControl: 'individual',
					titleMargin: [ 0, 8, -1, 0 ],
					titleMarginControl: 'individual',
					titleColor: '#444444',
					titleColorHover: '#444444',
					titleColorActive: '#444444',
					titleBg: '#ffffff',
					titleBgHover: '#ffffff',
					titleBgActive: '#ffffff',
					titleBorder: '#eeeeee',
					titleBorderHover: '#e2e2e2',
					titleBorderActive: '#bcbcbc',
					contentBgColor: '#ffffff',
					contentBorderColor: '#bcbcbc',
					contentBorder: [ 1, 1, 1, 1 ],
					contentBorderControl: 'linked',
				} );
			} else if ( 'boldbg' === key ) {
				setAttributes( {
					layout: 'tabs',
					tabAlignment: 'left',
					size: 1.1,
					sizeType: 'em',
					lineHeight: 1.4,
					lineType: 'em',
					titleBorderWidth: [ 0, 0, 0, 0 ],
					titleBorderControl: 'linked',
					titleBorderRadius: [ 4, 4, 0, 0 ],
					titleBorderRadiusControl: 'individual',
					titlePadding: [ 8, 20, 8, 20 ],
					titlePaddingControl: 'individual',
					titleMargin: [ 0, 8, 0, 0 ],
					titleMarginControl: 'individual',
					titleColor: '#222222',
					titleColorHover: '#222222',
					titleColorActive: '#ffffff',
					titleBg: '#eeeeee',
					titleBgHover: '#e2e2e2',
					titleBgActive: '#0a6689',
					titleBorder: '#eeeeee',
					titleBorderHover: '#eeeeee',
					titleBorderActive: '#eeeeee',
					contentBgColor: '#ffffff',
					contentBorderColor: '#0a6689',
					contentBorder: [ 3, 0, 0, 0 ],
					contentBorderControl: 'individual',
				} );
			} else if ( 'center' === key ) {
				setAttributes( {
					layout: 'tabs',
					tabAlignment: 'center',
					size: 1.1,
					sizeType: 'em',
					lineHeight: 1.4,
					lineType: 'em',
					titleBorderWidth: [ 0, 0, 4, 0 ],
					titleBorderControl: 'individual',
					titleBorderRadius: [ 4, 4, 0, 0 ],
					titleBorderRadiusControl: 'individual',
					titlePadding: [ 8, 20, 8, 20 ],
					titlePaddingControl: 'individual',
					titleMargin: [ 0, 8, 0, 0 ],
					titleMarginControl: 'individual',
					titleColor: '#555555',
					titleColorHover: '#555555',
					titleColorActive: '#0a6689',
					titleBg: '#ffffff',
					titleBgHover: '#ffffff',
					titleBgActive: '#ffffff',
					titleBorder: '#ffffff',
					titleBorderHover: '#eeeeee',
					titleBorderActive: '#0a6689',
					contentBgColor: '#ffffff',
					contentBorderColor: '#eeeeee',
					contentBorder: [ 1, 0, 0, 0 ],
					contentBorderControl: 'individual',
				} );
			} else if ( 'vertical' === key ) {
				setAttributes( {
					layout: 'vtabs',
					mobileLayout: 'accordion',
					tabAlignment: 'left',
					size: 1.1,
					sizeType: 'em',
					lineHeight: 1.4,
					lineType: 'em',
					titleBorderWidth: [ 4, 0, 4, 4 ],
					titleBorderControl: 'individual',
					titleBorderRadius: [ 10, 0, 0, 10 ],
					titleBorderRadiusControl: 'individual',
					titlePadding: [ 12, 8, 12, 20 ],
					titlePaddingControl: 'individual',
					titleMargin: [ 0, -4, 10, 0 ],
					titleMarginControl: 'individual',
					titleColor: '#444444',
					titleColorHover: '#444444',
					titleColorActive: '#444444',
					titleBg: '#eeeeee',
					titleBgHover: '#e9e9e9',
					titleBgActive: '#ffffff',
					titleBorder: '#eeeeee',
					titleBorderHover: '#e9e9e9',
					titleBorderActive: '#eeeeee',
					contentBgColor: '#ffffff',
					contentBorderColor: '#eeeeee',
					contentBorder: [ 4, 4, 4, 4 ],
					contentBorderControl: 'linked',
					minHeight: 400,
				} );
			}
		};
		// const config = ( googleFont ? gconfig : '' );
		// const fontMin = ( sizeType === 'em' ? 0.2 : 5 );
		// const fontMax = ( sizeType === 'em' ? 12 : 200 );
		// const fontStep = ( sizeType === 'em' ? 0.1 : 1 );
		// const lineMin = ( lineType === 'px' ? 5 : 0.2 );
		// const lineMax = ( lineType === 'px' ? 200 : 12 );
		// const lineStep = ( lineType === 'px' ? 1 : 0.1 );
		const tabLayoutClass = ( ! tabletLayout ? 'inherit' : tabletLayout );
		const mobileLayoutClass = ( ! mobileLayout ? 'inherit' : mobileLayout );
		const classes = classnames( className, `kt-tabs-wrap kt-tabs-id${ uniqueID } kt-tabs-has-${ tabCount }-tabs kt-active-tab-${ currentTab } kt-tabs-layout-${ layoutClass } kt-tabs-block kt-tabs-tablet-layout-${ tabLayoutClass } kt-tabs-mobile-layout-${ mobileLayoutClass } kt-tab-alignment-${ tabAlignment }` );
		// const mLayoutOptions = [
		// 	{ key: 'tabs', name: __( 'Tabs' ), icon: icons.tabs },
		// 	{ key: 'vtabs', name: __( 'Vertical Tabs' ), icon: icons.vtabs },
		// 	{ key: 'accordion', name: __( 'Accordion' ), icon: icons.accordion },
		// ];
		// const layoutOptions = [
		// 	{ key: 'tabs', name: __( 'Tabs' ), icon: icons.tabs },
		// 	{ key: 'vtabs', name: __( 'Vertical Tabs' ), icon: icons.vtabs },
		// ];
		// const mobileControls = (
		// 	<div>
		// 		<PanelBody>
		// 			<p className="components-base-control__label">{ __( 'Mobile Layout' ) }</p>
		// 			<ButtonGroup aria-label={ __( 'Mobile Layout' ) }>
		// 				{ map( mLayoutOptions, ( { name, key, icon } ) => (
		// 					<Tooltip text={ name }>
		// 						<Button
		// 							key={ key }
		// 							className="kt-layout-btn kt-tablayout"
		// 							isSmall
		// 							isPrimary={ mobileLayout === key }
		// 							aria-pressed={ mobileLayout === key }
		// 							onClick={ () => setAttributes( { mobileLayout: key } ) }
		// 						>
		// 							{ icon }
		// 						</Button>
		// 					</Tooltip>
		// 				) ) }
		// 			</ButtonGroup>
		// 		</PanelBody>
		// 	</div>
		// );
		// const tabletControls = (
		// 	<PanelBody>
		// 		<p className="components-base-control__label">{ __( 'Tablet Layout' ) }</p>
		// 		<ButtonGroup aria-label={ __( 'Tablet Layout' ) }>
		// 			{ map( mLayoutOptions, ( { name, key, icon } ) => (
		// 				<Tooltip text={ name }>
		// 					<Button
		// 						key={ key }
		// 						className="kt-layout-btn kt-tablayout"
		// 						isSmall
		// 						isPrimary={ tabletLayout === key }
		// 						aria-pressed={ tabletLayout === key }
		// 						onClick={ () => setAttributes( { tabletLayout: key } ) }
		// 					>
		// 						{ icon }
		// 					</Button>
		// 				</Tooltip>
		// 			) ) }
		// 		</ButtonGroup>
		// 	</PanelBody>
		// );

		// const deskControls = (
		// 	<Fragment>
		// 		<PanelBody>
		// 			<p className="components-base-control__label">{ __( 'Layout' ) }</p>
		// 			<ButtonGroup aria-label={ __( 'Layout' ) }>
		// 				{ map( layoutOptions, ( { name, key, icon } ) => (
		// 					<Tooltip text={ name }>
		// 						<Button
		// 							key={ key }
		// 							className="kt-layout-btn kt-tablayout"
		// 							isSmall
		// 							isPrimary={ layout === key }
		// 							aria-pressed={ layout === key }
		// 							onClick={ () => {
		// 								setAttributes( {
		// 									layout: key,
		// 								} );
		// 							} }
		// 						>
		// 							{ icon }
		// 						</Button>
		// 					</Tooltip>
		// 				) ) }
		// 			</ButtonGroup>
		// 			<h2>{ __( 'Set initial Open Tab' ) }</h2>
		// 			<ButtonGroup aria-label={ __( 'initial Open Tab' ) }>
		// 				{ times( tabCount, n => (
		// 					<Button
		// 						key={ n + 1 }
		// 						className="kt-init-open-tab"
		// 						isSmall
		// 						isPrimary={ startTab === n + 1 }
		// 						aria-pressed={ startTab === n + 1 }
		// 						onClick={ () => setAttributes( { startTab: n + 1 } ) }
		// 					>
		// 						{ __( 'Tab' ) + ' ' + ( n + 1 ) }
		// 					</Button>
		// 				) ) }
		// 			</ButtonGroup>
		// 		</PanelBody>
		// 	</Fragment>
		// );
		// const tabControls = (
		// 	<TabPanel className="kt-inspect-tabs"
		// 		activeClass="active-tab"
		// 		tabs={ [
		// 			{
		// 				name: 'desk',
		// 				title: <Dashicon icon="desktop" />,
		// 				className: 'kt-desk-tab',
		// 			},
		// 			{
		// 				name: 'tablet',
		// 				title: <Dashicon icon="tablet" />,
		// 				className: 'kt-tablet-tab',
		// 			},
		// 			{
		// 				name: 'mobile',
		// 				title: <Dashicon icon="smartphone" />,
		// 				className: 'kt-mobile-tab',
		// 			},
		// 		] }>
		// 		{
		// 			( tab ) => {
		// 				let tabout;
		// 				if ( tab.name ) {
		// 					if ( 'mobile' === tab.name ) {
		// 						tabout = mobileControls;
		// 					} else if ( 'tablet' === tab.name ) {
		// 						tabout = tabletControls;
		// 					} else {
		// 						tabout = deskControls;
		// 					}
		// 				}
		// 				return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
		// 			}
		// 		}
		// 	</TabPanel>
		// );
		const renderTitles = ( index ) => {
			const subFont = ( subtitleFont && subtitleFont[ 0 ] && undefined !== subtitleFont[ 0 ].sizeType ? subtitleFont : [ {
				size: [ '', '', '' ],
				sizeType: 'px',
				lineHeight: [ '', '', '' ],
				lineType: 'px',
				letterSpacing: '',
				textTransform: '',
				family: '',
				google: false,
				style: '',
				weight: '',
				variant: '',
				subset: '',
				loadGoogle: true,
				padding: [ 0, 0, 0, 0 ],
				paddingControl: 'linked',
				margin: [ 0, 0, 0, 0 ],
				marginControl: 'linked',
			} ] );
			return (
				<Fragment>
					<li className={ `kt-title-item kt-title-item-${ index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tabs-has-icon-${ ( titles[ index ] && titles[ index ].icon ? 'true' : 'false' ) } kt-tab-title-${ ( 1 + index === currentTab ? 'active' : 'inactive' ) }${ ( enableSubtitle ? ' kb-tabs-have-subtitle' : '' ) }` } style={ {
						margin: ( titleMargin ? titleMargin[ 0 ] + 'px ' + ( 'tabs' === layout && widthType === 'percent' ? '0px ' : titleMargin[ 1 ] + 'px ' ) + titleMargin[ 2 ] + 'px ' + ( 'tabs' === layout && widthType === 'percent' ? '0px ' : titleMargin[ 3 ] + 'px ' ) : '' ),
					} }>
						<div className={ `kt-tab-title kt-tab-title-${ 1 + index }` } style={ {
							// backgroundColor: KadenceColorOutput( titleBg ),
							// color: KadenceColorOutput( titleColor ),
							fontSize: size + sizeType,
							lineHeight: lineHeight + lineType,
							fontWeight: fontWeight,
							fontStyle: fontStyle,
							letterSpacing: letterSpacing + 'px',
							fontFamily: ( typography ? typography : '' ),
							borderTopLeftRadius: borderRadius + 'px',
							borderTopRightRadius: borderRadius + 'px',
							borderWidth: ( titleBorderWidth ? titleBorderWidth[ 0 ] + 'px ' + titleBorderWidth[ 1 ] + 'px ' + titleBorderWidth[ 2 ] + 'px ' + titleBorderWidth[ 3 ] + 'px' : '' ),
							borderRadius: ( titleBorderRadius ? titleBorderRadius[ 0 ] + 'px ' + titleBorderRadius[ 1 ] + 'px ' + titleBorderRadius[ 2 ] + 'px ' + titleBorderRadius[ 3 ] + 'px' : '' ),
							padding: ( titlePadding ? titlePadding[ 0 ] + 'px ' + titlePadding[ 1 ] + 'px ' + titlePadding[ 2 ] + 'px ' + titlePadding[ 3 ] + 'px' : '' ),
							// borderColor: KadenceColorOutput( titleBorder ),
							marginRight: ( 'tabs' === layout && widthType === 'percent' ? gutter[ 0 ] + 'px' : undefined ),
						} } onClick={ () => setAttributes( { currentTab: 1 + index } ) } onKeyPress={ () => setAttributes( { currentTab: 1 + index } ) } tabIndex="0" role="button">
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
										style={ {
											fontWeight: subFont[ 0 ].weight,
											fontStyle: subFont[ 0 ].style,
											fontSize: subFont[ 0 ].size[ 0 ] + subFont[ 0 ].sizeType,
											lineHeight: ( subFont[ 0 ].lineHeight && subFont[ 0 ].lineHeight[ 0 ] ? subFont[ 0 ].lineHeight[ 0 ] + subFont[ 0 ].lineType : undefined ),
											letterSpacing: subFont[ 0 ].letterSpacing + 'px',
											fontFamily: ( subFont[ 0 ].family ? subFont[ 0 ].family : '' ),
											padding: ( subFont[ 0 ].padding ? subFont[ 0 ].padding[ 0 ] + 'px ' + subFont[ 0 ].padding[ 1 ] + 'px ' + subFont[ 0 ].padding[ 2 ] + 'px ' + subFont[ 0 ].padding[ 3 ] + 'px' : '' ),
											margin: ( subFont[ 0 ].margin ? subFont[ 0 ].margin[ 0 ] + 'px ' + subFont[ 0 ].margin[ 1 ] + 'px ' + subFont[ 0 ].margin[ 2 ] + 'px ' + subFont[ 0 ].margin[ 3 ] + 'px' : '' ),
										} }
										keepPlaceholderOnFocus
									/>
								</div>
							) }
							{ titles[ index ] && titles[ index ].icon && 'right' === titles[ index ].iconSide && (
								<IconRender className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } htmltag="span" />
							) }
						</div>
						<div className="kadence-blocks-tab-item__control-menu">
							{ index !== 0 && (
								<IconButton
									icon={ ( 'vtabs' === layout ? 'arrow-up' : 'arrow-left' ) }
									onClick={ index === 0 ? undefined : this.onMoveBack( index ) }
									className="kadence-blocks-tab-item__move-back"
									label={ ( 'vtabs' === layout ? __( 'Move Item Up' ) : __( 'Move Item Back' ) ) }
									aria-disabled={ index === 0 }
									disabled={ index === 0 }
								/>
							) }
							{ ( index + 1 ) !== tabCount && (
								<IconButton
									icon={ ( 'vtabs' === layout ? 'arrow-down' : 'arrow-right' ) }
									onClick={ ( index + 1 ) === tabCount ? undefined : this.onMoveForward( index ) }
									className="kadence-blocks-tab-item__move-forward"
									label={ ( 'vtabs' === layout ? __( 'Move Item Down' ) : __( 'Move Item Forward' ) ) }
									aria-disabled={ ( index + 1 ) === tabCount }
									disabled={ ( index + 1 ) === tabCount }
								/>
							) }
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
		// const sizeDeskControls = (
		// 	<PanelBody>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ sizeType === key }
		// 					aria-pressed={ sizeType === key }
		// 					onClick={ () => setAttributes( { sizeType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Font Size' ) }
		// 			value={ ( size ? size : '' ) }
		// 			onChange={ ( value ) => setAttributes( { size: value } ) }
		// 			min={ fontMin }
		// 			max={ fontMax }
		// 			step={ fontStep }
		// 		/>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ lineType === key }
		// 					aria-pressed={ lineType === key }
		// 					onClick={ () => setAttributes( { lineType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Line Height' ) }
		// 			value={ ( lineHeight ? lineHeight : '' ) }
		// 			onChange={ ( value ) => setAttributes( { lineHeight: value } ) }
		// 			min={ lineMin }
		// 			max={ lineMax }
		// 			step={ lineStep }
		// 		/>
		// 	</PanelBody>
		// );
		// const sizeTabletControls = (
		// 	<PanelBody>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ sizeType === key }
		// 					aria-pressed={ sizeType === key }
		// 					onClick={ () => setAttributes( { sizeType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Tablet Font Size' ) }
		// 			value={ ( tabSize ? tabSize : '' ) }
		// 			onChange={ ( value ) => setAttributes( { tabSize: value } ) }
		// 			min={ fontMin }
		// 			max={ fontMax }
		// 			step={ fontStep }
		// 		/>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ lineType === key }
		// 					aria-pressed={ lineType === key }
		// 					onClick={ () => setAttributes( { lineType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Tablet Line Height' ) }
		// 			value={ ( tabLineHeight ? tabLineHeight : '' ) }
		// 			onChange={ ( value ) => setAttributes( { tabLineHeight: value } ) }
		// 			min={ lineMin }
		// 			max={ lineMax }
		// 			step={ lineStep }
		// 		/>
		// 	</PanelBody>
		// );
		// const sizeMobileControls = (
		// 	<PanelBody>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ sizeType === key }
		// 					aria-pressed={ sizeType === key }
		// 					onClick={ () => setAttributes( { sizeType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Mobile Font Size' ) }
		// 			value={ ( mobileSize ? mobileSize : '' ) }
		// 			onChange={ ( value ) => setAttributes( { mobileSize: value } ) }
		// 			min={ fontMin }
		// 			max={ fontMax }
		// 			step={ fontStep }
		// 		/>
		// 		<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Size Type' ) }>
		// 			{ map( sizeTypes, ( { name, key } ) => (
		// 				<Button
		// 					key={ key }
		// 					className="kt-size-btn"
		// 					isSmall
		// 					isPrimary={ lineType === key }
		// 					aria-pressed={ lineType === key }
		// 					onClick={ () => setAttributes( { lineType: key } ) }
		// 				>
		// 					{ name }
		// 				</Button>
		// 			) ) }
		// 		</ButtonGroup>
		// 		<RangeControl
		// 			label={ __( 'Mobile Line Height' ) }
		// 			value={ ( mobileLineHeight ? mobileLineHeight : '' ) }
		// 			onChange={ ( value ) => setAttributes( { mobileLineHeight: value } ) }
		// 			min={ lineMin }
		// 			max={ lineMax }
		// 			step={ lineStep }
		// 		/>
		// 	</PanelBody>
		// );
		// const sizeTabControls = (
		// 	<TabPanel className="kt-size-tabs"
		// 		activeClass="active-tab"
		// 		tabs={ [
		// 			{
		// 				name: 'desk',
		// 				title: <Dashicon icon="desktop" />,
		// 				className: 'kt-desk-tab',
		// 			},
		// 			{
		// 				name: 'tablet',
		// 				title: <Dashicon icon="tablet" />,
		// 				className: 'kt-tablet-tab',
		// 			},
		// 			{
		// 				name: 'mobile',
		// 				title: <Dashicon icon="smartphone" />,
		// 				className: 'kt-mobile-tab',
		// 			},
		// 		] }>
		// 		{
		// 			( tab ) => {
		// 				let tabout;
		// 				if ( tab.name ) {
		// 					// check which size tab to show.
		// 					if ( 'mobile' === tab.name ) {
		// 						tabout = sizeMobileControls;
		// 					} else if ( 'tablet' === tab.name ) {
		// 						tabout = sizeTabletControls;
		// 					} else {
		// 						tabout = sizeDeskControls;
		// 					}
		// 				}
		// 				return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
		// 			}
		// 		}
		// 	</TabPanel>
		// );
		const renderCSS = (
			<style>
				{ `.kt-tabs-id${ uniqueID } .kt-title-item:hover .kt-tab-title {
					color: ${ KadenceColorOutput( titleColorHover ) } !important;
					border-color: ${ KadenceColorOutput( titleBorderHover ) } !important;
					background-color: ${ KadenceColorOutput( titleBgHover ) } !important;
				}
				.kt-tabs-id${ uniqueID } .kt-title-item.kt-tab-title-active .kt-tab-title, .kt-tabs-id${ uniqueID } .kt-title-item.kt-tab-title-active:hover .kt-tab-title {
					color: ${ KadenceColorOutput( titleColorActive ) } !important;
					border-color: ${ KadenceColorOutput( titleBorderActive ) } !important;
					background-color: ${ KadenceColorOutput( titleBgActive ) } !important;
				}` }
			</style>
		);
		return (
			<Fragment>
				{ renderCSS }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						controls={ [ 'center', 'wide', 'full' ] }
						onChange={ value => setAttributes( { blockAlignment: value } ) }
					/>
					<AlignmentToolbar
						value={ tabAlignment }
						onChange={ ( nextAlign ) => {
							setAttributes( { tabAlignment: nextAlign } );
						} }
					/>
				</BlockControls>
				<div className={ classes } >
					{ this.state.showPreset && (
						<div className="kt-select-starter-style-tabs">
							<div className="kt-select-starter-style-tabs-title">
								{ __( 'Select Initial Style' ) }
							</div>
							<ButtonGroup className="kt-init-tabs-btn-group" aria-label={ __( 'Initial Style' ) }>
								{ map( startlayoutOptions, ( { name, key, icon } ) => (
									<Button
										key={ key }
										className="kt-inital-tabs-style-btn"
										isSmall
										onClick={ () => {
											setInitalLayout( key );
											this.setState( { showPreset: false } );
										} }
									>
										{ icon }
									</Button>
								) ) }
							</ButtonGroup>
						</div>
					) }
					{ ! this.state.showPreset && (
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
					) }
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
