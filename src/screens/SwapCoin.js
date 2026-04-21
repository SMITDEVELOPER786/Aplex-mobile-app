import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TextInput,
} from 'react-native';
import { Search, X, ChevronRight } from 'lucide-react-native';

const SwapCoin = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const allCoins = [
        { id: '1', name: 'Avalanche', symbol: 'AVAX', price: '$42.30', change: '-2.18%', holdings: '$3,450.00', color: '#FF5000', image: require('../assets/images/EDEL.png') },
        { id: '2', name: 'Bitcoin', symbol: 'BTC', price: '$67,234.00', change: '+2.15%', holdings: '$45,230.00', color: '#1F51FF', image: require('../assets/images/Bitcoin.png') },
        { id: '3', name: 'Bitcoin cash', symbol: 'BCH', price: '$485.00', change: '+1.02%', holdings: '$0.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
        { id: '4', name: 'Canton', symbol: 'CC', price: '$0.12', change: '+0.50%', holdings: '$0.00', color: '#888888', image: require('../assets/images/EDEL.png') },
        { id: '5', name: 'Crv', symbol: 'CRV', price: '$0.45', change: '-0.80%', holdings: '$0.00', color: '#FF5000', image: require('../assets/images/EDEL.png') },
        { id: '6', name: 'Litecoin', symbol: 'LTC', price: '$98.20', change: '+1.20%', holdings: '$0.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
        { id: '7', name: 'Dogecoin', symbol: 'DOGE', price: '$0.16', change: '+2.10%', holdings: '$0.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
        { id: '8', name: 'Ethena', symbol: 'ENA', price: '$0.55', change: '+3.10%', holdings: '$0.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
        { id: '9', name: 'Ethereum', symbol: 'ETH', price: '$3,456.00', change: '+3.82%', holdings: '$8,920.00', color: '#1F51FF', image: require('../assets/images/ETH.png') },
        { id: '10', name: 'Solana', symbol: 'SOL', price: '$142.50', change: '+5.24%', holdings: '$12,450.00', color: '#1F51FF', image: require('../assets/images/SOL.png') },
        { id: '11', name: 'USD Coin', symbol: 'USDC', price: '$1.00', change: '+0.01%', holdings: '$5,000.00', color: '#888888', image: require('../assets/images/EDEL.png') },
        { id: '12', name: 'Polygon', symbol: 'MATIC', price: '$0.87', change: '-1.24%', holdings: '$1,230.00', color: '#FF5000', image: require('../assets/images/EDEL.png') },
        { id: '13', name: 'Cardano', symbol: 'ADA', price: '$0.65', change: '+4.56%', holdings: '$2,340.00', color: '#1F51FF', image: require('../assets/images/EDEL.png') },
    ];

    const filteredCoins = allCoins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCoinSelect = (coin) => {
        navigation.navigate('SwapCoinDetail', { coin });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                    <X color="#FFFFFF" size={26} strokeWidth={2} />
                </TouchableOpacity>
                <View style={styles.headerTitleWrap}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        Choose a cryptocurrency
                    </Text>
                </View>
                <View style={styles.headerRightSpacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search color="#666666" size={20} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for crypto"
                            placeholderTextColor="#666666"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>

                <View style={styles.listWrap}>
                    {filteredCoins.length > 0 ? (
                        filteredCoins.map((coin, index) => (
                            <View key={coin.id}>
                                <TouchableOpacity
                                    style={styles.listRow}
                                    onPress={() => handleCoinSelect(coin)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.listRowText}>
                                        <Text style={styles.listSymbol}>{coin.symbol}</Text>
                                        <Text style={styles.listName}>{coin.name}</Text>
                                    </View>
                                    <ChevronRight color="#666666" size={22} />
                                </TouchableOpacity>
                                {index < filteredCoins.length - 1 ? <View style={styles.rowDivider} /> : null}
                            </View>
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No coins found for "{searchQuery}"</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 40 }} />
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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitleWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    headerRightSpacer: {
        width: 40,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
        textAlign: 'center',
    },
    scrollContent: {
        paddingTop: 4,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        gap: 10,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        paddingVertical: 0,
    },
    listWrap: {
        paddingHorizontal: 20,
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingRight: 4,
    },
    listRowText: {
        flex: 1,
    },
    listSymbol: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    listName: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
    },
    rowDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#2A2A2A',
    },
    noResultsContainer: {
        paddingVertical: 48,
        alignItems: 'center',
    },
    noResultsText: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
});

export default SwapCoin;
