const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { Button, Modal } = wp.components;
const { withDispatch } = wp.data;
const { compose, withState } = wp.compose;

const AddControls = ({
  isOpen,
  setState,
  layout,
  resetBlocks,
  insertBlocks
}) => {
  return (
    <Fragment>
      <Button isLink isDestructive onClick={() => setState({ isOpen: true })}>
        {"Add Item"}
      </Button>
      {isOpen && (
        <Modal
          className="layout-switcher-reset"
          title="Warning!"
          onRequestClose={() => setState({ isOpen: false })}
        >
          <p>
            This action will remove all blocks
            <strong>This can be undone before leaving the page with the Undo option.</strong>
          </p>
          <p>
            <Button
              isDefault
              onClick={() => { 
                // resetBlocks([]);
                insertBlocks(layout);
                setState({ isOpen: false });
              }}
            >
            Add Item
            </Button>
          </p>
        </Modal>
      )}
    </Fragment>
  );
};
export default compose(
  withState({
    isOpen: false
  }),
  withDispatch(dispatch => {
    const { resetBlocks, insertBlocks } = dispatch("core/block-editor");
    return {
    //   resetBlocks,
      insertBlocks
    };
  })
)(AddControls);
