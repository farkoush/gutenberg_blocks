export default function save({ attributes, className }) {
	// const { services } = attributes;
    const locationFields = attributes.locations.map( ( location, index ) => {
        // return <p key={ index }>{ location.address } { location.city }</p>;
        return <div key={ index }><p>{ location.address }</p> <p>{ location.city }</p><img src={location.image.thumbnailUrl}/></div>;

    } );
	return (
        <div className={ className }>
            <h2>Repeater Field</h2>
            { locationFields }
        </div>
	);
}
