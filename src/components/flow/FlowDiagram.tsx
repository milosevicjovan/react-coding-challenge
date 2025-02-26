import {useGraphStore} from "../../stores/useGraphStore";
import {useEffect, useState} from "react";
import ReactFlow, {Background, NodeTypes, ReactFlowProvider} from "reactflow";
import {Form, NodeItem} from "../../types/GraphBlueprint.ts";
import PrefillModal from "../prefill/PrefillModal.tsx";
import Node from "./Node.tsx";

const nodeTypes: NodeTypes = {
    form: Node,
};

const FlowDiagram = () => {
    // Local
    const [showPrefill, setShowPrefill] = useState(false);
    const [selectedNodeItem, setSelectedNodeItem] = useState<NodeItem | null>(null);
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);

    const nodes = useGraphStore((state) => state.nodes);
    const edges = useGraphStore((state) => state.edges);
    const forms = useGraphStore((state) => state.forms);
    const loading = useGraphStore((state) => state.loading);
    const error = useGraphStore((state) => state.error);
    const fetchGraph = useGraphStore((state) => state.fetchGraph);

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    const onNodeClick = (_: React.MouseEvent, node: any) => {
        const nodeItem = nodes.find((nodeItem) => nodeItem.id === node.id);
        const form = forms.find((form) => form.id === nodeItem?.data.component_id);
        if (nodeItem && form) {
            setSelectedNodeItem(nodeItem);
            setSelectedForm(form);
            setShowPrefill(true);
        }
    }

    return (
        <ReactFlowProvider>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={onNodeClick}>
                <Background />
            </ReactFlow>

            {
                selectedNodeItem && selectedForm && showPrefill && (
                    <PrefillModal node={selectedNodeItem} form={selectedForm} show={true} onClose={() => setShowPrefill(false)}/>
                )
            }
        </ReactFlowProvider>
    )
}

export default FlowDiagram;