import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './app/Navigation/StackNavigation';

export default function App() {


  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      {/* <HomeScreen /> */}
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
