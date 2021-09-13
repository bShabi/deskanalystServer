import CanvasJSReact from './canvasjs.react';
import React from 'react'

import { getGamesByTeamId } from '../until/httpService'

export default class GamesReports extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {


        var CanvasJSChart = CanvasJSReact.CanvasJSChart;
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title: {
                text: this.props.title
            },
            axisY: {
                title: "Win Game",
                // suffix: "number"
            },
            axisX: {
                title: "Date Game",
                // prefix: "W",
            },
            data: [{
                type: "line",
                toolTipContent: "{x}: {y}",
                dataPoints: this.props.data
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
// return (
//     <XYPlot width={300} height={300}>
//         <VerticalGridLines />
//         <HorizontalGridLines />
//         <XAxis />
//         <YAxis />
//         <AreaSeries
//             className="area-series-example"
//             curve="curveNatural"
//             data={pointDict}
//         />
//     </XYPlot>
// );
// import {XYPlot, VerticalGridLines ,HorizontalGridLines,XAxis,YAxis,AreaSeries} from 'react-vis';