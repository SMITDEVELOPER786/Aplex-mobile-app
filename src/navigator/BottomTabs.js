import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import TransactionHistory from '../screens/TransactionHistory';
import { TrendingUp, Search, Clock } from 'lucide-react-native';

const TABS = [
  { key: 'Home', icon: 'trending' },
  { key: 'Search', icon: 'search' },
  { key: 'History', icon: 'clock' },
];

const BottomTabs = ({ navigation }) => {
  const [active, setActive] = useState('Home');

  const renderContent = () => {
    switch (active) {
      case 'Home':
        return <Home navigation={navigation} />;
      case 'Search':
        return <Discover navigation={navigation} />;
      case 'History':
        return <TransactionHistory navigation={navigation} />;
      default:
        return <Home navigation={navigation} />;
    }
  };

  const renderIcon = (tab, focused) => {
    const color = focused ? '#0052FF' : '#666666';
    const size = 26;
    const strokeWidth = 2.5;

    switch (tab.icon) {
      case 'trending':
        return <TrendingUp color={color} size={size} strokeWidth={strokeWidth} />;
      case 'search':
        return <Search color={color} size={size} strokeWidth={strokeWidth} />;
      case 'clock':
        return <Clock color={color} size={size} strokeWidth={strokeWidth} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.bottomNav}>
        {TABS.map((tab) => {
          const focused = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navItem}
              onPress={() => setActive(tab.key)}
              activeOpacity={0.7}
            >
              {renderIcon(tab, focused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  content: {
    flex: 1
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default BottomTabs;
