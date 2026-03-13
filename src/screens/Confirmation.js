import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Confirmation = ({ navigation, route }) => {
    // Determine transaction type and details
    const {
        amount = '0',
        symbol = 'SOL',
        type = 'stake' // 'stake', 'buy', 'send', etc.
    } = route.params || {};

    const getHeaderTitle = () => {
        if (type === 'buy') return 'Order Completed';
        if (type === 'send') return 'Sent Successfully';
        return 'Transaction Confirmed';
    };

    const getSubLabel = () => {
        if (type === 'buy') return `Bought ${symbol}`;
        if (type === 'send') return `Sent ${symbol}`;
        return `Staking ${symbol}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.content}>
                <View style={styles.successIconContainer}>
                    <CheckCircle2 color="#4CD964" size={80} strokeWidth={2} />
                </View>

                <Text style={styles.title}>{getHeaderTitle()}</Text>

                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>${amount}</Text>
                    <Text style={styles.tokenAmount}>{getSubLabel()}</Text>
                </View>

                <Text style={styles.subtitle}>
                    {type === 'buy'
                        ? `You've successfully purchased ${symbol}. Your balance has been updated.`
                        : "Your transaction has been successfully submitted to the network. You'll start earning rewards soon."}
                </Text>

                <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>{type === 'buy' ? 'Order Type' : 'Estimated APY'}</Text>
                        <Text style={styles.infoValue}>{type === 'buy' ? 'Market Buy' : '5%'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status</Text>
                        <Text style={[styles.infoValue, { color: '#4CD964' }]}>Completed</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
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
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 100,
    },
    successIconContainer: {
        marginBottom: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    amountText: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    tokenAmount: {
        color: '#8E8E93',
        fontSize: 18,
        fontFamily: 'DMSans-Medium',
    },
    subtitle: {
        color: '#8E8E93',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 50,
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 20,
        gap: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        color: '#8E8E93',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    footer: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    doneButton: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    doneButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default Confirmation;
