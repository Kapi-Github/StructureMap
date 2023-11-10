import { memo } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

interface Props {
  data: {
    id: string;
    title: string;
    deleteGroup: (id: string) => void;
  };
  selected: boolean;
}

const CustomGroup = ({ data, selected }: Props) => {
  return (
    <>
      <NodeResizer
        color="black"
        isVisible={selected}
        minWidth={150}
        minHeight={80}
      />
      <Handle type="source" position={Position.Top} />
      <div
        className={`relative h-[100%] w-[100%] min-h-[10px] bg-white rounded-[5px]`}
      >
        <h1
          className={`absolute top-[-3px] translate-y-[-100%] translate flex justify-center items-center`}
        >
          {data.title}
        </h1>
        {selected && (
          <button
            className={`absolute top-[-3px] translate-y-[-100%] left-[100%] translate-x-[-100%] text-[0.5rem] border-[1px] border-gray-700 rounded-[4px] py-[1px] px-[5px] bg-gray-300 hover:bg-gray-100 transition-bg duration-200 ease-in-out`}
            onClick={() => data.deleteGroup(data.id)}
          >
            Delete
          </button>
        )}
      </div>
      <Handle type="target" position={Position.Bottom} />
    </>
  );
};

export default memo(CustomGroup);
