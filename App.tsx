/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

// DB
import db from './src/database';

import ContactList from './src/components/ContactList';
import CreateContact from './src/components/CreateContact';
import ViewContact from './src/components/ViewContact';
import EditContact from './src/components/EditContact';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Example: Creating a table
    db.transaction(async tx => {
      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT)',
        [],
        (_, results) => {
          console.log('Table created successfully:', results);
        },
        (_, error) => {
          console.error('Error creating table:', error);
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.appBody}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={ContactList} />
          <Stack.Screen name="ViewContact" component={ViewContact} />
          <Stack.Screen name="CreateContact" component={CreateContact} />
          <Stack.Screen name="EditContact" component={EditContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBody: {
    backgroundColor: '#1B2421',
    height: '100%',
  },
});

export default App;
