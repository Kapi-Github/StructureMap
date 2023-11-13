import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
} from "reactflow";
import { useContext } from "react";
import { StructuresContext } from "../App";

const Structures = () => {
    const {
        nodes,
        onNodesChange,
        edges,
        onConnect,
        nodeTypes,
        edgeTypes,
        onNodeDragStop,
    } = useContext(StructuresContext);

    return (
        <ReactFlow
            style={{ backgroundColor: "#F4EEEE" }}
            onConnect={onConnect}
            nodes={nodes}
            nodesConnectable
            nodeTypes={nodeTypes}
            onNodeDragStop={onNodeDragStop}
            edges={edges}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            fitView //Po dodaniu nodea ustawia go na środku
            // snapToGrid //Podczas przesuwania dopasowywuje się do grida
            translateExtent={[
                //Rozmiar pola edycyjnego
                [-2000, -2000],
                [2000, 2000],
            ]}
        >
            <MiniMap />
            <Controls />
            <Background
                color="gray"
                variant={BackgroundVariant.Cross} //Cross, Lines, Dots(default)
                size={30}
                gap={30}
                lineWidth={0.2}
            />
        </ReactFlow>
    );
};

export default Structures;
