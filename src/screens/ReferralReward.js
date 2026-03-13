import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Platform,
    Image,
    ScrollView,
    Share,
    Alert,
} from 'react-native';
import { ArrowLeft, Copy, Share2 } from 'lucide-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const RewardIcon = require('../assets/images/Reward.png');

const ReferralReward = ({ navigation }) => {
    const [referralLink] = useState('https://alplexa.com/refer/jdoe77');

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Join me on Alplexa! Use my link to get $10 in Bitcoin when you sign up: ${referralLink}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(referralLink);
        Alert.alert('Copied!', 'Referral link copied to clipboard.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Referral & Reward</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Earnings Card */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <View>
                            <Text style={styles.earningsLabel}>Total Earnings</Text>
                            <Text style={styles.earningsAmount}>$50.00</Text>
                        </View>
                        <View style={styles.giftIconContainer}>
                            <Image source={RewardIcon} style={styles.giftIcon} />
                        </View>
                    </View>

                    <View style={styles.statsDivider} />

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Successful Referrals</Text>
                            <Text style={styles.statValue}>5</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Pending</Text>
                            <Text style={styles.statValue}>1</Text>
                        </View>
                    </View>
                </View>

                {/* Referral Link Card */}
                <View style={styles.referralCard}>
                    <Text style={styles.referralLabel}>Your Referral Link</Text>
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText} numberOfLines={1}>{referralLink}</Text>
                        <TouchableOpacity style={styles.copyIcon} onPress={copyToClipboard}>
                            <Copy color="#00D33B" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.shareIconButton} onPress={handleShare}>
                    <Share2 color="#000000" size={20} />
                    <Text style={styles.shareIconText}>Share referral Link</Text>
                </TouchableOpacity>

                {/* How it Works Section */}
                <View style={styles.howItWorksSection}>
                    <Text style={styles.sectionTitle}>How it Works</Text>

                    <View style={styles.stepItem}>
                        <Text style={styles.stepNumber}>1.</Text>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Share your code</Text>
                            <Text style={styles.stepDesc}>Share your unique referral link with friends</Text>
                        </View>
                    </View>

                    <View style={styles.stepItem}>
                        <Text style={styles.stepNumber}>2.</Text>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Friend signs up</Text>
                            <Text style={styles.stepDesc}>They create an account and verify their identity</Text>
                        </View>
                    </View>

                    <View style={styles.stepItem}>
                        <Text style={styles.stepNumber}>3.</Text>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Both earn rewards</Text>
                            <Text style={styles.stepDesc}>You get $10 and they get $10 in crypto</Text>
                        </View>
                    </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    earningsCard: {
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#222222',
        marginBottom: 30,
    },
    earningsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    earningsLabel: {
        color: '#999999',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginBottom: 8,
    },
    earningsAmount: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
    },
    giftIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#00D33B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    giftIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#000000',
    },
    statsDivider: {
        height: 1,
        backgroundColor: '#222222',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        marginBottom: 6,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    verticalDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#222222',
        marginHorizontal: 20,
    },
    howItWorksSection: {
        gap: 20,
        marginTop: 10,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    referralCard: {
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#222222',
        marginBottom: 20,
    },
    referralLabel: {
        color: '#999999',
        fontSize: 12,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#222222',
    },
    linkText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        flex: 1,
        marginRight: 10,
    },
    copyIcon: {
        padding: 4,
    },
    shareIconButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10,
    },
    shareIconText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    stepNumber: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginRight: 12,
        marginTop: 2,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    stepDesc: {
        color: '#666666',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        lineHeight: 18,
    },
});

export default ReferralReward;
