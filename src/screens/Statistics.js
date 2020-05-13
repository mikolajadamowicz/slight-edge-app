import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Chart from '../components/LineChart';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AppText from '../components/AppText';

const Statistics = () => {
  return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll}>
				<AppText>Monthly chart</AppText>
				<Chart height={verticalScale(290)} />
				<AppText>3 months time chart</AppText>
				<Chart height={verticalScale(290)} />
				<AppText>5 months time chart</AppText>
				<Chart height={verticalScale(290)} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'space-evenly', alignItems: 'center' },
	scroll: { flex: 1 },
});

export default Statistics
