
import { TypedHash } from '@pnp/common';

export const AllocationColumnChart = (title: string, allocation: TypedHash<number>, chartName: string): any => ({
    chart: {
        type: 'column',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    xAxis: {
        categories: Object.keys(allocation),
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Hours'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b> {point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    title:{
        text: chartName
    },
    series: [{
        showInLegend: false,
        name: "Hours",
        data: Object.keys(allocation).map(key => allocation[key]),

    }],
    credits: { enabled: false }
});
