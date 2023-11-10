import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "reactflow";

function CustomEdge({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  }); //getSmoothStepPath-prostopadłe połączenia, getBezierPath - zaokrąglone połączenia, getStraightPath - proste połączenia

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style }} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className={`absolute pointer-events-auto w-[14px] h-[14px] rounded-full bg-[#F4EEEE] flex justify-center items-center`}
        >
          <button onClick={() => data.deleteEdge(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
              />
            </svg>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
