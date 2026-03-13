import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import EmailSignup from '../screens/EmailSignup';
import ForgotPassword from '../screens/ForgotPassword';
import VerificationCode from '../screens/VerificationCode';
import CreatePassword from '../screens/CreatePassword';
import Home from '../screens/Home';
import BottomTabs from './BottomTabs';
import CoinDetail from '../screens/CoinDetail';
import Settings from '../screens/Settings';
import Swap from '../screens/Swap';
import SwapCoin from '../screens/SwapCoin';
import SwapCoinDetail from '../screens/SwapCoinDetail';
import Receive from '../screens/Receive';
import Staking from '../screens/Staking';
import StakeSOL from '../screens/StakeSOL';
import SOLStakingDetail from '../screens/SOLStakingDetail';
import Deposit from '../screens/Deposit';
import DepositFunds from '../screens/DepositFunds';
import Send from '../screens/Send';
import Buy from '../screens/Buy';
import Review from '../screens/Review';
import Confirmation from '../screens/Confirmation';
import Discover from '../screens/Discover';
import TransactionHistory from '../screens/TransactionHistory';
import Profile from '../screens/Profile';
import SecuritySetting from '../screens/SecuritySetting';
import Language from '../screens/Language';
import Notifications from '../screens/Notifications';
import AppInformation from '../screens/AppInformation';
import ReferralReward from '../screens/ReferralReward';
import Support from '../screens/Support';
import SOLStakedView from '../screens/SOLStakedView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={Splash} options={{ animation: 'none' }} />
    <Stack.Screen name="Onboarding" component={Onboarding} options={{ animation: 'none' }} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="EmailSignup" component={EmailSignup} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="VerificationCode" component={VerificationCode} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
    <Stack.Screen name="Main" component={BottomTabs} />
    <Stack.Screen name="CoinDetail" component={CoinDetail} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="SwapCoin" component={SwapCoin} />
    <Stack.Screen name="SwapCoinDetail" component={SwapCoinDetail} />
    <Stack.Screen name="Swap" component={Swap} />
    <Stack.Screen name="Review" component={Review} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="Receive" component={Receive} />
    <Stack.Screen name="Staking" component={Staking} />
    <Stack.Screen name="StakeSOL" component={StakeSOL} />
    <Stack.Screen name="SOLStakingDetail" component={SOLStakingDetail} />
    <Stack.Screen name="Deposit" component={Deposit} />
    <Stack.Screen name="DepositFunds" component={DepositFunds} />
    <Stack.Screen name="Send" component={Send} />
    <Stack.Screen name="Buy" component={Buy} />
    <Stack.Screen name="Discover" component={Discover} />
    <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="SecuritySetting" component={SecuritySetting} />
    <Stack.Screen name="Language" component={Language} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="AppInformation" component={AppInformation} />
    <Stack.Screen name="ReferralReward" component={ReferralReward} />
    <Stack.Screen name="Support" component={Support} />
    <Stack.Screen name="SOLStakedView" component={SOLStakedView} />
  </Stack.Navigator>
);
export default AppNavigator;