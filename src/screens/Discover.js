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
    Image,
    Dimensions,
} from 'react-native';
import { Search, X, Zap as TrendingIcon, ArrowUpRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Discover = ({ navigation }) => {
    const [activeFilter, setActiveFilter] = useState('Top gainers');
    const [searchQuery, setSearchQuery] = useState('');

    const trendingAssets = [
        { id: '1', name: 'Jesse', change: '+316.74%', price: '$0.01775', color: '#00D09C' },
        { id: '2', name: 'Pengu', change: '-17.10%', price: '$0.01775', color: '#FF5E1A' },
        { id: '3', name: 'EDEL', change: '-4.65%', price: '$0.01775', color: '#FF5E1A' },
    ];

    const todayItems = [
        { id: '1', name: 'NUMINE Token', symbol: 'numi', price: '$0.08718', change: '$0.01775' },
        { id: '2', name: 'NUMINE Token', symbol: 'numi', price: '$0.08718', change: '$0.01775' },
        { id: '3', name: 'NUMINE Token', symbol: 'numi', price: '$0.08718', change: '$0.01775' },
    ];

    const latestNews = [
        { id: '1', source: 'Barron\'s', time: '19m', headline: 'Bitcoin dives again in worst-worst week for 3 years. Why this crypto "doom loop" will continue.' },
        { id: '2', source: 'Barron\'s', time: '19m', headline: 'Bitcoin dives again in worst-worst week for 3 years. Why this crypto "doom loop" will continue.' },
        { id: '3', source: 'Barron\'s', time: '19m', headline: 'Bitcoin dives again in worst-worst week for 3 years. Why this crypto "doom loop" will continue.' },
    ];

    const filteredTrending = trendingAssets.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredToday = todayItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredNews = latestNews.filter(news =>
        news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.source.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSearching = searchQuery.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Discover</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Trending Section */}
                {(filteredTrending.length > 0 || !isSearching) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Trending</Text>
                        <View style={styles.trendingRow}>
                            {filteredTrending.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.trendingCard}
                                    onPress={() => navigation.navigate('CoinDetail', {
                                        coin: {
                                            name: item.name,
                                            symbol: item.name.substring(0, 3).toUpperCase(),
                                            balance: '$124,76.90',
                                            change: '$45.98 (75.6%) Today'
                                        },
                                        mode: 'stats'
                                    })}
                                >
                                    <View style={styles.assetIconPlaceholder}>
                                        <Image
                                            source={item.name === 'Jesse' ? require('../assets/images/Jesse.png') :
                                                item.name === 'Pengu' ? require('../assets/images/Pengu.png') :
                                                    require('../assets/images/EDEL.png')}
                                            style={styles.assetImage}
                                        />
                                    </View>
                                    <Text style={styles.assetName}>{item.name}</Text>
                                    <Text style={[styles.assetChange, { color: item.color }]}>{item.change}</Text>
                                    <Text style={styles.assetPriceSmall}>{item.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Today's List Section */}
                {(filteredToday.length > 0 || !isSearching) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Today's List</Text>
                        {!isSearching && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                                {['Top gainers', 'Top Losers', 'Volume', 'Market cap'].map((filter) => (
                                    <TouchableOpacity
                                        key={filter}
                                        style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
                                        onPress={() => setActiveFilter(filter)}
                                    >
                                        <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        <View style={styles.todayList}>
                            {filteredToday.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.todayItem}
                                    onPress={() => navigation.navigate('CoinDetail', {
                                        coin: {
                                            name: item.name,
                                            symbol: item.symbol,
                                            balance: item.price,
                                            change: '$45.98 (75.6%) Today'
                                        },
                                        mode: 'stats'
                                    })}
                                >
                                    <View style={styles.itemLeft}>
                                        <Text style={styles.rankText}>{index + 1}</Text>
                                        <View style={styles.itemIconPlaceholder}>
                                            <Image
                                                source={index === 0 ? require('../assets/images/Numine1.png') :
                                                    index === 1 ? require('../assets/images/Numine2.png') :
                                                        require('../assets/images/Numine3.png')}
                                                style={styles.itemIcon}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemSymbol}>{item.symbol}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemRight}>
                                        <Text style={styles.itemPrice}>{item.price}</Text>
                                        <View style={styles.changeRow}>
                                            <ArrowUpRight color="#00D09C" size={14} />
                                            <Text style={[styles.itemChangeText, { color: '#00D09C' }]}>$0.01775</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Latest in Crypto Section */}
                {(filteredNews.length > 0 || !isSearching) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Latest in Crypto</Text>
                        <View style={styles.newsList}>
                            {filteredNews.map((news, index) => (
                                <TouchableOpacity key={news.id} style={styles.newsItem}>
                                    <View style={styles.newsTextContainer}>
                                        <Text style={styles.newsMeta}>{news.source} <Text style={styles.newsTime}>{news.time}</Text></Text>
                                        <Text style={styles.newsHeadline} numberOfLines={3}>{news.headline}</Text>
                                    </View>
                                    <View style={styles.newsImagePlaceholder}>
                                        <Image
                                            source={index === 0 ? require('../assets/images/LatestBitcoin.png') :
                                                index === 1 ? require('../assets/images/LatestBitcoin.png') :
                                                    require('../assets/images/LatestBitcoin.png')}
                                            style={styles.newsImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {isSearching && filteredTrending.length === 0 && filteredToday.length === 0 && filteredNews.length === 0 && (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Search Bar Floating at bottom */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Search color="#888888" size={20} />
                    <TextInput
                        placeholder="Search by name or address"
                        placeholderTextColor="#888888"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {isSearching && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X color="#888888" size={20} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
    },
    scrollContent: {
        paddingTop: 10,
    },
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    trendingScroll: {
        marginLeft: -20,
        paddingLeft: 20,
    },
    trendingCard: {
        width: Math.floor((width - 40 - 30) / 3),
        backgroundColor: '#0D1117',
        borderRadius: 16,
        padding: 15,
        marginRight: 0,
        borderWidth: 1,
        borderColor: '#1C2326',
        alignItems: 'center',
    },
    trendingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    assetIconPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C2326',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    assetImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    assetName: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 8,
    },
    assetChange: {
        fontSize: 13,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    assetPriceSmall: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
    },
    filterScroll: {
        marginLeft: -20,
        paddingLeft: 20,
        marginBottom: 25,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#1C2326',
        marginRight: 10,
    },
    filterPillActive: {
        backgroundColor: '#00D09C',
    },
    filterText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    filterTextActive: {
        color: '#000000',
    },
    todayList: {
        gap: 20,
    },
    todayItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    rankText: {
        color: '#666666',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        width: 20,
    },
    itemIconPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1C2326',
        overflow: 'hidden',
    },
    itemIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    itemName: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    itemSymbol: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
    },
    itemRight: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    itemChangeText: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
        marginLeft: 2,
    },
    newsList: {
        gap: 25,
    },
    newsItem: {
        flexDirection: 'row',
        gap: 15,
    },
    newsTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    newsMeta: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
        letterSpacing: 0.2,
    },
    newsTime: {
        color: '#888888',
        fontFamily: 'DMSans-Regular',
        fontWeight: '400',
        marginLeft: 8,
    },
    newsHeadline: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 22,
    },
    newsImagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: '#1C2326',
        overflow: 'hidden',
    },
    newsImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    searchBarContainer: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 56,
        gap: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
    },
    noResultsContainer: {
        paddingTop: 50,
        alignItems: 'center',
    },
    noResultsText: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
});

export default Discover;
