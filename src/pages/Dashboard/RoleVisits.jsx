import {useTheme} from "../../hooks/useTheme";
import {ProCard} from "@ant-design/pro-components";
import EChartComponent from "./EChartComponent.jsx";

export default ({chartData, title}) => {

    const t = useTheme()

    const data = chartData.map(item => ({
        name: item.label,
        value: item.value
    }))
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '2%',
            left: 'left',
            color: t.theme === 'dark' ? '#141414' : '#fff'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    // borderColor: t.theme === 'dark' ? '#141414' : '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: 'center',
                    color: t.theme !== 'dark' ? '#141414' : '#fff'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    }
                },
                // labelLine: {
                //     show: false
                // },
                data: data
            }
        ]
    };


    return (<div>
        <ProCard title={title}>
            <EChartComponent options={option} />
        </ProCard>
    </div>)
}