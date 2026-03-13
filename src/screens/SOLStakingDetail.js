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
    ImageBackground,
    Dimensions,
} from 'react-native';
import { X, Sparkles } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SOLStakingDetail = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Image Header Section */}
                <View style={styles.imageHeaderContainer}>
                    <Image
                        source={require('../assets/images/StakeHeader.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <X color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.title}>SOL staking</Text>
                    <Text style={styles.subtitle}>
                        Earn SOL when you help secure Solana network transactions.
                    </Text>

                    {/* Features List */}
                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <Sparkles color="#FFFFFF" size={18} style={styles.featureIcon} />
                            <View style={styles.featureTextContainer}>
                                <Text style={styles.featureTitle}>Earn an estimated 5% APY</Text>
                                <Text style={styles.featureDesc}>Earnings are paid out weekly.</Text>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <Sparkles color="#FFFFFF" size={18} style={styles.featureIcon} />
                            <View style={styles.featureTextContainer}>
                                <Text style={styles.featureTitle}>Stake as little as $1 of SOL</Text>
                                <Text style={styles.featureDesc}>Start small or go big. You can add to your staked balance at any time.</Text>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <Sparkles color="#FFFFFF" size={18} style={styles.featureIcon} />
                            <View style={styles.featureTextContainer}>
                                <Text style={styles.featureTitle}>Flexible terms</Text>
                                <Text style={styles.featureDesc}>Unstake at any time to trade your SOL.</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.disclaimer}>
                        All staking services are governed by the Alpexa Europe Crypto Customer Agreement.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.stakeButton}
                    onPress={() => navigation.navigate('Staking')}
                >
                    <Text style={styles.stakeButtonText}>Stake SOL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.learnMoreButton}
                    onPress={() => { }}
                >
                    <Text style={styles.learnMoreText}>Learn more</Text>
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
    scrollContent: {
        paddingBottom: 160,
    },
    imageHeaderContainer: {
        width: '100%',
        height: 280,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 5,
    },
    contentSection: {
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        lineHeight: 22,
        opacity: 0.8,
        marginBottom: 40,
    },
    featuresList: {
        gap: 30,
        marginBottom: 40,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    featureIcon: {
        marginTop: 4,
        marginRight: 20,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    featureDesc: {
        color: '#8E8E93',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
    },
    disclaimer: {
        color: '#8E8E93',
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: '#000000',
        paddingTop: 10,
    },
    stakeButton: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    stakeButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    learnMoreButton: {
        height: 56,
        borderRadius: 28,
        borderWidth: 1.5,
        borderColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    learnMoreText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default SOLStakingDetail;
