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
    TextInput,
} from 'react-native';
import { ArrowLeft, X, Check, LayoutGrid, Maximize, AlertCircle, Scan } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const Send = ({ navigation }) => {
    const { balance, updateBalance, addTransaction } = useWallet();
    const [step, setStep] = useState(1); // 1: Wallet (Scan/Grid), 2: Manual Form, 3: Confirmation, 4: Success
    const [walletMode, setWalletMode] = useState('grid'); // 'grid' or 'scan'
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('0');
    const [error, setError] = useState('');

    const recents = [
        { id: 1, name: 'Alex River', address: '1A7c3....3m4n5', initial: 'AR', color: '#00D09C' },
        { id: 2, name: 'Jordan Stack', address: '0x712...8821', initial: 'JS', color: '#FF5E1A' },
        { id: 3, name: 'Crypto Exchange', address: 'bc1q...99z2', initial: 'CE', color: '#00D09C' },
    ];

    const handleAmountKeyPress = (key) => {
        setError('');
        if (key === 'backspace') {
            setAmount(amount.slice(0, -1) || '0');
        } else if (key === 'dot') {
            if (!amount.includes('.')) setAmount(amount + '.');
        } else if (amount === '0') {
            setAmount(key);
        } else {
            setAmount(amount + key);
        }
    };

    const validateStep2 = () => {
        const numAmount = parseFloat(amount);
        if (numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (numAmount > balance) {
            setError('Insufficient balance');
            return;
        }
        if (!address || address.length < 10) {
            setError('Please enter a valid BTC address');
            return;
        }
        setStep(3);
    };

    const handleFinalSubmit = () => {
        const numAmount = parseFloat(amount);
        const total = numAmount + 0.48;

        // Mock update
        updateBalance(-total);
        addTransaction({
            type: 'Send',
            asset: 'Bitcoin',
            symbol: 'BTC',
            amount: `${(numAmount / 50000).toFixed(8)} BTC`,
            value: `$${numAmount.toFixed(2)}`,
        });

        setStep(4);
    };

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.headerSideLeft}>
                    <TouchableOpacity
                        onPress={() => step === 1 ? navigation.goBack() : setStep(step - 1)}
                        style={styles.headerAction}
                    >
                        {step !== 1 && (
                            <ArrowLeft color="#FFFFFF" size={24} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.headerCenter}>
                    {step === 1 && (
                        <View style={styles.headerPill}>
                            <TouchableOpacity
                                style={[styles.pillIcon, walletMode === 'grid' && styles.pillActive]}
                                onPress={() => setWalletMode('grid')}
                            >
                                <LayoutGrid color={walletMode === 'grid' ? "#000000" : "#888888"} size={16} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pillIcon, walletMode === 'scan' && styles.pillActive]}
                                onPress={() => setWalletMode('scan')}
                            >
                                <Maximize color={walletMode === 'scan' ? "#000000" : "#888888"} size={16} />
                            </TouchableOpacity>
                        </View>
                    )}
                    <Text style={styles.headerTitle}>{step === 1 ? 'Wallet' : step === 2 ? 'Send' : 'Confirm'}</Text>
                </View>

                <View style={styles.headerSideRight}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerAction}>
                        <X color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepSubtitle}>Send or pay with Bitcoin</Text>

            {walletMode === 'scan' ? (
                <View style={styles.boxContainer}>
                    <Image
                        source={require('../assets/images/SendScreen.png')}
                        style={styles.fullGraphicImage}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <Text style={styles.sectionTitle}>Recent Contacts</Text>
                    {recents.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.contactItem}
                            onPress={() => {
                                setAddress(item.address);
                                setStep(2);
                            }}
                        >
                            <View style={[styles.avatar, { backgroundColor: item.color }]}>
                                <Text style={styles.avatarText}>{item.initial}</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{item.name}</Text>
                                <Text style={styles.contactAddress}>{item.address}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.addContactButton}>
                        <Text style={styles.addContactText}>+ Add New Contact</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.whiteButton} onPress={() => setStep(2)}>
                    <Text style={styles.whiteButtonText}>Enter Manually</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStep2Manual = () => (
        <View style={styles.stepContainer}>
            <View style={styles.manualInputWrapper}>
                <Text style={styles.manualAmount}>${amount}</Text>

                <View style={styles.addressInputContainer}>
                    <Text style={styles.addressLabel}>To</Text>
                    <TextInput
                        style={styles.addressInput}
                        placeholder="Wallet address"
                        placeholderTextColor="#444444"
                        value={address}
                        onChangeText={setAddress}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.qrScannerIcon} onPress={() => Alert.alert("QR Scanner", "QR Scanner mock activated!")}>
                        <Scan color="#888888" size={20} />
                    </TouchableOpacity>
                </View>

                {error ? (
                    <View style={styles.errorContainer}>
                        <AlertCircle color="#FF3B30" size={16} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                <View style={styles.balanceInfo}>
                    <Text style={styles.availableBalance}>Available: ${balance.toLocaleString()}</Text>
                </View>
            </View>

            <View style={styles.keypadWrapper}>
                <View style={styles.keypadContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={styles.keyButton}
                            onPress={() => handleAmountKeyPress(num.toString())}
                        >
                            <Text style={styles.keyText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleAmountKeyPress('dot')}>
                        <Text style={styles.keyText}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleAmountKeyPress('0')}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyButton} onPress={() => handleAmountKeyPress('backspace')}>
                        <Text style={styles.keyText}>⌫</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.whiteButton, (!address || amount === '0') && { opacity: 0.5 }]}
                    onPress={validateStep2}
                >
                    <Text style={styles.whiteButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStep3Confirm = () => (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.stepContainer}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>VALID BTC address</Text>
                </View>

                <View style={styles.amountDisplayContainer}>
                    <Text style={styles.mainAmount}>${amount}.00</Text>
                    <Text style={styles.amountOfCrypto}>of Bitcoin</Text>
                    <Text style={styles.btcAmount}>0.0000287128 BTC</Text>
                </View>

                <View style={styles.detailsList}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Address</Text>
                        <Text style={styles.detailValue}>{address || '1A7c3....3m4n5'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Network fee</Text>
                        <View style={styles.feeContainer}>
                            <Text style={styles.detailValue}>$0.48</Text>
                            <Text style={styles.feeSubValue}>0.0000287128 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Total</Text>
                        <View style={styles.feeContainer}>
                            <Text style={[styles.detailValue, styles.totalValue]}>${(parseFloat(amount) || 0) + 0.48}</Text>
                            <Text style={styles.feeSubValue}>0.0000287128 BTC</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.disclaimerText}>
                    The order values are estimated at last marketclose. $45,7850. Crypto transfers can't be reversed once submitted
                </Text>

                <View style={styles.bottomActions}>
                    <TouchableOpacity style={styles.whiteButton} onPress={handleFinalSubmit}>
                        <Text style={styles.whiteButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );

    const renderStep4Success = () => (
        <View style={styles.successContainer}>
            {/* Gradient Background */}
            <View style={styles.successGradientBackground} />
            <View style={styles.successGlowTop} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.stepContainer}>
                    {/* Success Checkmark */}
                    <View style={styles.successCheckmarkContainer}>
                        <View style={styles.successCheckmarkCircle}>
                            <Check color="#000000" size={40} strokeWidth={3} />
                        </View>
                    </View>
                    
                    <Text style={styles.successTitle}>Payment Sent</Text>
                    <Text style={styles.successSubtitle}>Your transaction is being processed</Text>

                    <View style={styles.successAmountContainer}>
                        <Text style={styles.successMainAmount}>${amount}.00</Text>
                        <Text style={styles.successAmountOfCrypto}>of Bitcoin</Text>
                        <Text style={styles.successBtcAmount}>0.00023814 BTC</Text>
                    </View>

                    <View style={styles.successDetailsCard}>
                        <View style={styles.successDetailRow}>
                            <Text style={styles.successLabel}>To</Text>
                            <Text style={styles.successValue}>{address}</Text>
                        </View>
                        <View style={styles.successDetailRow}>
                            <Text style={styles.successLabel}>Network fee</Text>
                            <Text style={styles.successValue}>$0.48</Text>
                        </View>
                        <View style={styles.successDetailRow}>
                            <Text style={styles.successLabel}>Total</Text>
                            <Text style={styles.successValue}>${(parseFloat(amount) || 0) + 0.48}</Text>
                        </View>
                    </View>

                    <Text style={styles.successNote}>
                        You sent ${amount}.00 and sent 0.00023814 BTC on network. The network fee was added to the amount.
                    </Text>

                    <View style={styles.bottomActions}>
                        <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.whiteButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            {step !== 4 && <SafeAreaView />}
            {step !== 4 && renderHeader()}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2Manual()}
            {step === 3 && renderStep3Confirm()}
            {step === 4 && renderStep4Success()}
        </View>
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
        paddingVertical: 16,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-SemiBold',
    },
    headerCenter: {
        alignItems: 'center',
        flex: 2,
    },
    headerSideLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    headerSideRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    headerPill: {
        flexDirection: 'row',
        backgroundColor: '#0D1117',
        borderRadius: 20,
        padding: 2,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    pillIcon: {
        padding: 6,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
    pillActive: {
        backgroundColor: '#00D09C',
        borderRadius: 18,
    },
    headerAction: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContainer: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
    },
    stepSubtitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginTop: 4,
        marginBottom: 40,
    },
    boxContainer: {
        width: width * 0.8,
        height: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullGraphicImage: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        width: '100%',
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        padding: 12,
        borderRadius: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    contactAddress: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        marginTop: 2,
    },
    addContactButton: {
        padding: 15,
        alignItems: 'center',
    },
    addContactText: {
        color: '#00D09C',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    // Step 2 Styles
    manualInputWrapper: {
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
    },
    manualAmount: {
        color: '#FFFFFF',
        fontSize: 64,
        fontFamily: 'DMSans-Bold',
        marginBottom: 40,
    },
    addressInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        borderRadius: 15,
        paddingHorizontal: 20,
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    addressLabel: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        marginRight: 15,
    },
    addressInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    keypadWrapper: {
        marginTop: 'auto',
        width: '100%',
        paddingBottom: 40,
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
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
    // Step 3 Styles
    badge: {
        backgroundColor: 'rgba(0, 208, 156, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#00D09C',
    },
    badgeText: {
        color: '#00D09C',
        fontSize: 12,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    amountDisplayContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    mainAmount: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
    },
    amountOfCrypto: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-SemiBold',
        marginTop: -5,
    },
    btcAmount: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        marginTop: 10,
    },
    detailsList: {
        width: '100%',
        marginBottom: 30,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    detailLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    detailValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    feeContainer: {
        alignItems: 'flex-end',
    },
    feeSubValue: {
        color: '#888888',
        fontSize: 11,
        fontFamily: 'DMSans-Regular',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#222222',
        marginVertical: 10,
    },
    totalValue: {
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    disclaimerText: {
        color: '#555555',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    // Step 4 Styles
    successContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    successGradientBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
    },
    successGlowTop: {
        position: 'absolute',
        top: -150,
        left: -100,
        right: -100,
        height: 300,
        backgroundColor: 'rgba(0, 208, 156, 0.15)',
        borderRadius: 200,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 60,
        elevation: 20,
    },
    successCheckmarkContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
    },
    successCheckmarkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00D09C',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
    },
    successTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    successSubtitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        marginBottom: 40,
    },
    successAmountContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    successMainAmount: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
    },
    successAmountOfCrypto: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-SemiBold',
        marginTop: -5,
    },
    successBtcAmount: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        marginTop: 10,
    },
    successDetailsCard: {
        width: '100%',
        backgroundColor: '#0D1117',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    successDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    successLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    successValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    successNote: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 30,
    },
    // Common Styles
    bottomActions: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        width: width - 40,
    },
    whiteButton: {
        backgroundColor: '#00D09C',
        borderRadius: 30,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    whiteButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        gap: 6,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    balanceInfo: {
        marginTop: 10,
    },
    availableBalance: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    qrScannerIcon: {
        marginLeft: 10,
    },
});

export default Send;
