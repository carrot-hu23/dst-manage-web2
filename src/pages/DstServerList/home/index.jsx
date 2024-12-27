import { Tabs } from 'antd';

import Players from '../component/Players.jsx';
import HomeOverView from '../component/HomeOverView.jsx';
import HomeModInfo from '../component/HomeModInfo.jsx';

import Secondaries from "./Secondaries.jsx";

const HomeDetail = (props) => {

    const players = props.home?.successinfo?.players || []
    const home = props.home?.successinfo || {
        data: {
            day: '未知'
        }
    }
    const mods = props.home?.successinfo?.mods_info || []
    const secondaries = props.home?.successinfo?.secondaries || []

    const items = [
        {
            label: '概要',
            key: '1',
            children: (<div>{<HomeOverView home={home}/>}</div>)
        },
        {
            label: '玩家',
            key: '2',
            children: (<div>{<Players players={players} />}</div>)
        },
        {
            label: '模组',
            key: '3',
            children: (<div>
                {<HomeModInfo mods={mods}/>}
            </div>)
        },
        {
            label: '从世界',
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