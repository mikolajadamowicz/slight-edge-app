import * as React from 'react';
import { View,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import Statistics from './screens/Statistics';
import MainView from './screens/MainView';
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context';

type RootStackParamList = {
	Home: undefined,
	Statistics: undefined,
};

const SafeAreaMaterialTopTabBar = ({ ...props }) => {
  const insets = useSafeArea();
  return (
		<View style={{ paddingTop: insets.top }}>
			<MaterialTopTabBar {...props} />
		</View>
	);
}


const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function MyTabs() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Tab.Navigator
					tabBar={(props) => <SafeAreaMaterialTopTabBar {...props} />}
					initialRouteName="Home"
					initialLayout={{ width: Dimensions.get('window').width }}
				>
					<Tab.Screen name="Statistics" component={Statistics} />
					<Tab.Screen name="Home" component={MainView} />
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}



