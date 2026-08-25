import { Tabs } from 'antd';
import {useTranslation} from "react-i18next";

import Players from '../component/Players.jsx';
import HomeOverView from '../component/HomeOverView.jsx';
import HomeModInfo from '../component/HomeModInfo.jsx';

import Secondaries from "./Secondaries.jsx";

const HomeDetail = (props) => {
    const {t} = useTranslation()

    const players = props.home?.successinfo?.players || []
    const home = props.home?.successinfo || {
        data: {
            day: t('dstServerList.overview.unknown')
        }
    }
    const mods = props.home?.successinfo?.mods_info || []
    const secondaries = props.home?.successinfo?.secondaries || []

    const items = [
        {
            label: t('dstServerList.tab.overview'),
            key: '1',
            children: (<div>{<HomeOverView home={home}/>}</div>)
        },
        {
            label: t('dstServerList.tab.players'),
            key: '2',
            children: (<div>{<Players players={players} />}</div>)
        },
        {
            label: t('dstServerList.tab.mods'),
            key: '3',
            children: (<div>
                {<HomeModInfo mods={mods}/>}
            </div>)
        },
        {
            label: t('dstServerList.tab.secondaries'),
            key: '4',
            children: <Secondaries secondaries={secondaries} />
        },

    ]

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                centered
                items={items}
            />
        </>
    )
}

export default HomeDetail