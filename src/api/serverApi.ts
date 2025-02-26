import axios from "axios";
import {GRAPH_URL} from "../constants";
import {GraphBlueprint} from "../types/GraphBlueprint";

export const fetchActionBlueprintGraph = async (): Promise<GraphBlueprint> => {
    const res = await axios.get(GRAPH_URL);
    return res.data;
}