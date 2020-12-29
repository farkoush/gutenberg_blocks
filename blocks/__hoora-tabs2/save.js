export default function save({ attributes, className }) {
    const itemFields = attributes.items.map( ( item, index ) => {
        return (
			<div>
				<div class="tab-container" key={ index }>

					<ul class="tabs">
						<li class="tab-link current" data-tab={`tab-${index}`}>{ item.title }</li>
					</ul>
					
					<div className="tab-panel">
						<div id={`tab-${index}`} class="tab-content current">
							{ item.desc }
							<img src={item.image.url} alt={item.image.alt} />
						</div>

					</div>

				</div>
			</div>
		)

    } );
	return (
        <div className={'hoora-tab-save'}>
            <h2>Tab panel</h2>
			<div
				className={`tabs-container hoora-tab-container hoora-tab-container`}
				// data-autoplay={attributes.autoplay}
				// data-delay={attributes.delay}
				// data-loop={attributes.loop}
				// data-speed={attributes.speed}
				// data-effect={attributes.effect}
			>
				<div className="swiper-wrapper hoora-swiper-wrapper">
            		{ itemFields }
				</div>
			</div>
        </div>
	);
}
