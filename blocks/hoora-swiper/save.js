export default function save({ attributes, className }) {
	// const { services } = attributes;
    const locationFields = attributes.locations.map( ( location, index ) => {
        // return <p key={ index }>{ location.address } { location.city }</p>;
        return <div key={ index }><p>{ location.address }</p> <p>{ location.city }</p><img src={location.image.thumbnailUrl}/></div>;

    } );
	return (
        <div className={ className }>
            <h2>Swiper</h2>
            { locationFields }
        </div>
	);
}

	// save: function(props) {
	// 	const { list,lists,image,images, autoplay, loop, speed, delay, effect, titles, title } = props.attributes;
	// 	return (
	// 		<div
	// 			className={`swiper-container hoora-swiper-container hoora-swiper-container`}
	// 			data-autoplay={autoplay}
	// 			data-delay={delay}
	// 			data-loop={loop}
	// 			data-speed={speed}
	// 			data-effect={effect}
	// 		>
	// 			<div className="swiper-wrapper hoora-swiper-wrapper">
	// 				{images.map((image, index) => {
	// 					console.log("imageee" + image.alt);
	// 					return (
	// 						<div className="swiper-slide hoora-swiper-slide">
	// 							<img src={image.url} alt={image.alt} />
	// 							{/* <h3 className="card__title">{ title }</h3> */}
	// 							{/* <div className="card__body">
	// 								{ body }
	// 							</div> */}
	// 						</div>
	// 					);
	// 				})}
	// 			</div>
	// 			<div className="swiper-pagination hoora-swiper-pagination" />
	// 			<div className="hoora-swiper-button-prev swiper-button-prev hoora-swiper-button-prev" />
	// 			<div className="hoora-swiper-button-next swiper-button-next hoora-swiper-button-next" />
	// 		</div>
	// 	);
	// }
