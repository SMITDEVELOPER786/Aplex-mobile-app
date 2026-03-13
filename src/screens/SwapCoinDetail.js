import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import { ArrowLeft, Send, QrCode, ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SwapCoinDetail = ({ navigation, route }) => {
    const { coin } = route?.params || {};
    const [selectedTime, setSelectedTime] = useState('3m');

    const coinData = {
        name: coin?.name || 'USD Coin',
        symbol: coin?.symbol || 'USDC',
        price: '$1.00',
        changeValue: '$45.98',
        changePercentage: '(75.6%)',
        totalBalance: '$2,000.35',
        totalBalanceCrypto: '2,000.34701 USDC',
        networks: [
            {
                id: 'eth',
                name: 'USD Coin',
                network: 'On Ethereum',
                amount: '$1,500.21',
                cryptoAmount: '1,500.21151 USDC',
                icon: coin?.image || require('../assets/images/SOL.png'),
            },
            {
                id: 'poly',
                name: 'USD Coin',
                network: 'On polygon',
                amount: '$500.24',
                cryptoAmount: '500.1355 USDC',
                icon: coin?.image || require('../assets/images/SOL.png'),
            }
        ]
    };

    const timeFilters = ['Live', '1d', '1w', '1m', '3m', '1y', 'All'];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Top Atmospheric Backdrop Glow */}
            <View style={styles.glowContainer}>
                <LinearGradient
                    colors={['rgba(90, 54, 87, 0.4)', 'rgba(62, 51, 118, 0.2)', '#000000']}
                    style={styles.mainGlow}
                />
            </View>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Coin Price Section */}
                <View style={styles.topSection}>
                    <Text style={styles.coinTitle}>{coinData.name}</Text>
                    <Text style={styles.coinPrice}>{coinData.price}</Text>
                    <Text style={styles.changeText}>
                        <Text style={styles.faintText}>{coinData.changeValue} {coinData.changePercentage}</Text> Today
                    </Text>
                </View>

                {/* Chart Area Visual - Exact Figma Glow */}
                <View style={styles.chartArea}>
                    {/* The Background Glow - Centered Atmospheric Ellipse */}
                    <View style={styles.exactGlowContainer}>
                        <LinearGradient
                            colors={['transparent', '#3E3376', '#5A3657', 'transparent']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.exactGlow}
                        />
                    </View>

                    {/* Subtle bloom / additive layer to match Figma opacity */}
                    <View style={[styles.exactGlowContainer, { opacity: 0.4, transform: [{ scale: 1.2 }] }]}>
                        <LinearGradient
                            colors={['transparent', 'rgba(62, 51, 118, 0.4)', 'rgba(90, 54, 87, 0.4)', 'transparent']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.exactGlow}
                        />
                    </View>

                    {/* The Clean White Line precisely in the center */}
                    <View style={styles.figmaLine} />
                </View>

                {/* Time Filters */}
                <View style={styles.timeFilterContainer}>
                    {timeFilters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setSelectedTime(filter)}
                            style={[
                                styles.timeFilterBtn,
                                selectedTime === filter && styles.timeFilterBtnActive
                            ]}
                        >
                            <Text style={[
                                styles.timeFilterText,
                                selectedTime === filter && styles.timeFilterTextActive
                            ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.dividerLine} />

                {/* Balance Section */}
                <View style={styles.balanceContainer}>
                    <View>
                        <Text style={styles.balanceLabel}>Your total balance</Text>
                        <Text style={styles.balanceValue}>{coinData.totalBalance}</Text>
                        <Text style={styles.balanceCrypto}>{coinData.totalBalanceCrypto}</Text>
                    </View>
                    <View style={styles.balanceIcons}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Send color="#FFFFFF" size={20} style={styles.sendIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <QrCode color="#FFFFFF" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List Divider */}
                <View style={styles.subDivider} />

                {/* Network List */}
                <View style={styles.networkList}>
                    {coinData.networks.map((item) => (
                        <View key={item.id} style={styles.networkItem}>
                            <View style={styles.networkInfo}>
                                <View style={styles.coinIconContainer}>
                                    <Image source={item.icon} style={styles.coinIcon} />
                                    <View style={styles.networkBadge}>
                                        <Text style={{ fontSize: 8 }}>💎</Text>
                                    </View>
                                </View>
                                <View style={styles.networkNameContainer}>
                                    <Text style={styles.networkCoinName}>{item.name}</Text>
                                    <Text style={styles.networkName}>{item.network}</Text>
                                </View>
                            </View>
                            <View style={styles.networkAmountContainer}>
                                <Text style={styles.networkAmount}>{item.amount}</Text>
                                <Text style={styles.networkCryptoAmount}>{item.cryptoAmount}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Bottom Swap Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.swapButton}
                    onPress={() => navigation.navigate('Swap', { selectedCoin: coin })}
                    activeOpacity={0.8}
                >
                    <Text style={styles.swapButtonText}>Swap</Text>
                    <ArrowRight color="#000000" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    glowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.6,
        zIndex: 0,
    },
    mainGlow: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    scrollContent: {
        paddingTop: 5,
    },
    topSection: {
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    coinTitle: {
        color: '#FFFFFF',
        fontSize: 36,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    coinPrice: {
        color: '#FFFFFF',
        fontSize: 36,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginTop: -5,
        letterSpacing: -0.5,
    },
    changeText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        marginTop: 10,
    },
    faintText: {
        color: '#888888',
    },
    chartArea: {
        height: 220,
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
        marginVertical: 15,
    },
    exactGlowContainer: {
        position: 'absolute',
        width: '150%',
        left: '-25%',
        height: 200,
        opacity: 0.66,
        pointerEvents: 'none',
    },
    exactGlow: {
        flex: 1,
        borderRadius: 100,
    },
    figmaLine: {
        height: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 5,
        opacity: 0.9,
    },
    timeFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 15,
    },
    timeFilterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    timeFilterBtnActive: {
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    timeFilterText: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    timeFilterTextActive: {
        color: '#FFFFFF',
    },
    dividerLine: {
        height: 0.5,
        backgroundColor: '#222222',
        width: '100%',
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        marginTop: 35,
        marginBottom: 25,
    },
    balanceLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        marginBottom: 10,
    },
    balanceValue: {
        color: '#FFFFFF',
        fontSize: 34,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 4,
    },
    balanceCrypto: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    balanceIcons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 8,
    },
    iconBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        transform: [{ rotate: '-45deg' }],
    },
    subDivider: {
        height: 0.5,
        backgroundColor: '#222222',
        width: '100%',
        marginBottom: 30,
    },
    networkList: {
        paddingHorizontal: 25,
    },
    networkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    networkInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinIconContainer: {
        position: 'relative',
        marginRight: 15,
    },
    coinIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1A1A1A',
    },
    networkBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#1A1A1A',
    },
    networkNameContainer: {
        gap: 3,
    },
    networkCoinName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    networkName: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    networkAmountContainer: {
        alignItems: 'flex-end',
        gap: 3,
    },
    networkAmount: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Bold',
    },
    networkCryptoAmount: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    swapButton: {
        backgroundColor: '#FFFFFF',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    swapButtonText: {
        color: '#000000',
        fontSize: 19,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
});

export default SwapCoinDetail;


