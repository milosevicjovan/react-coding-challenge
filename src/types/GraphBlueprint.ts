// Root Interface
export interface GraphBlueprint {
    $schema: string;
    id: string;
    tenant_id: string;
    name: string;
    description: string;
    category: string;
    nodes: NodeItem[];
    edges: Edge[];
    forms: Form[];
    branches: Branch[];
    triggers: Trigger[];
}

// Node Interfaces
export interface NodeItem {
    id: string;
    type: string;
    position: Position;
    data: NodeData;
}

export interface Position {
    x: number;
    y: number;
}

export interface NodeData {
    id: string;
    component_key: string;
    component_type: string;
    component_id: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: Record<string, unknown>;
    sla_duration: SLADuration;
    approval_required: boolean;
    approval_roles: string[];
}

export interface SLADuration {
    number: number;
    unit: 'minutes' | 'hours' | 'days';
}

// Edge Interfaces
export interface Edge {
    id: string;
    source: string;
    target: string;
}

// Form Interfaces
export interface Form {
    id: string;
    name: string;
    description: string;
    is_reusable: boolean;
    field_schema: FieldSchema;
    ui_schema: UISchema;
    dynamic_field_config: DynamicFieldConfig;
}

export interface FieldSchema {
    type: 'object';
    properties: Record<string, FieldProperty>;
    required: string[];
}

export interface FieldProperty {
    avantos_type: string;
    title?: string;
    type: string;
    format?: string;
    enum?: string[] | null;
    items?: FieldItems;
    uniqueItems?: boolean;
}

export interface FieldItems {
    enum: string[];
    type: string;
}

export interface UISchema {
    type: 'VerticalLayout' | string;
    elements: UIElement[];
}

export interface UIElement {
    type: 'Control' | 'Button';
    scope: string;
    label: string;
    options?: UIOptions;
}

export interface UIOptions {
    format?: 'multi-select';
}

// Dynamic Field Configuration
export interface DynamicFieldConfig {
    [key: string]: {
        selector_field: string;
        payload_fields: Record<string, PayloadField>;
        endpoint_id: string;
    };
}

export interface PayloadField {
    type: string;
    value: string;
}

// Branches and Triggers (Currently Empty)
export interface Branch {}
export interface Trigger {}
