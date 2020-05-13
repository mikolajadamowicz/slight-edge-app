import React from 'react'
import { View, Text } from 'react-native'

const AppText = ({ children, ...props}) => {
	return (
			<Text {...props}>{children}</Text>
);
};

export default AppText
