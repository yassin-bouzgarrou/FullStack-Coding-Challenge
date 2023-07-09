import { Text, View } from 'react-native';
import { FavouriteProvider } from './Global/FavouriteContext';
import AppStack from './navigation/AppStack';


export default function App() {
  return (
    <FavouriteProvider>
      <AppStack></AppStack>
    </FavouriteProvider >
  );
}
