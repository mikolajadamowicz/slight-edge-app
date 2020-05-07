import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Button, AsyncStorage } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainView() {
	const [state, setState] = useState(0);
	const [dataset, setDataset] = useState([0]);

	const getData = async () => {
		try {
			const storageState = await AsyncStorage.getItem('@State');
			const storageDataset = await AsyncStorage.getItem('@Dataset');
			setState(JSON.parse(storageState) || 0);
			setDataset(JSON.parse(storageDataset) || [0]);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const saveData = async (state, dataset) => {
		await AsyncStorage.setItem('@Dataset', JSON.stringify(dataset));
		await AsyncStorage.setItem('@State', JSON.stringify(state));
	};

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
			<Text>Bezier Line Chart</Text>
			<LineChart
				data={{
					labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
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
				width={Dimensions.get('window').width} // from react-native
				height={330}
				withDots={false}
				yAxisInterval={1} // optional, defaults to 1
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
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button onPress={() => setState(state + 1)} title="+1" />
				<Button onPress={() => setState(state - 1)} title="-1" />
			</View>
			<Text style={{ margin: 20, alignSelf: 'center' }}>{state}</Text>
			<Button
				onPress={async () => {
					const newState = [...dataset];
					newState.push(state);
					setDataset(newState);
					await saveData(state, newState);
				}}
				title="Set"
			/>
		</SafeAreaView>
	);
}
