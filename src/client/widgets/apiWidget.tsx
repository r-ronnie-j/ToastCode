import React, { useEffect, useState } from "react"
import getRawRequestsHandler from "../handler/eventHandler/apis/rawRequestHandler"
import MainWidget from "./mainWidget"

export default function ApiWidget({ rawData }: { rawData: string[] }) {

    return <div>
        {
            rawData.map((item, index) => {
                return <MainWidget raw={item} index={index} onDelete={async () => {

                }} />
            })
        }
    </div>
}