import { inspect } from 'util-ex';
import { ApiData } from '../../common/interfaces/apiRequests';
import { HttpMethod, Https } from '../../common/constants/enums/methodsEnums';
import { FormDataItem, RequestDataType, TimeOutType } from '../../common/constants/enums/variableEnums';
import { FormDataType, KeyValueCheckRecord } from '../../common/interfaces/variables';

export default function formDefaultText(x: ApiData): string {
    try {
        return [
            x.name.trim() !== "" ? `name='${x.name.trim()}'` : '',
            `method = HttpMethod.${HttpMethod[x.method]}`,
            `url = "${x.url.trim()}"`,
            `https = Https['${Https[x.https]}']`,
            `headers = ${formHeaderParamsEncoded(x.headers)}`,
            `params = ${formHeaderParamsEncoded(x.params)}`,
            Object.keys(x.path ?? {}).length !== 0 ? `path = ${inspect(x.path)}` : '',
            `timeout = ${x.timeout}`,
            `timeoutType = TimeOutType.${TimeOutType[x.timeoutType]}`,
            `requestDataType = RequestDataType.${RequestDataType[x.requestDataType]}`,
            x.js ? `js = \`${x.js.replace("`", "\`")}\`` : '',
            x.html ? `html = \`${x.html}\`` : '',
            x.text ? `text = "${x.text}"` : '',
            x.formData.length > 0 ? `formData = ${formFormData(x.formData)}` : '',
            x.binary ? `binary = ${x.binary}` : '',
            x.urlEncoded ? `urlEncoded = ${formHeaderParamsEncoded(x.urlEncoded)}` : '',
            x.json ? `json = \`${x.json}\`` : '',
            x.xml ? `xml = \`${x.xml}\`` : '',
            x.requestCookies.length > 0 ? `requestCookies = ${inspect(x.requestCookies)}` : '',
        ]
            .filter(Boolean)
            .join('\n');
    } catch (err) {
        return "error:true";
        console.log("err", err);
    }
}

export function formHeaderParamsEncoded(v: KeyValueCheckRecord[]) {
    let result: any = {};

    for (let x of v) {
        if (x.enabled) {
            result[x.key] = x.value;
        } else {
            result[x.key] = {
                value: x.value,
                enabled: x.enabled,
            };
        }
    }

    return inspect(result);
}



export function formFormData(x: FormDataType[]) {
    let fData: any = {};
    for (let f of x) {
        if (f.enabled) {
            if (
                f.type === FormDataItem.file ||
                f.type === FormDataItem.json ||
                f.type === FormDataItem.xml
            ) {
                fData[f.key] = {
                    type: f.type,
                    value: f.value,
                };
            } else {
                fData[f.key] = f.value;
            }
        } else {
            fData[f.key] = {
                type: f.type,
                value: f.value,
                enabled: f.enabled
            };
        }
    }
    console.log("we are checking", fData);
    return inspect(fData);
}



