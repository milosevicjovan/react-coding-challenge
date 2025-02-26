import {Edge, Form, GraphBlueprint, NodeItem} from "../types/GraphBlueprint";
import {create} from "zustand";
import {fetchActionBlueprintGraph} from "../api/serverApi";
import {ParentMap} from "../types/ParentMap.ts";
import {buildParentMap} from "../utils/ParentMapUtils.ts";

interface GraphState {
    graphData: GraphBlueprint | null;
    nodes: NodeItem[];
    edges: Edge[];
    parentMap: ParentMap;
    forms: Form[];
    loading: boolean;
    error: string | null;
    fetchGraph: () => Promise<void>;
}

export const useGraphStore = create<GraphState>((set) => ({
    graphData: null,
    nodes: [],
    edges: [],
    parentMap: {},
    forms: [],
    loading: false,
    error: null,

    fetchGraph: async () => {
        set({ loading: true, error: null });

        try {
            const data = await fetchActionBlueprintGraph();

            const parentMap = buildParentMap(data.edges);

            const edges = data.edges.map((edge) => ({
                id: crypto.randomUUID(),
                source: edge.source,
                target: edge.target,
                animated: true,
            }));

            set({
                graphData: data,
                nodes: data.nodes,
                edges: edges,
                parentMap: parentMap,
                forms: data.forms,
                loading: false
            });
        } catch (e) {
            set({ error: `Failed to fetch GraphBlueprint data.`, loading: false });
        }
    }
}));