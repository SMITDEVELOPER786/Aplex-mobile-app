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
import { ChevronLeft, Send, ArrowLeftRight, Scan, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CoinDetail = ({ navigation, route }) => {
    const { coin = {
        name: 'Bitcoin',
        symbol: 'BTC',
        color: '#FF9500',
        balance: '$124,76.90',
        change: '$45.98 (75.6%) Today'
    } } = route.params || {};

    // Determine mode: USDC/Stablecoins show balance breakdown, others show stats
    const mode = route.params?.mode || (coin.symbol === 'USDC' ? 'balance' : 'stats');

    const [selectedTimeframe, setSelectedTimeframe] = useState(mode === 'balance' ? '3m' : '1d');

    const timeframes = mode === 'balance'
        ? ['Live', '1d', '1w', '1m', '3m', '1y', 'All']
        : ['1d', '1w', '1m', '8m', '1y'];

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerCoinName}>{coin.name}</Text>
        </View>
    );

    const renderBalanceLayout = () => (
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Balance Details</Text>
            {/* Placeholder for balance breakdown */}
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>Available Balance</Text>
                <Text style={styles.statValue}>{coin.balance || '$0.00'}</Text>
            </View>
        </View>
    );

    const renderStatsLayout = () => (
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Stats</Text>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Market Cap</Text>
                    <Text style={styles.statValue}>$1.26 M</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Held by top 10 wallets</Text>
                    <Text style={styles.statValue}>18.75%</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Market Cap</Text>
                    <Text style={styles.statValue}>$1.26 M</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>24h Volume</Text>
                    <Text style={styles.statValue}>$56%</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Fully diluted valiation</Text>
                    <Text style={styles.statValue}>1.09B</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>All - time hig</Text>
                    <Text style={styles.statValue}>$0.984999234843</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => navigation.navigate('Buy', { coin })}
            >
                <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPriceSection = () => (
        <View style={styles.priceSection}>
            <Text style={styles.mainPrice}>{coin.balance || '$124,76.90'}</Text>
            <Text style={styles.priceChange}>
                <Text style={styles.changeValue}>$45.98 (75.6%)</Text> Today
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    {renderHeader()}
                    {renderPriceSection()}

                    <View style={styles.chartWrapper}>
                        <Image
                            source={require('../assets/images/Coindetail.png')}
                            style={styles.detailChartImage}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.timeFilterRow}>
                        {timeframes.map((tf) => (
                            <TouchableOpacity
                                key={tf}
                                style={[styles.timeFilterBtn, selectedTimeframe === tf && styles.timeFilterBtnActive]}
                                onPress={() => setSelectedTimeframe(tf)}
                            >
                                <Text style={[styles.timeFilterLabel, selectedTimeframe === tf && styles.timeFilterLabelActive]}>
                                    {tf}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {mode === 'balance' ? renderBalanceLayout() : renderStatsLayout()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        backgroundColor: '#000000',
        paddingBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 10,
    },
    backBtn: {
        marginBottom: 15,
        width: 44,
    },
    headerCoinName: {
        color: '#ffffffff',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        marginLeft: 5,
    },
    priceSection: {
        paddingHorizontal: 20,
        marginTop: 2,
    },
    mainPrice: {
        color: '#FFFFFF',
        fontSize: 42,
        fontFamily: 'DMSans-Bold',
        letterSpacing: -1,
    },
    priceChange: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        marginTop: 5,
    },
    changeValue: {
        color: '#FFD700', // Yellow/Gold color like in Figma
    },
    chartWrapper: {
        width: '100%',
        height: 250,
        marginVertical: 20,
    },
    detailChartImage: {
        width: '100%',
        height: '100%',
    },
    timeFilterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    timeFilterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    timeFilterBtnActive: {
        backgroundColor: '#1C1C1E',
        borderWidth: 1,
        borderColor: '#333333',
    },
    timeFilterLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    timeFilterLabelActive: {
        color: '#FFFFFF',
    },
    statsContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: '#0A0A0A',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight: 400,
    },
    statsTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 25,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
        marginBottom: 6,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Bold',
    },
    buyButton: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    buyButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default CoinDetail;

