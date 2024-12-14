import React from "react";

import BodyReadFormData from "./BodyReadFormData";
import BodyReadUrlEncoded from "./BodyReadUrlEncoded";
import BodyNone from "../requestWidget/BodyWidget/BodyNone";
import BodyBinary from "../requestWidget/BodyWidget/BodyBinary";
import { ApiData } from "../../../common/interfaces/apiRequests";
import { RequestDataType } from "../../../common/constants/enums/variableEnums";
import JsonXmlRenderer from "../../component/CodeComponent/JsonXmlRenderer";

export default function BodyViewer({ request, title }:
    { request: ApiData, title: string }
) {

    const renderBodyTypeContent = () => {
        if (request.requestDataType === RequestDataType.binary) {
            return <BodyBinary />
        } else if (request.requestDataType === RequestDataType.formData) {
            return <BodyReadFormData formData={request.formData} />
        } else if (request.requestDataType === RequestDataType.urlEncoded) {
            return <BodyReadUrlEncoded data={request.urlEncoded} />
        } else if (request.requestDataType === RequestDataType.rawJson) {
            return <JsonXmlRenderer type="json" value={request.json ?? ""} key={`request-json-${request.nonce}`} />
        } else if (request.requestDataType === RequestDataType.rawXml) {
            return <JsonXmlRenderer type="xml" value={request.json ?? ""} key={`request-xml-${request.nonce}`} />
        } else if (request.requestDataType === RequestDataType.rawHtml) {
            return <JsonXmlRenderer type="html" value={request.json ?? ""} key={`request-html-${request.nonce}`} />
        } else if (request.requestDataType === RequestDataType.rawJs) {
            return <JsonXmlRenderer type="javascript" value={request.json ?? ""} key={`request-js-${request.nonce}`} />
        } else {
            return <BodyNone />
        }
    };

    return (
        <div style={{
            width: "100%",
            marginTop: "10px",
        }}>
            <h3 style={{
                marginLeft: "10px"
            }}>{title}</h3>
            <div style={{ marginTop: "20px" }}>{renderBodyTypeContent()}</div>
        </div>
    )
};