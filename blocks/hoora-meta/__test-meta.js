const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginDocumentSettingPanel } = wp.editPost;
const { compose } = wp.compose;
const { withSelect, select, withDispatch } = wp.data;

const FieldsTestControl = compose( [
    withSelect( () => {
        return {
            newValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )._metakey,
        };
    } ),
    withDispatch( ( dispatch ) => ( {
        updateMeta( value ) {
            dispatch( 'core/editor' ).editPost(
                { meta: { _metakey:{
                    'one': value.one,
                    'two': value.two,
                } } }
            );
        },
    } ) ),
] )( TestControl );

const TestPanel = () => {
    return (
        <PluginDocumentSettingPanel
            name="test"
            title="Test"
            className="test"
        >
        <FieldsTestControl />
        </PluginDocumentSettingPanel>
    );
};

registerPlugin( 'test-panel', {
  render: TestPanel,
  icon: 'screenoptions',
} );