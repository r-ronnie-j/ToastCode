// import Https from '../../common/constants/https';
// import { TimeOutType } from '../../common/constants/configTypes';
// import { ApiData, FormDataType, KeyValueCheckRecord } from '../../common/interface';
// import { HttpMethod } from '../../common/constants/methods';
// import { inspect } from 'util-ex';
// import { FormDataItem } from '../../common/constants/requestDataType';

// export default function formDefaultText(x: ApiData): string {
//     try {
//         return [
//             x.name.trim() !== "" ? `name='${x.name}'` : '',
//             `method = HttpMethod.${HttpMethod[x.method]}`,
//             `url = "${x.url}"`,
//             `https = Https['${Https[x.https]}']`,
//             `headers = ${formHeaderParamsEncoded(x.headers)}`,
//             `params = ${formHeaderParamsEncoded(x.params)}`,
//             Object.keys(x.path ?? {}).length !== 0 ? `path = ${inspect(x.path)}` : '',
//             `timeout = ${x.timeout}`,
//             `timeoutType = TimeOutType.${TimeOutType[x.timeoutType]}`,
//             x.js ? `js = ${x.js}` : '',
//             x.html ? `html = ${x.html}` : '',
//             x.text ? `text = ${x.text}` : '',
//             x.formData.length > 0 ? `formData = ${formFormData(x.formData)}` : '',
//             x.binary ? `binary = ${x.binary}` : '',
//             x.urlEncoded ? `urlEncoded = ${formHeaderParamsEncoded(x.urlEncoded)}` : '',
//             x.json ? `json = ${x.json}` : '',
//             x.xml ? `xml = ${x.xml}` : '',
//             x.requestCookies.length > 0 ? `requestCookies = ${inspect(x.requestCookies)}` : '',
//         ]
//             .filter(Boolean)
//             .join('\n');
//     } catch (err) {
//         return "error:true"
//         console.log("err", err);
//     }
// }

// export function formHeaderParamsEncoded(v: KeyValueCheckRecord[]) {
//     let result: any = {};

//     for (let x of v) {
//         if (x.enabled) {
//             result[x.key] = x.value;
//         } else {
//             result[x.key] = {a
//                 value: x.value,
//                 enabled: x.enabled,
//             };
//         }
//     }

//     return inspect(result);
// }



// export function formFormData(x: FormDataType[]) {
//     let fData: any = {};
//     for (let f of x) {
//         if (f.enabled) {
//             if (
//                 f.type === FormDataItem.file ||
//                 f.type === FormDataItem.json ||
//                 f.type === FormDataItem.xml
//             ) {
//                 fData[f.key] = {
//                     type: f.type,
//                     value: f.value,
//                 };
//             } else {
//                 fData[f.key] = f.value;
//             }
//         } else {
//             fData[f.key] = {
//                 type: f.type,
//                 value: f.value,
//                 enabled: f.enabled
//             };
//         }
//     }
//     return inspect(fData);
// }
