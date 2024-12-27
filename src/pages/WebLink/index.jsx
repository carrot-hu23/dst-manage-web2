import {useEffect, useState} from "react";

import {Tabs} from "antd";

import EmbeddedPage from "../System/EmbeddedPage.jsx";
import {getWebLinkListApi} from "../../api/WebLinkApi.jsx";

export default () => {
    // "https://dstserverlist.top/"
    const [links, setLinks] = useState([])
    useEffect(() => {
        getWebLinkListApi("")
            .then(resp => {
                setLinks(resp.data || [])
            }).catch(erorr => {
            console.log(erorr)
        })
    }, [])
    const items = links.map(link => ({
        key: link.url,
        label: link.title,
        children: <div style={{
            width: '100%',
            height: '640px'
        }}>
            <EmbeddedPage url={link.url}
                          width={link.width}
                          height={link.height}
                          title={link.title}/>
        </div>,
    }))

    return <>
        <Tabs defaultActiveKey="1" items={items}/>
    </>
}