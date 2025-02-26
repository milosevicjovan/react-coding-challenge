import React from "react";
import {DYNAMIC_CHECKBOX_GROUP, DYNAMIC_OBJECT} from "../../../constants.ts";
import {useGraphStore} from "../../../stores/useGraphStore.ts";
import {findAncestors} from "../../../utils/ParentMapUtils.ts";

interface IPrefillConfiguration {
    formId: string;
    onSubmit: (key: string, formId: string) => void;
}

const PrefillConfiguration = (props: IPrefillConfiguration) => {
    const { formId } = props;

    const nodes = useGraphStore((state) => state.nodes);
    const forms = useGraphStore((state) => state.forms);
    const parentMap = useGraphStore((state) => state.parentMap);

    const ancestors = findAncestors(formId, parentMap);

    const getFormIdFromAncestorId = (ancestorId: string) => {
        const node = nodes.find((node) => node.id === ancestorId)!;
        const formId = node?.data.component_id;
        return formId ?? null;
    }

    const showFieldsForSelectedForm = (formId: string | null) => {
        if (!formId) {
            return [];
        }
        const form = forms.find((form) => form.id === formId);
        if (!form) {
            return [];
        }
        const properties = form.field_schema.properties;
        const result = Object.keys(properties).filter((key) => key !== DYNAMIC_CHECKBOX_GROUP && key !== DYNAMIC_OBJECT);
        console.log(result);
        return result;
    }

    return (
        // TODO: Create generic component for dropdown
        <div className="d-flex flex-column">
            {
                ancestors.map((ancestorId) => {
                    const formName = nodes.find((node) => node.id === ancestorId)?.data.name;
                    const formId = getFormIdFromAncestorId(ancestorId);
                    const fields = showFieldsForSelectedForm(formId);

                    if (formName) {
                        return (
                            <React.Fragment key={ancestorId}>
                                <div className="fw-bold">{formName}</div>
                                {
                                    fields.map((key) => (
                                        <div key={`${ancestorId}-${key}`}>{key}</div>
                                    ))
                                }
                            </React.Fragment>
                        );
                    }
                    return null;
                })
            }
        </div>
    )
}

export default PrefillConfiguration;