import { Handle, Position } from "reactflow";

interface INodeProps {
    data: {
        name: string;
    }
}

const Node = (props: INodeProps) => {
    return (
        <div className={"d-flex w-100 p-2 border solid"}>
            <h3>{props.data.name}</h3>
            <Handle type="target" position={Position.Left} className="p-1 bg-dark rounded-circle"/>
            <Handle type="source" position={Position.Right} className="p-1 bg-dark rounded-circle"/>
        </div>
    );
}

export default Node;