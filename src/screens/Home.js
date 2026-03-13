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
    FlatList,
    Platform,
} from 'react-native';
import { TrendingUp, Send, Download, Zap, Settings, Menu, Clock, RefreshCcw } from 'lucide-react-native';
import NavigationDrawer from '../components/NavigationDrawer';
import Svg, { Path, Circle, Line, LinearGradient, Defs, Stop } from 'react-native-svg';
import { useWallet } from '../context/WalletContext';
import { ActivityIndicator } from 'react-native';

const Home = ({ navigation }) => {
    const { balance } = useWallet();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [activeTimeFilter, setActiveTimeFilter] = useState('1d');
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Chart paths for different timeframes
    const chartPaths = {
        '1d': "M0,150 Q50,140 100,160 T200,120 T300,140 T400,100",
        '1w': "M0,120 Q80,180 160,100 T320,150 T400,130",
        '1m': "M0,100 Q100,50 200,150 T400,80",
        '8m': "M0,160 Q50,100 150,120 T300,90 T400,140",
        '1y': "M0,140 Q100,160 200,80 T350,110 T400,60"
    };

    const tooltipPositions = {
        '1d': { x: 120, y: 155, left: 130, top: 20 },
        '1w': { x: 180, y: 110, left: 190, top: 40 },
        '1m': { x: 230, y: 140, left: 240, top: 60 },
        '8m': { x: 280, y: 95, left: 180, top: 40 },
        '1y': { x: 210, y: 85, left: 220, top: 30 }
    };

    const currentTooltip = tooltipPositions[activeTimeFilter];

    const [portfolioData] = useState([
        {
            id: '1',
            name: 'Bitcoin',
            symbol: 'BTC',
            holdings: '1.25 BTC',
            percentage: '+8.34%',
            value: '$83,932.60',
            color: '#00D09C',
            icon: '₿',
        },
        {
            id: '2',
            name: 'Cardano',
            symbol: 'ADA',
            holdings: '5,340 ADA',
            percentage: '-2.56%',
            value: '$2,456.12',
            color: '#FF5E1A',
            icon: '₳',
        },
        {
            id: '3',
            name: 'Ethereum',
            symbol: 'ETH',
            holdings: '4.5 ETH',
            percentage: '+5.45%',
            value: '$12,871.60',
            color: '#00D09C',
            icon: 'Ξ',
        },
    ]);

    const renderPortfolioItem = ({ item }) => {
        const isPositive = item.percentage.startsWith('+');
        const changeColor = isPositive ? '#00D09C' : '#FF5E1A';
        const arrow = isPositive ? '▲' : '▼';

        const sparklinePath = isPositive
            ? "M0,20 L10,15 L20,18 L30,5 L40,12 L50,8 L60,15 L70,5 L80,10"
            : "M0,10 L10,15 L20,12 L30,25 L40,18 L50,22 L60,10 L70,25 L80,20";

        return (
            <TouchableOpacity
                style={styles.portfolioItem}
                onPress={() => navigation.navigate('CoinDetail', {
                    coin: item,
                    mode: 'stats'
                })}
            >
                <View style={styles.coinLeftInfo}>
                    <Text style={styles.coinTicker}>{item.symbol}</Text>
                    <Text style={styles.coinFullName}>{item.name}</Text>
                </View>

                <View style={styles.sparklineContainer}>
                    <Svg width="100" height="40" viewBox="0 0 80 30">
                        <Line
                            x1="0" y1="12" x2="80" y2="12"
                            stroke="#333333"
                            strokeWidth="1"
                            strokeDasharray="2 3"
                        />
                        <Path
                            d={sparklinePath}
                            fill="none"
                            stroke={changeColor}
                            strokeWidth="2"
                        />
                    </Svg>
                </View>

                <View style={styles.coinRightInfo}>
                    <Text style={styles.coinPrice}>{item.value}</Text>
                    <Text style={[styles.coinChange, { color: changeColor }]}>
                        {arrow} {item.percentage.replace('+', '').replace('-', '')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setIsDrawerVisible(true)}
                    >
                        <Menu color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={() => navigation.navigate('TransactionHistory')}
                    >
                        <Clock color="#FFFFFF" size={24} style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Settings color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0052FF" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Wallet Balance Section */}
                    <View style={styles.balanceSection}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.walletLabel}>My Wallet</Text>
                        </View>
                        <Text style={styles.balance}>${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <Text style={styles.dayChange}>
                            <Text style={{ color: '#00D09C' }}>+$45.98 (45%)</Text> Today
                        </Text>
                    </View>

                    {/* Chart Section with Wallet.png */}
                    <View style={styles.chartSection}>
                        <View style={styles.chartHeader}>
                            <View style={styles.chartIndicator}>
                                <View style={styles.blueDot} />
                                <Text style={styles.chartValue}>+$59,371.60</Text>
                            </View>
                        </View>

                        {/* Chart Image Container */}
                        <View style={styles.chartImageContainer}>
                            {/* Background Grid Lines */}
                            <View style={styles.gridLinesContainer}>
                                {[...Array(6)].map((_, i) => (
                                    <View key={i} style={[styles.horizontalGridLine, { top: `${i * 20}%` }]} />
                                ))}
                            </View>

                            {/* Background Trading Floor (Bars) */}
                            <View style={styles.tradingLinesContainer}>
                                {[...Array(60)].map((_, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.tradingLine,
                                            {
                                                height: `${15 + Math.random() * 40}%`,
                                                opacity: i % 3 === 0 ? 0.25 : 0.1
                                            }
                                        ]}
                                    />
                                ))}
                            </View>

                            {/* Premium SVG Area Chart */}
                            <View style={styles.svgContainer}>
                                <Svg width="100%" height="100%" viewBox="0 0 400 200">
                                    <Defs>
                                        <LinearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                                            <Stop offset="0%" stopColor="#00D09C" stopOpacity="0.4" />
                                            <Stop offset="100%" stopColor="#00D09C" stopOpacity="0" />
                                        </LinearGradient>
                                    </Defs>

                                    {/* Area Fill */}
                                    <Path
                                        d={`${chartPaths[activeTimeFilter]} L400,200 L0,200 Z`}
                                        fill="url(#gradientFill)"
                                    />

                                    {/* Main Stroke with Glow logic */}
                                    <Path
                                        d={chartPaths[activeTimeFilter]}
                                        fill="none"
                                        stroke="#00D09C"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Tooltip Vertical Line */}
                                    <Line
                                        x1={currentTooltip.x} y1="0" x2={currentTooltip.x} y2="200"
                                        stroke="rgba(0, 208, 156, 0.4)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                    />

                                    {/* Pulsing indicator at point */}
                                    <Circle
                                        cx={currentTooltip.x} cy={currentTooltip.y} r="8"
                                        fill="rgba(0, 208, 156, 0.2)"
                                    />
                                    <Circle
                                        cx={currentTooltip.x} cy={currentTooltip.y} r="4"
                                        fill="#00D09C"
                                        stroke="#FFFFFF"
                                        strokeWidth="2"
                                    />
                                </Svg>

                                {/* Interactive Tooltip Label */}
                                <View style={[styles.tooltipLabel, { left: currentTooltip.left, top: currentTooltip.top }]}>
                                    <Text style={styles.tooltipText}>+$59,371.60</Text>
                                    <Text style={styles.tooltipTime}>10:45 AM</Text>
                                </View>
                            </View>
                        </View>

                        {/* Time Filter Buttons */}
                        <View style={styles.timeFilterContainer}>
                            {['1d', '1w', '1m', '8m', '1y'].map((filter) => (
                                <TouchableOpacity
                                    key={filter}
                                    style={activeTimeFilter === filter ? styles.timeFilterActiveBtn : styles.timeFilterBtn}
                                    onPress={() => setActiveTimeFilter(filter)}
                                >
                                    <Text style={activeTimeFilter === filter ? styles.timeFilterActiveText : styles.timeFilterLabel}>
                                        {filter}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={styles.pillActionButton}
                            onPress={() => navigation.navigate('Buy')}
                        >
                            <TrendingUp color="#FFFFFF" size={16} style={styles.actionIcon} />
                            <Text style={styles.pillActionText}>Buy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pillActionButton}
                            onPress={() => navigation.navigate('Send')}
                        >
                            <Send color="#FFFFFF" size={16} style={styles.actionIcon} />
                            <Text style={styles.pillActionText}>Send</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pillActionButton}
                            onPress={() => navigation.navigate('SwapCoin')}
                        >
                            <Zap color="#FFFFFF" size={16} style={styles.actionIcon} />
                            <Text style={styles.pillActionText}>Swap</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pillActionButton}
                            onPress={() => navigation.navigate('SOLStakingDetail')}
                        >
                            <Download color="#FFFFFF" size={16} style={styles.actionIcon} />
                            <Text style={styles.pillActionText}>Stake</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Portfolio Section */}
                    <View style={styles.portfolioSection}>
                        <View style={styles.portfolioHeader}>
                            <Text style={styles.portfolioTitle}>Portfolio</Text>
                            <TouchableOpacity style={styles.infoCircle}>
                                <Text style={styles.infoI}>i</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={portfolioData}
                            renderItem={renderPortfolioItem}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => <View style={styles.portfolioCardSeparator} />}
                        />
                    </View>
                </ScrollView>
            )}

            <NavigationDrawer
                visible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                navigation={navigation}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 0 : 10,
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    time: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    statusIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    signalIcon: {
        width: 17,
        height: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    wifiIcon: {
        width: 15,
        height: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    batteryIcon: {
        width: 25,
        height: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuButton: {
        padding: 5,
    },
    historyButton: {
        padding: 5,
    },
    settingsButton: {
        padding: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    balanceSection: {
        marginBottom: 25,
        marginTop: 10,
    },
    walletLabel: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 12,
    },
    balance: {
        color: '#FFFFFF',
        fontSize: 42,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: -1,
    },
    dayChange: {
        color: '#8E8E93',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    chartSection: {
        marginBottom: 30,
    },
    chartHeader: {
        marginBottom: 15,
    },
    chartIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    greenDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00D09C',
    },
    chartValue: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    chartImageContainer: {
        width: '100%',
        height: 220,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#0D1117',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    gridLinesContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        paddingVertical: 10,
        zIndex: 1,
    },
    horizontalGridLine: {
        height: 1,
        backgroundColor: '#1C1C1E',
        width: '100%',
        opacity: 0.5,
    },
    svgContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    tooltipLabel: {
        position: 'absolute',
        backgroundColor: '#0D1117',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#00D09C',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        alignItems: 'center',
    },
    tooltipText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    tooltipTime: {
        color: '#8E8E93',
        fontSize: 10,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
        marginTop: 2,
    },
    chartImageOverlay: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        zIndex: 1,
    },
    tradingLinesContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        opacity: 0.3,
    },
    tradingLine: {
        width: 1.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
    },
    horizontalLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#444444',
        opacity: 0.5,
    },
    timeFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 30,
    },
    timeFilterActiveBtn: {
        backgroundColor: '#00D09C',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    timeFilterActiveText: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    timeFilterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    timeFilterLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        gap: 8,
    },
    pillActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00D09C',
        paddingVertical: 12,
        borderRadius: 20,
    },
    pillActionText: {
        color: '#000000',
        fontSize: 13,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    actionIcon: {
        marginRight: 6,
    },
    portfolioSection: {
        marginBottom: 20,
    },
    portfolioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    portfolioTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    infoCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    infoI: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    portfolioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#1C2326',
    },
    coinLeftInfo: {
        flex: 1,
    },
    coinTicker: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 6,
    },
    coinFullName: {
        color: '#8E8E93',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    sparklineContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinRightInfo: {
        flex: 1.5,
        alignItems: 'flex-end',
    },
    coinPrice: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 6,
    },
    coinChange: {
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    portfolioCardSeparator: {
        height: 0,
    },
});

export default Home;
