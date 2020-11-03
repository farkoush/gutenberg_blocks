export default function save({ attributes, className }) {
    const itemFields = attributes.items.map( ( item, index ) => {
        return (
			<div className="swiper-slide hoora-swiper-slide" key={ index }>
				<img src={item.image.url} alt={item.image.alt} />
				<h3 className="swiper-title">{ item.title }</h3>
				<div className="swiper-desc">
					{ item.desc }
				</div>
			</div>

		)

    } );
	return (
        <div className={ className }>
            <h2>Swiper</h2>
			<div
				className={`swiper-container hoora-swiper-container hoora-swiper-container`}
				data-autoplay={attributes.autoplay}
				data-delay={attributes.delay}
				data-loop={attributes.loop}
				data-speed={attributes.speed}
				data-effect={attributes.effect}
			>
				<div className="swiper-wrapper hoora-swiper-wrapper">
            		{ itemFields }
				</div>
				<div className="swiper-pagination hoora-swiper-pagination" />
				<div className="hoora-swiper-button-prev swiper-button-prev hoora-swiper-button-prev" />
				<div className="hoora-swiper-button-next swiper-button-next hoora-swiper-button-next" />
			</div>
        </div>
	);
}
