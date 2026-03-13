import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import { ChevronLeft, Info } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';

const { width } = Dimensions.get('window');

const StakeSOL = ({ navigation }) => {
    const { balance, updateBalance, addTransaction, addStakedAsset } = useWallet();
    const [amount, setAmount] = useState('0');
    const [isError, setIsError] = useState(false);

    // Animations
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const amountScaleAnim = useRef(new Animated.Value(1)).current;

    const solPrice = 142.50; // Mock price for conversion

    useEffect(() => {
        // Subtle bounce when amount changes
        Animated.sequence([
            Animated.timing(amountScaleAnim, { toValue: 1.05, duration: 50, useNativeDriver: true }),
            Animated.timing(amountScaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    }, [amount]);

    const triggerShake = () => {
        setIsError(true);
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start(() => {
            setTimeout(() => setIsError(false), 1000);
        });
    };

    const handleKeyPress = (key) => {
        let newAmount = amount;
        if (key === 'backspace') {
            newAmount = amount.slice(0, -1) || '0';
        } else if (key === 'dot') {
            if (!amount.includes('.')) {
                newAmount = amount + '.';
            }
        } else if (amount === '0' && key !== 'dot') {
            newAmount = key;
        } else {
            newAmount = amount + key;
        }

        const numAmount = parseFloat(newAmount);
        if (numAmount > balance) {
            triggerShake();
        } else {
            setAmount(newAmount);
        }
    };

    const handleReview = () => {
        const numAmount = parseFloat(amount);
        if (numAmount <= 0) return;

        // Animate button press
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(() => {
            navigation.navigate('Review', {
                type: 'Stake',
                asset: 'Solana',
                symbol: 'SOL',
                amount: amount,
                solAmount: (parseFloat(amount) / solPrice).toFixed(4)
            });
        });
    };

    const renderKey = (val, icon = null) => (
        <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress(val)}
            activeOpacity={0.7}
        >
            <Text style={styles.keyText}>{val === 'backspace' ? '⌫' : val}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#FFFFFF" size={30} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Stake SOL</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Info color="#8E8E93" size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Input Section */}
                <Animated.View style={[
                    styles.inputContainer,
                    { transform: [{ translateX: shakeAnim }] }
                ]}>
                    <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale: amountScaleAnim }] }}>
                        <Text style={[styles.currencySymbol, isError && { color: '#FF3B30' }]}>$</Text>
                        <Text style={[styles.amountText, isError && { color: '#FF3B30' }]}>
                            {parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                        </Text>
                    </Animated.View>
                    <Text style={styles.conversionText}>
                        ≈ {(parseFloat(amount) / solPrice).toFixed(4)} SOL
                    </Text>
                </Animated.View>

                {/* Balance & Buying Power */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Available: ${balance.toLocaleString()}</Text>
                </View>

                {/* Keyboard and Button Footer */}
                <View style={styles.footer}>
                    {/* Numeric Keypad */}
                    <View style={styles.keypad}>
                        <View style={styles.keyRow}>
                            {renderKey('1')}
                            {renderKey('2')}
                            {renderKey('3')}
                        </View>
                        <View style={styles.keyRow}>
                            {renderKey('4')}
                            {renderKey('5')}
                            {renderKey('6')}
                        </View>
                        <View style={styles.keyRow}>
                            {renderKey('7')}
                            {renderKey('8')}
                            {renderKey('9')}
                        </View>
                        <View style={styles.keyRow}>
                            {renderKey('.')}
                            {renderKey('0')}
                            {renderKey('backspace')}
                        </View>
                    </View>

                    {/* Action Button */}
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity
                            style={[
                                styles.reviewButton,
                                parseFloat(amount) <= 0 && styles.disabledButton
                            ]}
                            onPress={handleReview}
                            disabled={parseFloat(amount) <= 0}
                        >
                            <Text style={styles.reviewButtonText}>Review</Text>
                        </TouchableOpacity>
                    </Animated.View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    infoButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    currencySymbol: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
        marginRight: 2,
    },
    amountText: {
        color: '#FFFFFF',
        fontSize: 64,
        fontFamily: 'DMSans-Bold',
        letterSpacing: -1,
    },
    conversionText: {
        color: '#8E8E93',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginTop: 10,
    },
    balanceContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    balanceLabel: {
        color: '#8E8E93',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    footer: {
        paddingBottom: 40,
    },
    keypad: {
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    keyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    key: {
        width: width / 3 - 20,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Medium',
    },
    reviewButton: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 25,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.3,
    },
    reviewButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default StakeSOL;
