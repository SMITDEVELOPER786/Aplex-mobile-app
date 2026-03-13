import React from 'react';
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
import { ChevronLeft, ChevronRight, Search, User, Zap } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';

const { width } = Dimensions.get('window');

const Staking = ({ navigation }) => {
    const { balance, stakedAssets } = useWallet();
    const isSOLStaked = stakedAssets.some(a => a.symbol === 'SOL');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#FFFFFF" size={28} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.pageTitle}>Staking</Text>

                {/* Main Banner Card */}
                <TouchableOpacity style={styles.bannerCard} activeOpacity={0.9}>
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Earn up to 5% APY on your crypto</Text>

                        <TouchableOpacity onPress={() => { }} style={styles.learnMoreButton}>
                            <Text style={styles.learnMoreLink}>Learn more</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {/* Active Staking Section (if any) */}
                {isSOLStaked && (
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.sectionTitle}>My staking</Text>
                        <TouchableOpacity
                            style={styles.assetItem}
                            onPress={() => navigation.navigate('SOLStakedView')}
                        >
                            <View style={styles.assetIconContainer}>
                                <View style={styles.solIconCircle}>
                                    <Image
                                        source={require('../assets/images/SOL.png')}
                                        style={styles.assetIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                            <View style={styles.assetInfo}>
                                <Text style={styles.assetTitle}>Solana</Text>
                                <Text style={styles.assetSubtitle}>Staked • $2,500.00</Text>
                            </View>
                            <ChevronRight color="#333333" size={20} />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Section: Get started */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Get started</Text>
                </View>

                {/* Asset List Item */}
                <TouchableOpacity
                    style={styles.assetItem}
                    onPress={() => isSOLStaked ? navigation.navigate('SOLStakedView') : navigation.navigate('StakeSOL')}
                >
                    <View style={styles.assetIconContainer}>
                        <View style={styles.solIconCircle}>
                            <Image
                                source={require('../assets/images/SOL.png')}
                                style={styles.assetIcon}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.assetInfo}>
                        <Text style={styles.assetTitle}>SOL - 5% APY</Text>
                        <Text style={styles.assetSubtitle}>{isSOLStaked ? 'View details' : `$${balance.toLocaleString()} available to stake`}</Text>
                    </View>
                    <ChevronRight color="#333333" size={20} />
                </TouchableOpacity>

                {/* Asset List Item - ETH Example */}
                <TouchableOpacity
                    style={styles.assetItem}
                    onPress={() => { }}
                >
                    <View style={styles.assetIconContainer}>
                        <View style={[styles.solIconCircle, { backgroundColor: '#627EEA' }]}>
                            <Image
                                source={require('../assets/images/ETH.png')}
                                style={styles.assetIcon}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.assetInfo}>
                        <Text style={styles.assetTitle}>ETH - 5% APY</Text>
                        <Text style={styles.assetSubtitle}>$0.00 available to stake</Text>
                    </View>
                    <ChevronRight color="#333333" size={20} />
                </TouchableOpacity>

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
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 100,
    },
    pageTitle: {
        color: '#FFFFFF',
        fontSize: 34,
        fontFamily: 'DMSans-Bold',
        marginTop: 10,
        marginBottom: 30,
    },
    bannerCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 24,
        height: 190,
        marginBottom: 40,
        borderLeftWidth: 4,
        borderLeftColor: '#4CD964', // Signature accent color
    },
    bannerContent: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        lineHeight: 30,
        marginBottom: 10,
    },
    bannerSubtitle: {
        color: '#8E8E93',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 15,
        fontFamily: 'DMSans-Medium',
    },
    learnMoreButton: {
        alignSelf: 'flex-start',
    },
    learnMoreLink: {
        color: '#4CD964', // Changed to accent color for consistency
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    sectionHeader: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
    },
    assetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    assetIconContainer: {
        marginRight: 15,
    },
    solIconCircle: {
        width: 50, // Match the enlarged icon size
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    assetIcon: {
        width: 50,
        height: 50,
    },
    assetInfo: {
        flex: 1,
    },
    assetTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 2,
    },
    chartLine: {
        height: 2,
        backgroundColor: '#FF4D4D',
        width: '100%',
        transform: [{ translateY: 0 }, { skewY: '10deg' }],
    },
    moverChange: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'DMSans-SemiBold',
    },
});

export default Staking;
