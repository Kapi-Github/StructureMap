import {
  useNodesState,
  useEdgesState,
  NodeChange,
  addEdge,
  Node,
  Edge,
  Connection,
  MarkerType,
  NodeProps,
  EdgeProps,
  useReactFlow,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import Structures from "./Components/Structures";
import React, {
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import CustomNode from "./Components/CustomNode";
import CustomEdge from "./Components/CustomEdge";
import CustomGroup from "./Components/CustomGroup";
import "./Styles/Layers.css";
import Options from "./Components/Options";
1;

interface Data {
  nodes: Node[];
  onNodesChange: (changes: NodeChange[]) => void;
  edges: Edge[];
  onConnect: (connection: Connection) => void;
  nodeTypes: Record<string, React.ComponentType<NodeProps>>;
  edgeTypes: Record<string, React.ComponentType<EdgeProps>>;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
}

export const StructuresContext = createContext<Data>({} as Data);

const nodeTypes = {
  CustomNode,
  CustomGroup,
};

const edgeTypes = {
  CustomEdge: CustomEdge,
};

interface OptionsInterface {
  handleObjectOptionClick: (option: string) => void;
  showObjectsOptions: boolean;
  objectsOptions: string[];
  handleOptionClick: (option: string) => void;
  showPosibilities: boolean;
  objectName: string;
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  posibilities: string[][];
  addObject: (posibility: string) => void;
}

export const OptionsContext = createContext<OptionsInterface>(
  {} as OptionsInterface
);

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { getIntersectingNodes } = useReactFlow();

  const [selectedNodes, setSelectedNodes] = useState<Node[] | []>([]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes.map((node) => node));
    },
  });

  const [showObjectsOptions, setShowObjectsOptions] = useState<boolean>(false);
  const [choice, setChoice] = useState<string>("");
  const [objectName, setObjectName] = useState<string>("");
  const [showPosibilities, setShowPosibilities] = useState<boolean>(false);
  const objectsOptions = ["Firma", "Zakład", "Hala", "Linia", "Krok"];
  const posibilities = [
    ["Firma 1", "Firma 2", "Firma 3"],
    ["Zakład 1", "Zakład 2", "Zakład 3"],
    ["Hala 1", "Hala 2", "Hala 3"],
    ["Linia 1", "Linia 2", "Linia 3"],
    ["Krok 1", "Krok 2", "Krok 3"],
  ];
  const [searchValue, setSearchValue] = useState<string>("");

  //Dodawanie połączenia
  const onConnect = useCallback(
    (params: any) =>
      setEdges((els) => {
        params = {
          ...params,
          data: { deleteEdge },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: "black",
          },
          style: {
            strokeWidth: 1,
            stroke: "black",
            opacity: 0.4,
            zIndex: 500,
          },
          type: "CustomEdge",
        };
        return addEdge(params, els);
      }),
    []
  );

  //Usuwanie połączenia
  const deleteEdge = (id: string) => {
    setEdges((prev) => {
      return prev.filter((edge) => edge.id !== id);
    });
  };

  //Dodawanie struktury
  const addStructure = (title: string) => {
    const id = crypto.randomUUID();
    setNodes((prev) => {
      return [
        ...prev,
        {
          id: id,
          data: { id, title, deleteStructure, detachObject },
          label: title,
          type: "CustomNode", //Customowa struktura którą można resizować
          style: {
            background: "#fff",
            border: "1px solid black",
            borderRadius: 5,
            width: 100,
            zIndex: 1000,
          },
          position: { x: 0, y: 0 },
          positionAbsolute: { x: 0, y: 0 },
          parentNode: "",
          extent: undefined,
        },
      ];
    });
  };

  //Usuwanie struktury
  const deleteStructure = (id: string) => {
    setNodes((prev) => {
      return prev.filter((node) => node.id !== id);
    });

    setEdges((prev) => {
      return prev.filter((edge) => edge.source !== id && edge.target !== id);
    });
  };

  //Dodawanie grupy
  const addGroup = (title: string) => {
    const id = crypto.randomUUID();
    setNodes((prev) => {
      return [
        ...prev,
        {
          id: id,
          data: { id, title, deleteGroup },
          type: "CustomGroup",
          position: { x: 0, y: 0 },
          parentNode: "",
          extent: undefined,
          style: {
            border: "1px black solid",
            borderRadius: 5,
            opacity: 0.4,
            width: 150,
            height: 80,
            zIndex: 100,
          },
        },
      ];
    });
  };

  //Usuwanie grupy
  const deleteGroup = (id: string) => {
    setNodes((prev) => {
      return prev
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.parentNode === id) {
            return {
              ...node,
              parentNode: "",
              extent: undefined,
            };
          } else {
            return node;
          }
        });
    });
  };

  //Wyciąganie z grupy
  const detachObject = (id: string) => {
    setNodes((prev) => {
      return prev.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            parentNode: "",
            extent: undefined,
          };
        }
        return node;
      });
    });
  };

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const intersections = getIntersectingNodes(node).map((n) => n.id);
      const type = getIntersectingNodes(node).map((n) => n.type);

      let toChange = !type.includes("CustomNode");

      toChange &&
        setNodes((prev) => {
          return prev.map((nd) => {
            if (nd.id === selectedNodes[0].id) {
              if (intersections.length > 0) {
                return {
                  ...nd,
                  parentNode: intersections[0],
                  extent: "parent",
                };
              } else {
                return {
                  ...nd,
                  parentNode: "",
                  extent: undefined,
                };
              }
            }
            return nd;
          });
        });
    },
    [selectedNodes]
  );

  const handleObjectOptionClick = (option: string) => {
    setShowObjectsOptions((prev) => {
      if (prev) {
        setSearchValue("");
        setChoice("");
        setObjectName("");
        setShowPosibilities(false);
        return false;
      } else {
        return true;
      }
    });
    setChoice(option);
  };

  const handleOptionClick = (optionName: string) => {
    setObjectName(optionName);
    setShowPosibilities((prev) => !prev);
  };

  const addObject = (posibility: string) => {
    setShowObjectsOptions(false);
    setShowPosibilities(false);
    setSearchValue("");
    setChoice("");
    setObjectName("");
    switch (choice) {
      case "Group":
        addGroup(posibility);
        break;
      case "Structure":
        addStructure(posibility);
        break;
      default:
        return;
    }
  };

  return (
    <div className={`w-[100%] h-[100%] relative`}>
      <OptionsContext.Provider
        value={{
          handleObjectOptionClick,
          showObjectsOptions,
          objectsOptions,
          handleOptionClick,
          showPosibilities,
          objectName,
          searchValue,
          setSearchValue,
          posibilities,
          addObject,
        }}
      >
        <Options />
      </OptionsContext.Provider>
      <div className="w-[100%] h-[100%]">
        <StructuresContext.Provider
          value={{
            nodes,
            onNodesChange,
            edges,
            onConnect,
            nodeTypes,
            edgeTypes,
            onNodeDragStop,
          }}
        >
          <Structures />
        </StructuresContext.Provider>
      </div>
    </div>
  );
}

export default App;
