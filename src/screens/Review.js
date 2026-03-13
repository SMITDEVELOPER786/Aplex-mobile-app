import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions,
} from 'react-native';
import { ChevronLeft, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Review = ({ navigation, route }) => {
    const {
        fromCurrency = 'USDC',
        toCurrency = 'MATIC',
        amount = '50',
        type = 'swap', // Default to swap
        symbol = 'SOL'
    } = route.params || {};

    const handleSwap = () => {
        // Navigate to confirmation with dynamic type
        navigation.navigate('Confirmation', {
            type: type.toLowerCase() === 'stake' ? 'stake' : 'swap',
            amount: amount,
            symbol: type.toLowerCase() === 'stake' ? symbol : toCurrency
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Review Order</Text>
                    <Text style={styles.headerSubtitle}>Guaranteed rate</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Spend Section */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionLabel}>Spend</Text>
                    <Text style={styles.mainValue}>${amount}.00 of {fromCurrency}</Text>
                    <Text style={styles.subValue}>2,000.34701 SHIB</Text>
                </View>

                {/* Receive Section */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionLabel}>Receive</Text>
                    <Text style={styles.mainValue}>${parseFloat(amount) * 10}.0 of {toCurrency}</Text>
                </View>

                {/* Info List */}
                <View style={styles.infoList}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Rate</Text>
                            <Info color="#888888" size={14} />
                        </View>
                        <Text style={styles.infoValue}>1 {toCurrency} ≈ 0.0000024 {fromCurrency}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Slippage Tolerance</Text>
                            <Info color="#888888" size={14} />
                        </View>
                        <Text style={styles.infoValue}>1%</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Robinhood fee</Text>
                            <Info color="#888888" size={14} />
                        </View>
                        <Text style={styles.infoValue}>Free</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Network fee</Text>
                            <Info color="#888888" size={14} />
                        </View>
                        <Text style={styles.infoValue}>$0.20</Text>
                    </View>
                </View>

                <Text style={styles.disclaimer}>
                    By submitting this order you are confirming the order on polygon network provided by OX API.
                </Text>
            </ScrollView>

            {/* Bottom Swipe Button Mock */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.swipeButton} onPress={handleSwap}>
                    <Text style={styles.swipeButtonText}>Swipe to Swap</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitleContainer: {
        alignItems: 'center',
        flex: 1,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    headerSubtitle: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 100,
    },
    detailSection: {
        marginBottom: 40,
    },
    sectionLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        marginBottom: 8,
    },
    mainValue: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    subValue: {
        color: '#888888',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    infoList: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#1A1A1A',
        paddingTop: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    disclaimer: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 30,
        lineHeight: 18,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 10,
        backgroundColor: '#000000',
    },
    swipeButton: {
        backgroundColor: '#FFFFFF',
        height: 65,
        borderRadius: 32.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    swipeButtonText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
});

export default Review;

