import { Tabs } from 'antd';

import Players from '../component/Players.jsx';
import HomeOverView from '../component/HomeOverView.jsx';
import HomeModInfo from '../component/HomeModInfo.jsx';

const HomeDetail = ({home}) => {

    const players = home.Players || []
    const mods = home.ModsInfo || []

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
        // {
        //     label: '从世界',
        //     key: '4',
        //     children: <Secondaries secondaries={secondaries} />
        // },

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