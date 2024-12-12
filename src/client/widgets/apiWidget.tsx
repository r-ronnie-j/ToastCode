import React, { useEffect, useState } from "react"
import getRawRequestsHandler from "../handler/eventHandler/apis/rawRequestHandler"
import MainWidget from "./mainWidget"

export default function ApiWidget() {
    let [rawData, setRawData] = useState<string[]>([])
    useEffect(() => {
        getRawRequestsHandler().then((a) => {
            setRawData(a)
        })
    }, [])
    return <div>
        {
            rawData.map((item, index) => {
                return <MainWidget raw={item} index={index} onDelete={async () => {

                }} />
            })
        }
    </div>
}