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
                console.log("The doc path we are getting is ", f.value, filePath, docPath);
                if (filePath.exists && filePath.isFile) {
                    let x = await openAsBlob(filePath.path);
                    formdata.append(f.key, x);
                }
            } else {
                formdata.append(f.key, String(f.value));
            }
        }
    }
    return formdata;
}