import {Edge} from "../types/GraphBlueprint.ts";
import {ParentMap} from "../types/ParentMap.ts";

export const buildParentMap = (edges: Edge[]): ParentMap => {
    const parentMap: ParentMap = {};

    edges.forEach(edge => {
        const { source, target } = edge;
        if (!parentMap[target]) {
            parentMap[target] = [];
        }
        parentMap[target].push(source);
    });

    return parentMap;
};


export const findAncestors = (nodeId: string, parentMap: ParentMap): string[] => {
    const parents = parentMap[nodeId] || [];
    const ancestors: string[] = [];

    parents.forEach(parent => {
        ancestors.push(parent);
        ancestors.push(...findAncestors(parent, parentMap));  // recursively find all ancestors
    });

    return ancestors;
}