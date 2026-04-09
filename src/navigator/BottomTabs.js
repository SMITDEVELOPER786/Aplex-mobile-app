import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import TransactionHistory from '../screens/TransactionHistory';
import { TrendingUp, Search, Clock } from 'lucide-react-native';
import { Colors } from '../theme/tokens';

const TABS = [
  { key: 'Home', icon: 'trending' },
  { key: 'Search', icon: 'search' },
  { key: 'History', icon: 'clock' },
];

const BottomTabs = ({ navigation }) => {
  const [active, setActive] = useState('Home');
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'ios' ? 8 : 10);
  const navHeight = 56 + bottomPad;

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
    const color = focused ? Colors.accent : Colors.labelTertiary;
    const size = 24;
    const strokeWidth = focused ? 2.5 : 2;

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

      <View style={[styles.bottomNav, { height: navHeight, paddingBottom: bottomPad }]}>
        {TABS.map((tab) => {
          const focused = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navItem}
              onPress={() => setActive(tab.key)}
              activeOpacity={0.65}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
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
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.separator,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
});

export default BottomTabs;
