/**
 * BLOCK: Kadence Tab
 *
 * Registering a basic block with Gutenberg.
 */

const {
	InnerBlocks,
} = wp.blockEditor;
const {
	Fragment,
} = wp.element;
const {
	Component,
} = wp.element;
const { withSelect, withDispatch, select } = wp.data;
const { compose } = wp.compose;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const kttabUniqueIDs = [];
/**
 * Build the spacer edit
 */
class KadenceTab extends Component {
	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kttabUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else if ( kttabUniqueIDs.includes( this.props.attributes.uniqueID ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kttabUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else {
			kttabUniqueIDs.push( this.props.attributes.uniqueID );
		}
	}
	render() {
		const { attributes: { id, uniqueID, activeTab }, clientId, parentClientId  } = this.props;
		const hasChildBlocks = wp.data.select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0;
		// console.log('fffff');
		const parentAttributes = select('core/block-editor').getBlockAttributes( parentClientId ); //Pass the Parents CLient Id from above and get all Parent attributes
		// const blockHasParent = ( clientId ) => clientId !== wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId );
		// console.log(id);
		// console.log('parentAttributes.currentTab');
		// console.log(parentAttributes.currentTab)
		return (
			// id === parentAttributes.currentTab &&
			<Fragment>
				<div className={ `kt-tab-inner-content kt-inner-tab-${ id } kt-inner-tab${ uniqueID }` } >
					<InnerBlocks
						templateLock={ false }
						renderAppender={ (
							hasChildBlocks ?
								undefined :
								() => <InnerBlocks.ButtonBlockAppender />
						) } />
				</div>
			</Fragment>
		);
	}
}
export default compose( [
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const {
			getBlockHierarchyRootClientId,
		} = select( 'core/block-editor' );
		return{
			parentClientId : getBlockHierarchyRootClientId( clientId )
		}
	} ),

] )( KadenceTab );
