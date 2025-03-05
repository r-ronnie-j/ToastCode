import { openAsBlob } from "fs";
import { resolvePath } from "./resolvePath";
import { FormDataType } from "../../../common/interfaces/variables";
import { FormDataItem } from "../../../common/constants/enums/variableEnums";

export default async function getFormData(form: FormDataType[], docPath: string): Promise<FormData> {
    let formdata = new FormData();
    for (let f of form) {
        if (f.enabled && f.key.trim() !== "" && f.value.trim() !== "") {
            if (f.type === FormDataItem.file) {
                let filePath = await resolvePath(f.value, docPath);
                if (filePath.exists && filePath.isFile) {
                    let x = await openAsBlob(filePath.path);
                    let file = new File([x],filePath.name,{
                        type:x.type
                    });
                    formdata.append(f.key, file);

                }
            } else {
                formdata.append(f.key, String(f.value));
            }
        }
    }
    return formdata;
}