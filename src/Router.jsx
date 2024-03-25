import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Splash from './pages/Splash';
import Home from './pages/Home';
import CustomBottomTab from './components/CustomBottomTab';
import Search from './pages/Search';
import Play from './pages/Play';
import Mypage from './pages/Mypage';
import Add from './pages/Add';
import SearchList from './pages/SearchList';
import Follower from './pages/Follower';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

const SearchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchList" component={SearchList} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={SearchTab} />
      <Tab.Screen name="추가" component={Add} />
      <Tab.Screen name="쇼츠" component={Play} />
      <Tab.Screen name="마이페이지" component={Mypage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Follower" component={Follower} />
    </Stack.Navigator>
  );
};

export default Router;
