import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';
import { IVacationStatusProps } from './types';

export const CHART_DUMMY_CONFIG = ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Vacation status',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Vacation status',
        innerSize: '50%',
        data: [
            ['Registered hours', 120],
            ['Remaining hours', 80],
        ]
    }],
    credits: { enabled: false }
});

/**
 * @component VacationStatus
 */
export const VacationStatus = (_props: IVacationStatusProps) => (
    <div className="container">
        <HighchartsReact highcharts={Highcharts} options={CHART_DUMMY_CONFIG} />
    </div>
)