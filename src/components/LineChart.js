import React from 'react'
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

const Chart = ({ dataset, height, labels, ...props }) => {
	return (
		<LineChart
			data={{
				labels,
				datasets: [
					{
						data: dataset,
					},
					{
						data: new Array(dataset?.length).fill(0),
					},
				],
			}}
			withInnerLines={false}
			withOuterLines={false}
			width={Dimensions.get('window').width - scale(30)}
			height={height}
			withDots={false}
			chartConfig={{
				backgroundColor: '#e26a00',
				backgroundGradientFrom: '#fb8c00',
				backgroundGradientTo: '#ffa726',
				decimalPlaces: 2, // optional, defaults to 2dp
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				style: {
					borderRadius: 16,
				},
				propsForDots: {
					r: '6',
					strokeWidth: '2',
					stroke: '#ffa726',
				},
			}}
			bezier
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
			{...props}
		/>
	);
};

Chart.defaultProps = {
	dataset: [1, 2, 3, 4, 0, 1],
	height: 330,
	labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
};

export default Chart;
