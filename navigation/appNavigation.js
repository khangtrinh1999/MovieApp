import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import SeeAllScreen from '../screens/SeeAllScreen';
import ShowScreen from '../screens/ShowScreen';
import SeasonScreen from '../screens/SeasonScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigation

() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown:false}} component={SearchScreen} />
        <Stack.Screen name="SeeAll" options={{headerShown:false}} component={SeeAllScreen} />
        <Stack.Screen name="Show" options={{headerShown:false}} component={ShowScreen} />  
        <Stack.Screen name="Season" options={{headerShown:false}} component={SeasonScreen} />  
      </Stack.Navigator>
    </NavigationContainer> 
  );
}