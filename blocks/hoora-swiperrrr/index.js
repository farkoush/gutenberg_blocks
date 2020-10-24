/**
 * Do's and don'ts block.
 *
 * @package
 */

/**
 * Internal dependencies.
 */
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual } from 'swiper';
// import 'swiper/swiper.scss';
import Edit from './edit';

/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
// import { registerBlockType } from '@wordpress/blocks';
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const attributes = {
	imgID: {
		type: 'number',
	},
	  imageAlt: {
		attribute: 'alt',
		selector: '.card__image'
	  },
	  imageUrl: {
		attribute: 'src',
		selector: '.card__image'
	  }
}     
/**
 * Register block type.
 */
registerBlockType( 'hoora/swiper', {
	title: "hoora Swiper",
	icon: 'editor-table',
	description: 'swiper idangerous',
	category: 'hoora',
	attributes,
	edit: Edit,
	save() {
		return (
			<div className="hoora-swiper">
				    {/* <Swiper
						spaceBetween={50}
						slidesPerView={3}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper, "jjjjjjjjjj")}
						>
						<SwiperSlide>Slide 1</SwiperSlide>
						<SwiperSlide>Slide 2</SwiperSlide>
						<SwiperSlide>Slide 3</SwiperSlide>
						<SwiperSlide>Slide 4</SwiperSlide>
					</Swiper> */}
			</div>
		);
	},
} );
