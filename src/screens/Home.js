import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    FlatList,
    Platform,
} from 'react-native';
import {
    TrendingUp,
    TrendingDown,
    LineChart,
    Send,
    Download,
    Zap,
    Settings,
    Menu,
    Clock,
    Info,
} from 'lucide-react-native';
import NavigationDrawer from '../components/NavigationDrawer';
import Svg, {
    Path,
    Circle,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    Rect,
    Line,
} from 'react-native-svg';
import { useWallet } from '../context/WalletContext';
import { Colors, Type, Button as Btn } from '../theme/tokens';

import { ActivityIndicator } from 'react-native';

const ACTION_ICON_COLOR = Colors.labelPrimary;

/** Main wallet chart — shared path for fill, glow, and stroke. */
const PORTFOLIO_CHART_LINE =
    'M16,78 C68,74 112,54 152,48 S236,36 288,30 S332,24 344,22';
const PORTFOLIO_CHART_AREA = `${PORTFOLIO_CHART_LINE} L344,94 L16,94 Z`;
const PORTFOLIO_MARKER = { cx: 344, cy: 22 };
const PORTFOLIO_GRID_YS = [28, 50, 72];

/** Split "$12,345.67" → smaller "$" + amount (client typography). */
function splitLeadingDollar(value) {
    const s = String(value ?? '');
    if (s.startsWith('$')) {
        return { hasDollar: true, amount: s.slice(1) };
    }
    return { hasDollar: false, amount: s };
}

/**
 * Minimal OHLC strip — institutional style: no chrome, solid bull / hollow bear,
 * uniform geometry (Bloomberg-style list sparkline).
 */
const MINI_CANDLE_VB = { w: 88, h: 26, padTop: 3, padBottom: 3 };

function yFromNorm(t) {
    const { h, padTop, padBottom } = MINI_CANDLE_VB;
    const inner = h - padTop - padBottom;
    return padTop + Math.min(0.97, Math.max(0.03, t)) * inner;
}

function buildMiniCandleSpecs(trend) {
    const { w } = MINI_CANDLE_VB;
    const n = 9;
    const slot = w / n;
    const bodyW = Math.min(4.2, slot * 0.52);
    const out = [];
    for (let i = 0; i < n; i++) {
        const cx = slot * i + slot / 2;
        const p = n === 1 ? 0 : i / (n - 1);
        const nudge = Math.sin(i * 0.9) * 0.018;
        let o;
        let hi;
        let lo;
        let c;
        if (trend === 'up') {
            const mid = 0.66 - p * 0.4 + nudge;
            o = mid + 0.055;
            c = mid - 0.03;
            hi = Math.min(o, c) - 0.055;
            lo = Math.max(o, c) + 0.07;
        } else if (trend === 'down') {
            const mid = 0.34 + p * 0.4 + nudge;
            o = mid - 0.05;
            c = mid + 0.055;
            hi = Math.min(o, c) - 0.055;
            lo = Math.max(o, c) + 0.07;
        } else {
            const mid = 0.5 + Math.sin(i * 0.75) * 0.04;
            o = mid + 0.022;
            c = mid - 0.022;
            hi = mid - 0.075;
            lo = mid + 0.075;
        }
        hi = Math.min(0.99, Math.max(0.01, hi));
        lo = Math.min(0.99, Math.max(0.01, lo));
        o = Math.min(lo, Math.max(hi, o));
        c = Math.min(lo, Math.max(hi, c));
        out.push({ cx, bodyW, o, h: hi, l: lo, c });
    }
    return out;
}

function MiniCandleStrip({ trend, accentColor }) {
    const specs = buildMiniCandleSpecs(trend);
    const wickW = 1;
    const bodyRx = 0.45;

    return (
        <>
            {specs.map((k, i) => {
                const yo = yFromNorm(k.o);
                const yc = yFromNorm(k.c);
                const yh = yFromNorm(k.h);
                const yl = yFromNorm(k.l);
                let top = Math.min(yo, yc);
                let bot = Math.max(yo, yc);
                if (bot - top < 1.25) {
                    const m = (top + bot) / 2;
                    top = m - 0.65;
                    bot = m + 0.65;
                }
                const bodyH = Math.max(1.25, bot - top);
                const bullish = yc < yo;
                const x = k.cx - k.bodyW / 2;

                return (
                    <React.Fragment key={i}>
                        <Line
                            x1={k.cx}
                            y1={yh}
                            x2={k.cx}
                            y2={top}
                            stroke={accentColor}
                            strokeWidth={wickW}
                            strokeLinecap="butt"
                        />
                        <Rect
                            x={x}
                            y={top}
                            width={k.bodyW}
                            height={bodyH}
                            rx={bodyRx}
                            ry={bodyRx}
                            fill={bullish ? accentColor : 'none'}
                            stroke={bullish ? 'none' : accentColor}
                            strokeWidth={bullish ? 0 : 1}
                        />
                        <Line
                            x1={k.cx}
                            y1={bot}
                            x2={k.cx}
                            y2={yl}
                            stroke={accentColor}
                            strokeWidth={wickW}
                            strokeLinecap="butt"
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
}

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

    const TIME_FILTERS = [
        { key: 'live', label: 'LIVE' },
        { key: '1d', label: '1D' },
        { key: '1w', label: '1W' },
        { key: '1m', label: '1M' },
        { key: '3m', label: '3M' },
        { key: '1y', label: '1Y' },
    ];

    const [portfolioData] = useState([
        {
            id: '1',
            name: 'Bitcoin',
            symbol: 'BTC',
            holdings: '0 BTC',
            percentage: '-0.33%',
            value: '$67,587.02',
            sparkline: 'down',
        },
        {
            id: '2',
            name: 'Ethereum',
            symbol: 'ETH',
            holdings: '0 ETH',
            percentage: '+0.15%',
            value: '$1,963.72',
            sparkline: 'up',
        },
        {
            id: '3',
            name: 'XRP',
            symbol: 'XRP',
            holdings: '0 XRP',
            percentage: '-0.03%',
            value: '$1.419',
            sparkline: 'down',
        },
        {
            id: '4',
            name: 'BNB',
            symbol: 'BNB',
            holdings: '0 BNB',
            percentage: '+2.31%',
            value: '$626.02',
            sparkline: 'up',
        },
        {
            id: '5',
            name: 'USDC',
            symbol: 'USDC',
            holdings: '0 USDC',
            percentage: '+0.00%',
            value: '$1.00',
            sparkline: 'flat',
        },
        {
            id: '6',
            name: 'Solana',
            symbol: 'SOL',
            holdings: '0 SOL',
            percentage: '+1.41%',
            value: '$84.59',
            sparkline: 'up',
        },
    ]);

    const renderPortfolioItem = ({ item }) => {
        const isPositive = item.percentage.trim().startsWith('+');
        const changeColor = isPositive ? Colors.rhGreen : Colors.rhRed;
        const pctLabel = item.percentage.replace(/^[+-]/, '');

        const priceParts = splitLeadingDollar(item.value);

        return (
            <TouchableOpacity
                style={styles.portfolioItem}
                onPress={() => navigation.navigate('CoinDetail', {
                    coin: item,
                    mode: 'stats'
                })}
            >
                <View style={styles.coinLeftInfo}>
                    <Text style={styles.coinTicker} numberOfLines={1}>{item.symbol}</Text>
                    <Text style={styles.coinFullName} numberOfLines={1}>{item.name}</Text>
                </View>

                <View style={styles.sparklineContainer}>
                    <Svg
                        width={80}
                        height={28}
                        viewBox={`0 0 ${MINI_CANDLE_VB.w} ${MINI_CANDLE_VB.h}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <MiniCandleStrip trend={item.sparkline} accentColor={changeColor} />
                    </Svg>
                </View>

                <View style={styles.coinRightInfo}>
                    <Text style={styles.coinPriceWrap} numberOfLines={1}>
                        {priceParts.hasDollar ? (
                            <Text style={styles.coinPriceDollar}>$</Text>
                        ) : null}
                        <Text style={styles.coinPriceDigits}>{priceParts.amount}</Text>
                    </Text>
                    <View style={styles.coinChangeRow}>
                        {isPositive ? (
                            <TrendingUp color={changeColor} size={14} strokeWidth={2.5} />
                        ) : (
                            <TrendingDown color={changeColor} size={14} strokeWidth={2.5} />
                        )}
                        <Text style={[styles.coinChange, { color: changeColor }]}>{pctLabel}</Text>
                    </View>
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
                    <ActivityIndicator size="large" color={Colors.accent} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Wallet Balance Section */}
                    <View style={styles.balanceSection}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.walletLabel}>My Wallet</Text>
                        </View>
                        <Text style={styles.balance} numberOfLines={1}>
                            <Text style={styles.balanceDollar}>$</Text>
                            <Text style={styles.balanceAmount}>
                                {balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </Text>
                        </Text>
                        <Text style={styles.dayChange}>
                            {balance < 0.01 ? (
                                <>
                                    <Text style={styles.dayChangePositive}>▲ $0.00 (0.00%)</Text>
                                    <Text style={styles.dayChangeSuffix}> Today</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.dayChangePositive}>▲ +$45.98 (45%)</Text>
                                    <Text style={styles.dayChangeSuffix}> Today</Text>
                                </>
                            )}
                        </Text>
                    </View>

                    <View style={styles.chartSection}>
                        <View style={styles.simpleChartCard}>
                            <Svg
                                width="100%"
                                height={136}
                                viewBox="0 0 360 96"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <Defs>
                                    <LinearGradient
                                        id="portfolioChartArea"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <Stop offset="0%" stopColor={Colors.accent} stopOpacity={0.32} />
                                        <Stop offset="42%" stopColor={Colors.accent} stopOpacity={0.1} />
                                        <Stop offset="100%" stopColor={Colors.accent} stopOpacity={0} />
                                    </LinearGradient>
                                    <RadialGradient
                                        id="portfolioMarkerGlow"
                                        cx="50%"
                                        cy="50%"
                                        r="50%"
                                    >
                                        <Stop offset="0%" stopColor={Colors.accent} stopOpacity={0.45} />
                                        <Stop offset="70%" stopColor={Colors.accent} stopOpacity={0.08} />
                                        <Stop offset="100%" stopColor={Colors.accent} stopOpacity={0} />
                                    </RadialGradient>
                                </Defs>

                                {PORTFOLIO_GRID_YS.map((gy) => (
                                    <Line
                                        key={gy}
                                        x1="14"
                                        y1={gy}
                                        x2="346"
                                        y2={gy}
                                        stroke="#FFFFFF"
                                        strokeOpacity={0.05}
                                        strokeWidth={1}
                                    />
                                ))}

                                <Path d={PORTFOLIO_CHART_AREA} fill="url(#portfolioChartArea)" />
                                <Path
                                    d={PORTFOLIO_CHART_LINE}
                                    fill="none"
                                    stroke={Colors.accent}
                                    strokeWidth={9}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity={0.14}
                                />
                                <Path
                                    d={PORTFOLIO_CHART_LINE}
                                    fill="none"
                                    stroke={Colors.accent}
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Circle
                                    cx={PORTFOLIO_MARKER.cx}
                                    cy={PORTFOLIO_MARKER.cy}
                                    r={16}
                                    fill="url(#portfolioMarkerGlow)"
                                />
                                <Circle
                                    cx={PORTFOLIO_MARKER.cx}
                                    cy={PORTFOLIO_MARKER.cy}
                                    r={6}
                                    fill={Colors.accent}
                                    stroke={Colors.white}
                                    strokeWidth={2}
                                />
                            </Svg>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.timeFilterScroll}
                            style={styles.timeFilterScrollView}
                        >
                            {TIME_FILTERS.map(({ key, label }) => (
                                <TouchableOpacity
                                    key={key}
                                    style={activeTimeFilter === key ? styles.timeFilterActiveBtn : styles.timeFilterBtn}
                                    onPress={() => setActiveTimeFilter(key)}
                                >
                                    <Text
                                        style={
                                            activeTimeFilter === key
                                                ? styles.timeFilterActiveText
                                                : styles.timeFilterLabel
                                        }
                                    >
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Action row: Swap, Send, Receive, Stake (compact grey pills) */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={styles.compactActionPill}
                            onPress={() => navigation.navigate('SwapCoin')}
                            activeOpacity={0.85}
                        >
                            <LineChart color={ACTION_ICON_COLOR} size={16} strokeWidth={2.2} style={styles.actionIcon} />
                            <Text style={styles.compactActionText}>Swap</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.compactActionPill}
                            onPress={() => navigation.navigate('Send')}
                            activeOpacity={0.85}
                        >
                            <Send color={ACTION_ICON_COLOR} size={16} strokeWidth={2.2} style={styles.actionIcon} />
                            <Text style={styles.compactActionText}>Send</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.compactActionPill}
                            onPress={() => navigation.navigate('Receive')}
                            activeOpacity={0.85}
                        >
                            <Download color={ACTION_ICON_COLOR} size={16} strokeWidth={2.2} style={styles.actionIcon} />
                            <Text style={styles.compactActionText}>Receive</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.compactActionPill}
                            onPress={() => navigation.navigate('Staking')}
                            activeOpacity={0.85}
                        >
                            <Zap color={ACTION_ICON_COLOR} size={16} strokeWidth={2.2} style={styles.actionIcon} />
                            <Text style={styles.compactActionText}>Stake</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Portfolio Section */}
                    <View style={styles.portfolioSection}>
                        <View style={styles.portfolioHeader}>
                            <Text style={styles.portfolioTitle}>Portfolio</Text>
                            <TouchableOpacity style={styles.infoCircle} hitSlop={12}>
                                <Info color="#FFFFFF" size={20} strokeWidth={2} />
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
        color: Colors.labelPrimary,
        fontSize: Type.subheadline,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 12,
    },
    balance: {
        marginBottom: 8,
    },
    balanceDollar: {
        color: Colors.labelPrimary,
        fontSize: Math.round(Type.balance * 0.52),
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginRight: 2,
        transform: [{ translateY: -6 }],
    },
    balanceAmount: {
        color: Colors.labelPrimary,
        fontSize: Type.balance,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        letterSpacing: -1.2,
    },
    dayChange: {
        fontSize: Type.footnote,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    dayChangePositive: {
        color: Colors.rhGreen,
    },
    dayChangeSuffix: {
        color: '#8E8E93',
    },
    chartSection: {
        marginBottom: 28,
    },
    simpleChartCard: {
        width: '100%',
        minHeight: 152,
        marginBottom: 16,
        borderRadius: 20,
        backgroundColor: '#0E1014',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        overflow: 'hidden',
    },
    timeFilterScrollView: {
        marginBottom: 8,
    },
    timeFilterScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingRight: 8,
    },
    timeFilterActiveBtn: {
        backgroundColor: '#2C2C2E',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    timeFilterActiveText: {
        color: '#FFFFFF',
        fontSize: Type.caption1,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    timeFilterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    timeFilterLabel: {
        color: '#888888',
        fontSize: Type.caption1,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: 40,
        gap: 6,
    },
    compactActionPill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.fillTertiary,
        minHeight: 44,
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderRadius: 22,
        borderWidth: Btn.borderWidth,
        borderColor: Colors.separator,
    },
    compactActionText: {
        color: Colors.labelPrimary,
        fontSize: Type.caption1,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    actionIcon: {
        marginRight: 4,
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
        color: Colors.labelPrimary,
        fontSize: Type.title2,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    infoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: Btn.borderWidth,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    portfolioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1C2326',
    },
    coinLeftInfo: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
        paddingRight: 10,
    },
    coinTicker: {
        color: Colors.labelPrimary,
        fontSize: Type.headline,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    coinFullName: {
        color: Colors.labelSecondary,
        fontSize: Type.footnote,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    sparklineContainer: {
        width: 80,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinRightInfo: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    coinPriceWrap: {
        marginBottom: 4,
        textAlign: 'right',
    },
    coinPriceDollar: {
        color: Colors.labelPrimary,
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginRight: 2,
        transform: [{ translateY: -3 }],
    },
    coinPriceDigits: {
        color: Colors.labelPrimary,
        fontSize: Type.headline,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    coinChangeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    coinChange: {
        fontSize: Type.footnote,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    portfolioCardSeparator: {
        height: 0,
    },
});

export default Home;
