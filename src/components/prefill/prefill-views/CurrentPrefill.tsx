import {DYNAMIC_CHECKBOX_GROUP, DYNAMIC_OBJECT} from "../../../constants.ts";
import {Form} from "../../../types/GraphBlueprint.ts";

interface ICurrentPrefill {
    form: Form;
    onSelect: (selectedFieldKey: string) => void;
}

const CurrentPrefill = (props: ICurrentPrefill) => {
    const { form, onSelect } = props;
    const properties = form.field_schema.properties;

    return (
        <div>
            <div key={DYNAMIC_CHECKBOX_GROUP}>{DYNAMIC_CHECKBOX_GROUP}</div>
            <div key={DYNAMIC_OBJECT}>{DYNAMIC_OBJECT}</div>
            {
                Object.keys(properties).map((key) => {
                    if (key !== DYNAMIC_OBJECT && key !== DYNAMIC_CHECKBOX_GROUP) {
                        return <div key={key} onClick={() => onSelect(key)}>{key}</div>
                    }
                })
            }
        </div>
    )
}

export default CurrentPrefill;