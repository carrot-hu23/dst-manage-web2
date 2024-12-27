import React from "react";

import EChartComponent from "./EChartComponent.jsx";
import {ProCard} from "@ant-design/pro-components";

export default ({chartData, title}) => {

    console.log(chartData)
    const options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['活跃玩家', '加入玩家'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData?.xData,
            // axisLabel: {
            //     rotate: 45, // 设置 X 轴标签的旋转角度
            //     textStyle: {
            //         color: '#333', // 设置标签颜色
            //         fontSize: 12 // 设置标签字体大小
            //     }
            // }
        },
        yAxis: {
            type: 'value',
            // type: 'dashed' // 设置 y 轴轴线类型，可选值：'solid', 'dashed', 'dotted'
        },
        series: [
            {
                name: '活跃玩家',
                type: 'line',
                smooth: true,
                data: chartData.y1,
                lineStyle: {
                    // color: '#ff0000',
                    width: 3,
                    // type: 'dashed'
                },
                itemStyle: {
                    color: '#edc82d',
                    // borderColor: '#0000ff',
                    borderWidth: 8,
                },
                // symbol: 'circle',
                // symbolSize: 8,
                areaStyle: {
                    color: 'rgba(237,200,45, 0.1)' // 设置折线图区域填充颜色及透明度
                }
            },
            {
                name: '加入玩家',
                type: 'bar',
                data: chartData.y2,
                barWidth: '24%',
                itemStyle: {
                    color: '#2265d0', // 设置柱子的颜色
                    borderRadius: [5, 5, 0, 0]
                },
            },
        ],
    }
    return (<>
        <ProCard title={title}>
            <EChartComponent options={options} title={title}/>
        </ProCard>
    </>)
}