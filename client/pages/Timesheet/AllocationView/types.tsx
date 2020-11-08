import { TooltipProps } from 'recharts'

export interface IChartConfig {
    key: string;
    title: string;
    subTitle: string;
    colors: 'bright' | 'light' | 'dark' | 'random';
    idKey: string;
    valueKey: string;
    valuePostfix: string;
    textKey: string;
    subTextKey?: string;
}

export interface IChartItem<T> {
    id: string;
    label: string;
    data: T;
    value: number;
}

export interface ICustomTooltipProps {
    item:TooltipProps;
    chart: IChartConfig
}