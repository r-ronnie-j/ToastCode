import React, { useContext } from "react"
import { RequestContext } from "../../../context/requestContext"
import JsonXmlCodeComponent from "../../../component/CodeComponent/JsonCodeComponent"


export default function BodyRaw({ raw }: { raw: number }) {
    let request = useContext(RequestContext)
    return <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "row"
    }}>
        {raw === 0 &&
            <JsonXmlCodeComponent
                type="json"
                flex={1}
                setValue={(v) => {
                    request.data.json = v
                    request.setData({ ...request.data })
                }}
                id="j"
                border={false}
                value={request.data.json || ""}
            />
        }
        {raw === 1 &&
            <JsonXmlCodeComponent
                type="xml"
                flex={1}
                setValue={(v) => {
                    request.data.xml= v
                    request.setData({ ...request.data })
                }}
                id="k"
                value={request.data.xml ?? ""}
                border={false}
            />
        }
        {raw === 2 &&
            <JsonXmlCodeComponent
                type="text"
                flex={1}
                setValue={(v) => {
                    request.data.text = v
                    request.setData({ ...request.data })
                }}
                id="l"
                value={request.data.text ?? ""}
                border={false}
            />
        }
        {raw === 3 &&
            <JsonXmlCodeComponent
                type="html"
                flex={1}
                setValue={(v) => {
                    request.data.html = v
                    request.setData({ ...request.data })
                }}
                id="m"
                value={request.data.html ?? ""}
                border={false}
            />
        }
        {raw === 4 &&
            <JsonXmlCodeComponent
                type="javascript"
                flex={1}
                setValue={(v) => {
                    request.data.js = v
                    request.setData({ ...request.data })
                }}
                id="n"
                value={request.data.js ?? ""}
                border={false}
            />
        }
    </div>

}