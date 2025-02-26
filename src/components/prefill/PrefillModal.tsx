import {useState} from "react";
import { Form, NodeItem } from "../../types/GraphBlueprint";
import CurrentPrefill from "./prefill-views/CurrentPrefill.tsx";
import PrefillConfiguration from "./prefill-views/PrefillConfiguration.tsx";

interface IPrefillModalProps {
    node: NodeItem;
    form: Form;
    show: boolean;
    onClose: () => void;
}

const PrefillModal = (props: IPrefillModalProps) => {
    const { node, form, show, onClose } = props;

    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    return (
        <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"}>Prefill Information</h5>
                        {/*TODO: Replace this with generic component*/}
                        <button type="button" className={"btn-close"} aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className={"modal-body"}>
                        <div className={"d-flex"}>
                            {
                                selectedKey
                                    ? <PrefillConfiguration formId={node.id} onSubmit={() => {console.log('submit')}}/>
                                    : <CurrentPrefill form={form} onSelect={(key) => setSelectedKey(key)}/>
                            }
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        {/*TODO: Replace this with generic component*/}
                        <button type="button" className={"btn btn-secondary"} onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrefillModal;

