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
import Svg, { Path } from 'react-native-svg';
import {
    ChevronLeft,
    ChevronRight,
    Info,
    Sparkles,
} from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';
import { Colors, Button as Btn } from '../theme/tokens';

const { width: SCREEN_W } = Dimensions.get('window');
const GREEN = Colors.rhGreen;
const RED_ORANGE = Colors.rhRed;
const CARD_W = Math.min(152, (SCREEN_W - 48) * 0.42);

const sparkUp = 'M0,22 L16,16 L32,20 L48,6 L64,12 L80,8';
const sparkDown = 'M0,6 L16,12 L32,8 L48,22 L64,14 L80,20';
const sparkFlat = 'M0,14 L80,14';

function MiniSpark({ positive, flat }) {
    const d = flat ? sparkFlat : positive ? sparkUp : sparkDown;
    const c = flat ? Colors.rhGreen : positive ? Colors.rhGreen : Colors.rhRed;
    return (
        <Svg width={56} height={28} viewBox="0 0 80 28" preserveAspectRatio="none">
            <Path
                d={d}
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

const STAKING_ROWS = [
    {
        id: 'sol',
        symbol: 'SOL',
        apy: '4.53% APY',
        sub: 'Stake SOL to earn',
        screen: 'StakeSOL',
    },
    {
        id: 'ada',
        symbol: 'ADA',
        apy: 'Up to 2.04% APY',
        sub: 'Stake ADA to earn',
        screen: null,
    },
    {
        id: 'eth',
        symbol: 'ETH',
        apy: 'Up to 3.50% APY',
        sub: 'Stake ETH to earn',
        screen: null,
    },
];

const DAILY_MOVERS = [
    {
        id: '1',
        name: 'World Liberty Financial',
        symbol: 'WLFI',
        price: '$0.182',
        pct: '+12.4%',
        positive: true,
    },
    {
        id: '2',
        name: 'Pepe',
        symbol: 'PEPE',
        price: '$0.000012',
        pct: '+8.02%',
        positive: true,
    },
    {
        id: '3',
        name: 'Bonk',
        symbol: 'BONK',
        price: '$0.000024',
        pct: '-3.15%',
        positive: false,
    },
    {
        id: '4',
        name: 'Jupiter',
        symbol: 'JUP',
        price: '$0.85',
        pct: '+1.22%',
        positive: true,
    },
    {
        id: '5',
        name: 'Render',
        symbol: 'RNDR',
        price: '$7.42',
        pct: '-0.88%',
        positive: false,
    },
];

const EXPLORE_TRADABLE = [
    { id: 't1', symbol: 'BTC', name: 'Bitcoin', pct: '+1.24%', positive: true, flat: false },
    { id: 't2', symbol: 'ETH', name: 'Ethereum', pct: '-0.42%', positive: false, flat: false },
    { id: 't3', symbol: 'SOL', name: 'Solana', pct: '+2.10%', positive: true, flat: false },
    { id: 't4', symbol: 'XRP', name: 'XRP', pct: '+0.05%', positive: true, flat: true },
    { id: 't5', symbol: 'DOGE', name: 'Dogecoin', pct: '-1.80%', positive: false, flat: false },
];

const EXPLORE_NON = [
    { id: 'n1', symbol: 'PEPE', name: 'Pepe', pct: '—', positive: true, flat: true },
    { id: 'n2', symbol: 'WLFI', name: 'World Liberty Financial', pct: '—', positive: true, flat: true },
];

const CryptoBrowseHub = ({ navigation, showBack }) => {
    const { stakedAssets } = useWallet();
    const isSOLStaked = stakedAssets.some((a) => a.symbol === 'SOL');
    const [exploreTab, setExploreTab] = useState('tradable');

    const exploreList = exploreTab === 'tradable' ? EXPLORE_TRADABLE : EXPLORE_NON;

    const onStakingRow = (row) => {
        if (row.screen) {
            navigation.navigate(row.screen);
        }
    };

    const openCoin = (name, symbol) => {
        navigation.navigate('CoinDetail', {
            coin: { name, symbol, balance: '$0.00', change: '—' },
            mode: 'stats',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {showBack ? (
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backHit}>
                        <ChevronLeft color="#FFFFFF" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterTitle}>$0.00 Crypto</Text>
                    <View style={styles.backHit} />
                </View>
            ) : (
                <View style={styles.headerSimple}>
                    <Text style={styles.headerCenterTitle}>$0.00 Crypto</Text>
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.heroRow}>
                    <View style={styles.heroTextCol}>
                        <Text style={styles.heroTitle}>A new home for crypto</Text>
                        <Text style={styles.heroSub}>
                            Trade and transfer crypto 24/7. Offered by Aplex Crypto.
                        </Text>
                    </View>
                    <View style={styles.heroArt}>
                        <Image
                            source={require('../assets/images/Bitcoin.png')}
                            style={styles.heroCoin}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.promoCard}>
                    <View style={styles.promoTextCol}>
                        <Text style={styles.promoTitle}>Aplex Rewards Season</Text>
                        <Text style={styles.promoBody}>
                            Earn a 2% bonus on eligible crypto deposits. Terms apply.
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DepositFunds')}
                            hitSlop={8}
                        >
                            <Text style={styles.promoLink}>Deposit crypto</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.promoIconWrap}>
                        <Sparkles color={GREEN} size={36} strokeWidth={2} />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Staking</Text>
                {isSOLStaked && (
                    <TouchableOpacity
                        style={styles.myStakingBanner}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SOLStakedView')}
                    >
                        <View style={styles.myStakingTextCol}>
                            <Text style={styles.myStakingLabel}>My staking</Text>
                            <Text style={styles.myStakingSub}>Solana • View details</Text>
                        </View>
                        <ChevronRight color="#555555" size={22} />
                    </TouchableOpacity>
                )}
                {STAKING_ROWS.map((row) => (
                    <TouchableOpacity
                        key={row.id}
                        style={styles.stakeRow}
                        activeOpacity={0.7}
                        onPress={() => onStakingRow(row)}
                    >
                        <View style={styles.stakeRowMain}>
                            <Text style={styles.stakeSymbol}>{row.symbol}</Text>
                            <Text style={styles.stakeApy}>{row.apy}</Text>
                            <Text style={styles.stakeSub}>{row.sub}</Text>
                        </View>
                        <ChevronRight color="#555555" size={22} />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.buyCryptoBtn}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Buy')}
                >
                    <Text style={styles.buyCryptoBtnText}>Buy crypto</Text>
                </TouchableOpacity>

                <View style={styles.moversHeader}>
                    <Text style={styles.sectionHeading}>Top 5 daily movers</Text>
                    <TouchableOpacity hitSlop={12}>
                        <Info color="#8E8E93" size={20} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.moversScroll}
                >
                    {DAILY_MOVERS.map((m) => (
                        <TouchableOpacity
                            key={m.id}
                            style={[styles.moverCard, { width: CARD_W }]}
                            activeOpacity={0.85}
                            onPress={() => openCoin(m.name, m.symbol)}
                        >
                            <Text style={styles.moverName} numberOfLines={2}>
                                {m.name}
                            </Text>
                            <Text style={styles.moverSym}>{m.symbol}</Text>
                            <View style={styles.moverSpark}>
                                <MiniSpark positive={m.positive} flat={false} />
                            </View>
                            <Text style={styles.moverPrice}>{m.price}</Text>
                            <Text
                                style={[
                                    styles.moverPct,
                                    { color: m.positive ? GREEN : RED_ORANGE },
                                ]}
                            >
                                {m.pct}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.disclaimer}>Subject to state availability.</Text>

                <Text style={[styles.sectionHeading, styles.exploreTitle]}>
                    Explore more crypto
                </Text>
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[
                            styles.tabPill,
                            exploreTab === 'tradable' && styles.tabPillActive,
                        ]}
                        onPress={() => setExploreTab('tradable')}
                    >
                        <Text
                            style={[
                                styles.tabPillText,
                                exploreTab === 'tradable' && styles.tabPillTextActive,
                            ]}
                        >
                            Tradable
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabPill,
                            exploreTab === 'nontradable' && styles.tabPillActive,
                        ]}
                        onPress={() => setExploreTab('nontradable')}
                    >
                        <Text
                            style={[
                                styles.tabPillText,
                                exploreTab === 'nontradable' && styles.tabPillTextActive,
                            ]}
                        >
                            Non-tradable
                        </Text>
                    </TouchableOpacity>
                </View>

                {exploreList.map((row) => (
                    <TouchableOpacity
                        key={row.id}
                        style={styles.exploreRow}
                        activeOpacity={0.75}
                        onPress={() => openCoin(row.name, row.symbol)}
                    >
                        <View style={styles.exploreLeft}>
                            <Text style={styles.exploreSym}>{row.symbol}</Text>
                            <Text style={styles.exploreName} numberOfLines={1}>
                                {row.name}
                            </Text>
                        </View>
                        <MiniSpark
                            positive={row.positive}
                            flat={row.flat || row.pct === '—'}
                        />
                        <View
                            style={[
                                styles.changePill,
                                {
                                    backgroundColor: row.pct === '—'
                                        ? '#2C2C2E'
                                        : row.positive
                                          ? 'rgba(31, 81, 255, 0.18)'
                                          : 'rgba(255, 94, 26, 0.18)',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.changePillText,
                                    {
                                        color:
                                            row.pct === '—'
                                                ? '#8E8E93'
                                                : row.positive
                                                  ? GREEN
                                                  : RED_ORANGE,
                                    },
                                ]}
                            >
                                {row.pct}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    headerSimple: {
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    backHit: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCenterTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    heroRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 28,
        marginTop: 8,
    },
    heroTextCol: {
        flex: 1,
        paddingRight: 12,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        lineHeight: 34,
        marginBottom: 10,
    },
    heroSub: {
        color: '#8E8E93',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
        lineHeight: 22,
    },
    heroArt: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroCoin: {
        width: 88,
        height: 88,
    },
    promoCard: {
        flexDirection: 'row',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 18,
        marginBottom: 32,
        alignItems: 'center',
    },
    promoTextCol: {
        flex: 1,
        paddingRight: 12,
    },
    promoTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    promoBody: {
        color: '#AEAEB2',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        lineHeight: 20,
        marginBottom: 12,
    },
    promoLink: {
        color: GREEN,
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    promoIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(31, 81, 255, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeading: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 16,
    },
    myStakingBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2C2C2E',
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    myStakingTextCol: {
        flex: 1,
    },
    myStakingLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    myStakingSub: {
        color: '#8E8E93',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    stakeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#2C2C2E',
    },
    stakeRowMain: {
        flex: 1,
    },
    stakeSymbol: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    stakeApy: {
        color: GREEN,
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    stakeSub: {
        color: '#8E8E93',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    buyCryptoBtn: {
        backgroundColor: '#FFFFFF',
        borderRadius: Btn.radius,
        minHeight: Btn.height,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 36,
        borderWidth: Btn.borderWidth,
        borderColor: 'transparent',
    },
    buyCryptoBtnText: {
        color: '#000000',
        fontSize: Btn.textSize,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    moversHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    moversScroll: {
        paddingRight: 8,
        gap: 12,
    },
    moverCard: {
        backgroundColor: '#111111',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#2C2C2E',
        padding: 14,
        marginRight: 12,
    },
    moverName: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
        minHeight: 36,
    },
    moverSym: {
        color: '#8E8E93',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
        marginBottom: 8,
    },
    moverSpark: {
        marginBottom: 8,
    },
    moverPrice: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    moverPct: {
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    disclaimer: {
        color: '#636366',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
        marginTop: 12,
        marginBottom: 28,
    },
    exploreTitle: {
        marginBottom: 14,
    },
    tabRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    tabPill: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: '#1C1C1E',
    },
    tabPillActive: {
        backgroundColor: '#FFFFFF',
    },
    tabPillText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    tabPillTextActive: {
        color: '#000000',
    },
    exploreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#2C2C2E',
        gap: 10,
    },
    exploreLeft: {
        flex: 1,
        minWidth: 0,
    },
    exploreSym: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 2,
    },
    exploreName: {
        color: '#8E8E93',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    changePill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        minWidth: 64,
        alignItems: 'center',
    },
    changePillText: {
        fontSize: 13,
        fontFamily: 'DMSans-SemiBold',
    },
});

export default CryptoBrowseHub;
