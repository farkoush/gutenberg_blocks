export default function save({ attributes, className }) {
	// const { services } = attributes;
    const locationFields = attributes.locations.map( ( location, index ) => {
        return <p key={ index }>{ location.address } { location.city }</p>;
    } );
	return (
        <div className={ className }>
            <h2>Block</h2>
            { locationFields }
        </div>
		// <section className={className}>
		// 	{services.length > 0 &&
				// services.map((service) => {
					// return (
						// <div className="card-block" data-index={service.index}>
						// 	<h3>{service.headline}</h3>
						// 	<div className="card-content">{service.description}</div>
                        // </div>
					// );
				// })}
		// </section>
	);
}
