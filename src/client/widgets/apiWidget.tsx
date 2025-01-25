import React from "react"
import MainWidget from "./mainWidget"
import AddButtonGroup from "../component/Button/AddButtonGroup"

export default function ApiWidget({ rawData, onDelete, addAtIndex }: {
    rawData: string[],
    onDelete: (a: number, b: { name: string, path: string }[],c:string) => void,
    addAtIndex: (a: number) => void,
}) {

    return <div>
        <AddButtonGroup
            actions={[
                {
                    label: "Request",
                    action: () => {
                        addAtIndex(0)
                    }
                }
            ]}
        />
        {
            rawData.map((item, index) => {
                return <React.Fragment>
                    <MainWidget raw={item} index={index} onDelete={onDelete} key={item} />
                    <AddButtonGroup
                        actions={[
                            {
                                label: "Request",
                                action: () => {
                                    addAtIndex(index + 1)
                                }
                            }
                        ]}
                    />
                </React.Fragment>
            })
        }
    </div>
}