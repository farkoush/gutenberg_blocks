const { withSelect } = wp.data;

import BlockItem from "./BlockItem";

const BlockList = ({ blocks, clientId }) => {
  const blockItems = blocks.map(block => {
    if (block.clientId == clientId)
    return <BlockItem block={block} />;
  });
  return <ul className="jsforwp-toc">{blockItems}</ul>;
};

export default withSelect(select => {
  return {
    blocks: select("core/editor").getBlocks()
  };
})(BlockList);
