import React, { useState, useEffect, Fragment } from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Backdrop } from 'react-native-backdrop';
import moment from 'moment';
import Chart from '../components/LineChart';
import AppText from '../components/AppText';



export default function MainView() {
	const [score, setScore] = useState(0);
	const [dataset, setDataset] = useState([0]);
	const [dbData, setDbData] = useState([0]);



	//Use WatermelonDB as dataStorag
	// use watermelon db only if you can get first 15 items for example 
	//https://github.com/Nozbe/WatermelonDB

	const getData = async () => {
		try {
			const storageState = await AsyncStorage.getItem('@State');
			const storageDataset = await AsyncStorage.getItem('@Dataset');
			const onlyValues = 
			setScore(JSON.parse(storageState) || 0);
			setDataset(JSON.parse(storageDataset) || [0]);
		} catch (e) {
			console.log(e);
		}
	};

	const setClicked = async () => {
		//check if it's the same day 
		// add date to data 
		const currentDate = moment();

		const newDbData=[...dbData]
		const newDataset = [...dataset];
		const lastData = newDbData[newDbData.length - 1];
		if (currentDate.isSame(lastData?.date, 'day')) {
			const lastDataset = lastDataset[lastDataset.length - 1];
			lastData.value = score;
			lastDataset = score;
		} else {
			newDataset.push(score);
			newDbData.push({ date: currentDate, value: score });
		}

		setDbData(newDbData);
		setDataset(newDataset);
		await saveData(score, newState);
	};

	useEffect(() => {
		getData();
	}, []);

	const saveData = async (score, dataset) => {
		await AsyncStorage.setItem('@Dataset', JSON.stringify(dataset));
		await AsyncStorage.setItem('@State', JSON.stringify(score));
	};

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
			<AppText>Bezier Line Chart</AppText>
			<Chart
				dataset={dataset}
				labels={[
					'Mon',
					'Tue',
					'Wed',
					'Thr',
					'Fri',
					'Sat',
					'Sun',
					'Mon',
					'Tue',
					'Wed',
					'Thr',
					'Fri',
					'Sat',
					'Sun',
				]}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button onPress={() => setScore(score + 1)} title="+1" />
				<Button onPress={() => setScore(score - 1)} title="-1" />
			</View>
			<AppText style={{ margin: 20, alignSelf: 'center' }}>{score}</AppText>
			<Button
				onPress={setClicked}
				title="Set"
			/>
			<Backdrop
				visible={false} //soon to be added
				handleOpen={() => {}}
				handleClose={() => {}}
				onClose={() => {}}
				swipeConfig={{
					velocityThreshold: 0.3,
					directionalOffsetThreshold: 80,
				}}
				closedHeight={40}
				animationConfig={{
					speed: 14,
					bounciness: 4,
				}}
				overlayColor="rgba(0,0,0,0.32)"
				backdropStyle={{
					backgroundColor: '#fff',
				}}
			>
				<View>
					<AppText>Backdrop Content</AppText>
				</View>
			</Backdrop>
		</SafeAreaView>
	);
}
