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
    Platform,
} from 'react-native';
import { ArrowLeft, Search, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SwapCoin = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const popularCoins = [
        { id: '1', name: 'Solana', symbol: 'SOL', price: '$142.50', change: '+5.24%', holdings: '$12,450.00', color: '#1F51FF', image: require('../assets/images/SOL.png') },
        { id: '2', name: 'Bitcoin', symbol: 'BTC', price: '$67,234.00', change: '+2.15%', holdings: '$45,230.00', color: '#1F51FF', image: require('../assets/images/Bitcoin.png') },
        { id: '3', name: 'Ethereum', symbol: 'ETH', price: '$3,456.00', change: '+3.82%', holdings: '$8,920.00', color: '#1F51FF', image: require('../assets/images/ETH.png') },
        { id: '4', name: 'USD Coin', symbol: 'USDC', price: '$1.00', change: '+0.01%', holdings: '$5,000.00', color: '#888888', image: require('../assets/images/EDEL.png') },
    ];

    const allCoins = [
        ...popularCoins,
        { id: '5', name: 'Polygon', symbol: 'MATIC', price: '$0.87', change: '-1.24%', holdings: '$1,230.00', color: '#FF5000', image: require('../assets/images/EDEL.png') },
        { id: '6', name: 'Cardano', symbol: 'ADA', price: '$0.65', change: '+4.56%', holdings: '$2,340.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
        { id: '7', name: 'Avalanche', symbol: 'AVAX', price: '$42.30', change: '-2.18%', holdings: '$3,450.00', color: '#FF5000', image: require('../assets/images/EDEL.png') },
    ];

    const filteredCoins = allCoins.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCoinSelect = (coin) => {
        navigation.navigate('SwapCoinDetail', { coin });
    };

    const isSearching = searchQuery.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Swap</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search color="#888888" size={20} />
                        <Text style={styles.searchPlaceholder}>Search by name or address</Text>
                    </View>
                </View>

                {/* Popular Section */}
                {!isSearching && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Popular</Text>
                        <View style={styles.coinList}>
                            {popularCoins.map((coin) => (
                                <TouchableOpacity
                                    key={coin.id}
                                    style={styles.coinCard}
                                    onPress={() => handleCoinSelect(coin)}
                                    activeOpacity={0.7}
                                >
                                    {/* Gradient Background Glow */}
                                    <View style={styles.cardGlow} />
                                    
                                    <View style={styles.coinCardContent}>
                                        <View style={styles.coinLeft}>
                                            <View style={[styles.coinIconWrapper, { shadowColor: coin.color }]}>
                                                <Image source={coin.image} style={styles.coinIcon} />
                                            </View>
                                            <View>
                                                <Text style={styles.coinName}>{coin.name}</Text>
                                                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={styles.coinRight}>
                                            <Text style={styles.coinPrice}>{coin.price}</Text>
                                            <Text style={[styles.coinChange, { color: coin.change.startsWith('+') ? '#1F51FF' : '#FF5000' }]}>
                                                {coin.change}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* All Coins Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{isSearching ? 'Search Results' : 'All Coins'}</Text>
                    {filteredCoins.length > 0 ? (
                        <View style={styles.coinList}>
                            {filteredCoins.map((coin) => (
                                <TouchableOpacity
                                    key={coin.id}
                                    style={styles.coinCard}
                                    onPress={() => handleCoinSelect(coin)}
                                    activeOpacity={0.7}
                                >
                                    {/* Gradient Background Glow */}
                                    <View style={styles.cardGlow} />
                                    
                                    <View style={styles.coinCardContent}>
                                        <View style={styles.coinLeft}>
                                            <View style={[styles.coinIconWrapper, { shadowColor: coin.color }]}>
                                                <Image source={coin.image} style={styles.coinIcon} />
                                            </View>
                                            <View>
                                                <Text style={styles.coinName}>{coin.name}</Text>
                                                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={styles.coinRight}>
                                            <View style={styles.holdingsRow}>
                                                <Text style={styles.holdingsValue}>{coin.holdings}</Text>
                                            </View>
                                            <Text style={styles.coinPrice}>{coin.price}</Text>
                                            <Text style={[styles.coinChange, { color: coin.change.startsWith('+') ? '#1F51FF' : '#FF5000' }]}>
                                                {coin.change}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No coins found for "{searchQuery}"</Text>
                        </View>
                    )}
                </View>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    scrollContent: {
        paddingTop: 10,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
        gap: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    searchPlaceholder: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        flex: 1,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 16,
    },
    coinList: {
        gap: 12,
    },
    coinCard: {
        backgroundColor: '#0D1117',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1C2326',
        position: 'relative',
    },
    cardGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#1F51FF',
        opacity: 0.3,
    },
    coinCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    coinLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    coinIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    coinIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    coinName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    coinSymbol: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    coinRight: {
        alignItems: 'flex-end',
        gap: 4,
    },
    holdingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    holdingsValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    coinPrice: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    coinChange: {
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    noResultsContainer: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    noResultsText: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
});

export default SwapCoin;
