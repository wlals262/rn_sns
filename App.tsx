import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-devsettings';
import Router from './src/Router';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
