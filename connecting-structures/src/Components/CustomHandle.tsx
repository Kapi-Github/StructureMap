import { useMemo } from "react";
import {
  getConnectedEdges,
  Handle,
  Position,
  useNodeId,
  useStore,
} from "reactflow";

const selector = (s: { nodeInternals: any; edges: any }) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

interface Props {
  isConnectable: number;
}

const CustomHandle = ({ isConnectable }: Props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return connectedEdges.length < isConnectable;
    }

    return isConnectable;
  }, [nodeInternals, edges, nodeId, isConnectable]);

  return (
    <Handle
      position={Position.Top}
      isConnectable={isHandleConnectable}
      type={"source"}
    ></Handle>
  );
};

export default CustomHandle;
