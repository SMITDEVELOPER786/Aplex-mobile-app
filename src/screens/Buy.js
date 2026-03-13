import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions,
    Modal,
    FlatList,
} from 'react-native';
import { X, ChevronDown, ArrowRight, CreditCard, Apple, Landmark, Check } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';
import { ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

const BUYABLE_ASSETS = [
    { id: '1', name: 'Solana', symbol: 'SOL', color: '#00FFA3' },
    { id: '2', name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
    { id: '3', name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
    { id: '4', name: 'USD Coin', symbol: 'USDC', color: '#2775CA' },
];

const Buy = ({ navigation }) => {
    const { balance, updateBalance, addTransaction } = useWallet();
    const [amount, setAmount] = useState('250');
    const [selectedAsset, setSelectedAsset] = useState(BUYABLE_ASSETS[0]);
    const [paymentMethod, setPaymentMethod] = useState('Apple Pay');
    const [isLoading, setIsLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [showAssetModal, setShowAssetModal] = useState(false);

    const handleKeyPress = (key) => {
        if (key === 'backspace') {
            setAmount(amount.slice(0, -1) || '0');
        } else if (key === 'dot') {
            if (!amount.includes('.')) {
                setAmount(amount + '.');
            }
        } else if (amount === '0') {
            setAmount(key);
        } else {
            setAmount(amount === '250' ? key : amount + key);
        }
    };

    const handleConfirmBuy = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const numAmount = parseFloat(amount);
            addTransaction({
                type: 'Buy',
                asset: selectedAsset.name,
                symbol: selectedAsset.symbol,
                amount: `${(numAmount / 100).toFixed(2)} ${selectedAsset.symbol}`,
                value: `$${numAmount.toFixed(2)}`,
            });
            updateBalance(numAmount); // Buy adds to balance
            navigation.navigate('Confirmation', {
                type: 'buy',
                amount: amount,
                symbol: selectedAsset.symbol
            });
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Buy {selectedAsset.symbol}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Buy Path Selection */}
                <View style={styles.swapPathContainer}>
                    <TouchableOpacity style={styles.assetSelector}>
                        <Text style={styles.assetSelectorText}>Euro</Text>
                        <ChevronDown color="#FFFFFF" size={16} />
                    </TouchableOpacity>

                    <View style={styles.pathDivider}>
                        <ArrowRight color="#FFFFFF" size={16} />
                    </View>

                    <TouchableOpacity
                        style={styles.assetSelector}
                        onPress={() => setShowAssetModal(true)}
                    >
                        <Text style={styles.assetSelectorText}>{selectedAsset.symbol}</Text>
                        <ChevronDown color="#FFFFFF" size={16} />
                    </TouchableOpacity>
                </View>

                {/* Amount Entry */}
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>${amount}</Text>

                    <View style={styles.unitToggleContainer}>
                        <TouchableOpacity
                            style={[styles.unitButton, selectedAsset.symbol === 'SOL' && styles.unitButtonActive]}
                            onPress={() => setSelectedAsset(BUYABLE_ASSETS[0])}
                        >
                            <Text style={[styles.unitText, selectedAsset.symbol === 'SOL' && styles.unitTextActive]}>SOL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.unitButton, selectedAsset.symbol === 'USD' && styles.unitButtonActive]}
                            onPress={() => { }}
                        >
                            <Text style={[styles.unitText, selectedAsset.symbol === 'USD' && styles.unitTextActive]}>$</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.balanceText}>$0.00 of SOL available</Text>
                </View>

                {/* Review Button */}
                <TouchableOpacity
                    style={styles.reviewButton}
                    onPress={() => setShowSummary(true)}
                >
                    <Text style={styles.reviewButtonText}>Review Order</Text>
                </TouchableOpacity>

                {/* Payment Selection */}

                {/* Numeric Keypad */}
                <View style={styles.keypadContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.keyButton}
                            onPress={() => handleKeyPress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleKeyPress('dot')}>
                        <Text style={styles.keyText}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleKeyPress('0')}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleKeyPress('backspace')}>
                        <Text style={styles.keyText}>⌫</Text>
                    </TouchableOpacity>
                </View>

                {/* Order Summary Modal Overlay */}
                {showSummary && (
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHandle} />
                            <Text style={styles.modalTitle}>Order Summary</Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Buy</Text>
                                <Text style={styles.summaryValue}>{(parseFloat(amount) / 100).toFixed(2)} {selectedAsset.symbol}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Price</Text>
                                <Text style={styles.summaryValue}>$100.00 / {selectedAsset.symbol}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Payment</Text>
                                <Text style={styles.summaryValue}>{paymentMethod}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Total</Text>
                                <Text style={[styles.summaryValue, { color: '#FFFFFF', fontSize: 18 }]}>${amount}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleConfirmBuy}
                                disabled={isLoading}
                            >
                                {isLoading ? <ActivityIndicator color="#000000" /> : <Text style={styles.confirmButtonText}>Confirm Purchase</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowSummary(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Asset Selection Modal */}
                <Modal
                    visible={showAssetModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowAssetModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHandle} />
                            <Text style={styles.modalTitle}>Select Asset</Text>
                            <FlatList
                                data={BUYABLE_ASSETS}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.assetItem}
                                        onPress={() => {
                                            setSelectedAsset(item);
                                            setShowAssetModal(false);
                                        }}
                                    >
                                        <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                                            <Text style={styles.iconInitial}>{item.symbol[0]}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.assetName}>{item.name}</Text>
                                            <Text style={styles.assetSymbolText}>{item.symbol}</Text>
                                        </View>
                                        {selectedAsset.id === item.id && (
                                            <Check color="#0052FF" size={20} />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    swapPathContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginTop: 20,
        marginBottom: 60,
    },
    assetSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
    },
    assetSelectorText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    pathDivider: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    amountText: {
        color: '#FFFFFF',
        fontSize: 64,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    unitToggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 4,
        marginBottom: 25,
    },
    unitButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 12,
    },
    unitButtonActive: {
        backgroundColor: '#333333',
    },
    unitText: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    unitTextActive: {
        color: '#FFFFFF',
    },
    balanceText: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    reviewButton: {
        backgroundColor: '#E5E5E5',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    reviewButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    keyButton: {
        width: '33%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: '#FFFFFF',
        fontSize: 26,
        fontFamily: 'DMSans-SemiBold',
    },
    paymentSection: {
        marginTop: 20,
        marginBottom: 30,
        width: '100%',
    },
    sectionTitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 15,
    },
    paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        gap: 12,
        borderWidth: 1,
        borderColor: '#222222',
    },
    paymentText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    paymentTextActive: {
        color: '#0052FF',
    },
    modalOverlay: {
        position: 'absolute',
        top: -110,
        left: -8,
        right: -8,
        bottom: -80,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#111111',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#333333',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    summaryLabel: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
    },
    summaryValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: '#222222',
        marginVertical: 15,
    },
    confirmButton: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    cancelButton: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    assetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#222222',
        gap: 15,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    assetName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
    },
    assetSymbolText: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
});

export default Buy;
