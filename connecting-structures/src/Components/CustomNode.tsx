import { memo } from "react";
import { NodeResizer } from "reactflow";
import "./../Styles/Layers.css";
import CustomHandle from "./CustomHandle";

interface Props {
  data: {
    id: string;
    title: string;
    deleteStructure: (id: string) => void;
    detachObject: (id: string) => void;
  };
  selected: boolean;
}

export const theme = {
  buttons: `text-[0.4rem] border-[1px] border-gray-700 rounded-[4px] py-[1px] px-[5px] bg-gray-300 hover:bg-gray-100 transition-bg duration-200 ease-in-out`,
};

const CustomNode = ({ data, selected }: Props) => {
  return (
    <>
      <NodeResizer
        color="black"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <CustomHandle isConnectable={1} />
      <div className={`relative h-[100%] w-[100%] min-h-[10px]`}>
        <h1 className={`flex justify-center items-center h-[100%] w-[100%]`}>
          {data.title}
        </h1>
        {selected && (
          <div
            className={`absolute top-[-3px] translate-y-[-100%] left-[50%] flex gap-[1px]`}
          >
            <button
              className={`${theme.buttons}`}
              onClick={() => data.deleteStructure(data.id)}
            >
              Delete
            </button>
            <button
              className={`${theme.buttons} w-["50%"]`}
              onClick={() => data.detachObject(data.id)}
            >
              Detach
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CustomNode);
