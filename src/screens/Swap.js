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
    Modal,
} from 'react-native';
import { ArrowLeft, ChevronDown, Scan, Zap, Info, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const COINS = [
    { id: '1', name: 'Solana', symbol: 'SOL', icon: 'S', color: '#00FFA3' },
    { id: '2', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
    { id: '3', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
    { id: '4', name: 'USD Coin', symbol: 'USDC', icon: '$', color: '#2775CA' },
    { id: '5', name: 'Polygon', symbol: 'MATIC', icon: 'P', color: '#8247E5' },
];

const Swap = ({ navigation, route }) => {
    const params = route?.params || {};
    const [step, setStep] = useState(2); // Start at amount entry as per screenshot
    const [fromCoin, setFromCoin] = useState(COINS[0]);
    const [toCoin, setToCoin] = useState(COINS[3]);
    const [amount, setAmount] = useState('250');
    const [isSelectingFrom, setIsSelectingFrom] = useState(false);
    const [isSelectingTo, setIsSelectingTo] = useState(false);
    const [showCoinModal, setShowCoinModal] = useState(false);
    const [modalType, setModalType] = useState('from'); // 'from' or 'to'
    const [activeUnit, setActiveUnit] = useState('CURRENCY'); // 'COIN' or 'CURRENCY'

    const handleKeyPress = (key) => {
        if (key === 'backspace') {
            if (amount.length > 1) {
                setAmount(amount.slice(0, -1));
            } else {
                setAmount('0');
            }
        } else if (key === 'dot') {
            if (!amount.includes('.')) {
                setAmount(amount + '.');
            }
        } else {
            if (amount === '0') {
                setAmount(key);
            } else {
                setAmount(amount + key);
            }
        }
    };

    const openCoinModal = (type) => {
        setModalType(type);
        setShowCoinModal(true);
    };

    const selectCoin = (coin) => {
        if (modalType === 'from') {
            setFromCoin(coin);
        } else {
            setToCoin(coin);
        }
        setShowCoinModal(false);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Swap on {fromCoin.name}</Text>
            <View style={{ width: 40 }} />
        </View>
    );

    const renderGradientGlow = () => (
        <View style={styles.gradientGlowContainer}>
            <View style={styles.gradientGlow} />
        </View>
    );

    const CoinSelectionModal = () => (
        <Modal
            visible={showCoinModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCoinModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Asset</Text>
                        <TouchableOpacity onPress={() => setShowCoinModal(false)}>
                            <Text style={styles.closeModalText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.coinList}>
                        {COINS.map((coin) => (
                            <TouchableOpacity
                                key={coin.id}
                                style={styles.coinItem}
                                onPress={() => selectCoin(coin)}
                            >
                                <View style={[styles.coinIconWrapper, { shadowColor: coin.color }]}>
                                    <View style={[styles.coinIconBg, { backgroundColor: coin.color }]}>
                                        <Text style={styles.coinIconText}>{coin.icon}</Text>
                                    </View>
                                </View>
                                <View style={styles.coinDetails}>
                                    <Text style={styles.coinNameText}>{coin.name}</Text>
                                    <Text style={styles.coinSymbolText}>{coin.symbol}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    const renderStep2 = () => (
        <View style={styles.swapMainContainer}>
            {/* Gradient Glow Background */}
            {renderGradientGlow()}

            {/* Convert Selectors */}
            <View style={styles.convertContainer}>
                <TouchableOpacity
                    style={styles.convertButton}
                    onPress={() => openCoinModal('from')}
                >
                    <Text style={styles.convertLabel}>{fromCoin.symbol}</Text>
                    <ChevronDown color="#FFFFFF" size={16} />
                </TouchableOpacity>

                <View style={styles.arrowContainer}>
                    <ArrowRight color="#666666" size={16} />
                </View>

                <TouchableOpacity
                    style={styles.convertButton}
                    onPress={() => openCoinModal('to')}
                >
                    <Text style={styles.convertLabel}>{toCoin.symbol}</Text>
                    <ChevronDown color="#FFFFFF" size={16} />
                </TouchableOpacity>
            </View>

            {/* Amount Section */}
            <View style={styles.amountDisplaySection}>
                <Text style={styles.amountPrefix}>$</Text>
                <Text style={styles.largeAmountText}>{amount}</Text>
            </View>

            {/* Toggle Unit */}
            <View style={styles.unitToggleContainer}>
                <TouchableOpacity
                    style={[styles.unitButton, activeUnit === 'COIN' && styles.unitButtonActive]}
                    onPress={() => setActiveUnit('COIN')}
                >
                    <Text style={[styles.unitText, activeUnit === 'COIN' && styles.unitTextActive]}>
                        {fromCoin.symbol}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.unitButton, activeUnit === 'CURRENCY' && styles.unitButtonActive]}
                    onPress={() => setActiveUnit('CURRENCY')}
                >
                    <Text style={[styles.unitText, activeUnit === 'CURRENCY' && styles.unitTextActive]}>$</Text>
                </TouchableOpacity>
            </View>

            {/* Available Balance */}
            <Text style={styles.availableBalanceText}>$0.00 of {fromCoin.symbol} available</Text>

            {/* Review Button */}
            <TouchableOpacity
                style={styles.reviewMainButton}
                onPress={() => setStep(3)}
            >
                <Text style={styles.reviewMainButtonText}>Review</Text>
            </TouchableOpacity>

            {/* Number Pad */}
            <View style={styles.numberPadGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.numKey}
                        onPress={() => handleKeyPress(num.toString())}
                    >
                        <Text style={styles.numKeyText}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.numKey} onPress={() => handleKeyPress('dot')}>
                    <Text style={styles.numKeyText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numKey} onPress={() => handleKeyPress('0')}>
                    <Text style={styles.numKeyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numKey} onPress={() => handleKeyPress('backspace')}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.reviewSection}>
                <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Spend</Text>
                    <Text style={styles.reviewValue}>${amount} of {fromCoin.symbol}</Text>
                    <Text style={styles.reviewSub}>{(parseFloat(amount) || 0).toFixed(2)} {fromCoin.symbol}</Text>
                </View>

                <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Receive</Text>
                    <Text style={styles.reviewValue}>${(parseFloat(amount) * 0.98).toFixed(2)} of {toCoin.symbol}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.feeList}>
                    <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>Rate</Text>
                        <View style={styles.feeValueRow}>
                            <Text style={styles.feeValue}>1 {fromCoin.symbol} ≈ 15.02 {toCoin.symbol}</Text>
                            <Info color="#888888" size={14} />
                        </View>
                    </View>
                    <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>Slippage Tolerance</Text>
                        <Text style={styles.feeValue}>1%</Text>
                    </View>
                    <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>Robinhood fee</Text>
                        <Text style={styles.feeValue}>Free</Text>
                    </View>
                    <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>Network fee</Text>
                        <View style={styles.feeValueRow}>
                            <Text style={styles.feeValue}>$0.20</Text>
                            <Info color="#888888" size={14} />
                        </View>
                    </View>
                </View>

                <Text style={styles.disclaimer}>
                    By submitting this offer you are confirming the order on the {fromCoin.name} network provided by 0x API.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.swipeToSwapBtn}
                onPress={() => navigation.navigate('Confirmation', { type: 'swap' })}
            >
                <Text style={styles.swipeToSwapText}>Swipe to Swap</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <CoinSelectionModal />
            {renderHeader()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
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
        height: 60,
    },
    closeBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Regular',
        fontWeight: '300',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
    },
    swapMainContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    convertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 12,
    },
    convertButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#333333',
        gap: 8,
    },
    convertLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    arrowContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountDisplaySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    amountPrefix: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
        marginRight: 4,
    },
    largeAmountText: {
        color: '#FFFFFF',
        fontSize: 64,
        fontFamily: 'DMSans-Bold',
    },
    unitToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111111',
        alignSelf: 'center',
        marginTop: 30,
        padding: 4,
        borderRadius: 20,
        gap: 4,
    },
    unitButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    unitButtonActive: {
        backgroundColor: '#262626',
    },
    unitText: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    unitTextActive: {
        color: '#FFFFFF',
    },
    availableBalanceText: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 15,
    },
    reviewMainButton: {
        backgroundColor: '#E0E0E0',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    reviewMainButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    numberPadGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 'auto',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    numKey: {
        width: '33%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numKeyText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Medium',
    },
    // Review Styles (Step 3)
    stepContainer: {
        flex: 1,
    },
    reviewSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    reviewItem: {
        marginBottom: 25,
    },
    reviewLabel: {
        color: '#888888',
        fontSize: 14,
        marginBottom: 8,
    },
    reviewValue: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
    },
    reviewSub: {
        color: '#888888',
        fontSize: 14,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#222222',
        marginVertical: 10,
    },
    feeList: {
        gap: 16,
        marginTop: 10,
    },
    feeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    feeLabel: {
        color: '#888888',
        fontSize: 14,
    },
    feeValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    feeValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    disclaimer: {
        color: '#666666',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 40,
    },
    swipeToSwapBtn: {
        backgroundColor: '#FFFFFF',
        height: 64,
        borderRadius: 32,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    swipeToSwapText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#111111',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 40,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#222222',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
    },
    closeModalText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Regular',
        fontWeight: '300',
    },
    coinList: {
        padding: 10,
    },
    coinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
    },
    coinIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    coinIconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinIconText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    coinDetails: {
        flex: 1,
    },
    coinNameText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
    },
    coinSymbolText: {
        color: '#666666',
        fontSize: 14,
    },
});

export default Swap;
