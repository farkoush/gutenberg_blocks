/**
 * BLOCK: Kadence Gallery
 */

/**
 * Import Icons
 */
import icons from '../../icons';
import attributes from './attributes';

/**
 * Import edit
 */
import edit from './edit';
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { Fragment } = wp.element;
const {
	RichText,
} = wp.blockEditor;

import { pickRelevantMediaFiles, pickRelevantMediaFilesCore, columnConvert } from './shared';
registerBlockType( 'kadence/advancedgallery', {
	title: __( 'Advanced Gallery', 'kadence-blocks' ),
	description: __( 'Photo galleries, carousels, and sliders! Enable custom links, captions, and more.', 'kadence-blocks' ),
	icon: {
		src: icons.gallery,
	},
	category: 'kadence-blocks',
	supports: {
		anchor: true,
		align: [ 'wide', 'full' ],
	},
	attributes,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => {
					return createBlock( 'kadence/advancedgallery', {
						align: ( attributes.align ? attributes.align : 'none' ),
						columns: columnConvert( ( attributes.columns ? attributes.columns : 3 ) ),
						images: attributes.images.map( ( image ) => pickRelevantMediaFiles( image, 'large', 'full' ) ),
						linkTo: ( attributes.linkTo ? attributes.linkTo : 'none' ),
						ids: attributes.ids,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => {
					return createBlock( 'core/gallery', {
						align: attributes.align,
						columns: attributes.columns[ 2 ],
						images: attributes.images.map( ( image ) => pickRelevantMediaFilesCore( image ) ),
						linkTo: attributes.linkTo,
						ids: attributes.ids,
					} );
				},
			},
		],
	},
	edit,
	save: props => {
		const { attributes: { autoplay, speed, delay, loop, effect,uniqueID, images, columns, type, linkTo, showCaption, captionStyle, imageRatio, imageFilter, lightbox, lightboxCaption, dotStyle, transSpeed, slidesScroll, autoPlay, arrowStyle, autoSpeed, carouselAlign, thumbnailColumns, thumbnailRatio, mobileForceHover } } = props;
		const renderGalleryImages = ( image ) => {
			let href;
			switch ( linkTo ) {
				case 'media':
					href = image.lightUrl || image.url;
					break;
				case 'custom':
					href = ( image.customLink ? image.customLink : '' );
					break;
				case 'attachment':
					href = image.link;
					break;
			}
			const img = <div style={ { paddingBottom: ( ( ( type !== 'grid' && type !== 'carousel' && type !== 'fluidcarousel' && type !== 'tiles' && type !== 'slider' && type !== 'thumbslider' ) && image.width && image.height ) || ( type === 'grid' && imageRatio === 'inherit' && image.width && image.height ) ? ( ( image.height / image.width ) * 100 ) + '%' : undefined ) } }><img src={ image.thumbUrl || image.url } width={ image.width } height={ image.height } alt={ image.alt } data-full-image={ image.url } data-light-image={ image.lightUrl } data-id={ image.id } data-link={ image.link } data-custom-link={ image.customLink } data-custom-link-target={ image.linkTarget } className={ `${ ( image.id ? `wp-image-${ image.id }` : undefined ) }${ ( type === 'carousel' || type === 'fluidcarousel' || type === 'tiles' || type === 'slider' || type === 'thumbslider' ? ' skip-lazy' : undefined ) }` } /></div>;
			const imgPack = (
				<Fragment>

						{ img }
						{ ( image.caption && image.caption.length > 0 ) && 'below' !== captionStyle && (
							figcap
						) }
				</Fragment>
			);
			return (
				<div key={ image.id || image.url }>
							{ href ? <a href={ href } className="kb-gallery-item-link" target={ ( linkTo === 'custom' && image.linkTarget === '_blank' ) || ( linkTo === 'media' && lightbox === 'new_tab' ) ? '_blank' : undefined } rel={ ( linkTo === 'custom' && '_blank' === image.linkTarget ? 'noopener noreferrer' : undefined ) } >{ imgPack }</a> : imgPack }
				</div>
			);
		};
		// console.log('type');
		// console.log(type);
		return (
			<div >
				<h2>Swiper</h2>
				<div
					className={`swiper-container hoora-swiper-container hoora-swiper-container`}
					data-autoplay={autoplay}
					data-delay={delay}
					data-loop={loop}
					data-speed={speed}
					data-effect={effect}
				>
					<div className="swiper-wrapper hoora-swiper-wrapper">
						{ images.map( ( image, index ) => (
										<div className="swiper-slide"  key={ index }>
											{ renderGalleryImages( image ) }
										</div>
									) ) }
					</div>
					<div className="swiper-pagination hoora-swiper-pagination" />
					<div className="hoora-swiper-button-prev swiper-button-prev hoora-swiper-button-prev" />
					<div className="hoora-swiper-button-next swiper-button-next hoora-swiper-button-next" />
				</div>
			</div>
		);
	},
} );
