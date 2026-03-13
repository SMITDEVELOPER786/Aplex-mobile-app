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
    Modal,
    Alert,
} from 'react-native';
import { X, ChevronDown, Copy, Check, Share2, Download } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

const { width } = Dimensions.get('window');

const Receive = ({ navigation }) => {
    const { updateBalance, addTransaction } = useWallet();

    const cryptoData = [
        { id: '1', name: 'Bitcoin', symbol: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', color: '#F7931A', image: require('../assets/images/Bitcoin.png') },
        { id: '2', name: 'Ethereum', symbol: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', color: '#627EEA', image: require('../assets/images/ETH.png') },
        { id: '3', name: 'Solana', symbol: 'SOL', address: '7EqQdEUaxGGeXNbR1M3P6v3bSfFzWLKQ3eMuJUvKjXrM', color: '#00D09C', image: require('../assets/images/SOL.png') },
        { id: '4', name: 'USD Coin', symbol: 'USDC', address: '0x8E215d06EA7eC1fCE94e0d7D8f2B5C5b5E5f5e5e', color: '#2775CA', image: require('../assets/images/EDEL.png') },
    ];

    const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);
    const [showNetworkModal, setShowNetworkModal] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const recentDeposits = [
        {
            id: '1',
            amount: '+0.0045',
            symbol: 'BTC',
            value: '$287.50',
            status: 'Completed',
            timestamp: 'Today, 10:30 AM',
        },
        {
            id: '2',
            amount: '+1.5',
            symbol: 'ETH',
            value: '$5,234.00',
            status: 'Completed',
            timestamp: 'Yesterday, 3:45 PM',
        },
        {
            id: '3',
            amount: '+50',
            symbol: 'SOL',
            value: '$7,125.00',
            status: 'Pending',
            timestamp: '2 days ago',
        },
    ];

    const handleCopyAddress = () => {
        Clipboard.setString(selectedCrypto.address);
        setIsCopied(true);
        setShowSuccessToast(true);
        setTimeout(() => {
            setIsCopied(false);
            setShowSuccessToast(false);
        }, 2000);
    };

    const handleShare = async () => {
        try {
            await Share.open({
                title: `${selectedCrypto.name} Address`,
                message: `Send ${selectedCrypto.symbol} to this address:\n\n${selectedCrypto.address}`,
            });
        } catch (err) {
            console.log('Share cancelled', err);
        }
    };

    const handleDownloadQR = () => {
        Alert.alert('QR Code Downloaded', 'The QR code has been saved to your device.');
    };

    const getNetworkName = () => {
        switch (selectedCrypto.symbol) {
            case 'BTC': return 'Bitcoin Network';
            case 'ETH': return 'Ethereum Network';
            case 'SOL': return 'Solana Network';
            case 'USDC': return 'Ethereum Network (ERC-20)';
            default: return 'Network';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Receive</Text>
                <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
                    <Share2 color="#FFFFFF" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Robinhood-style Gradient Glow Header */}
                <View style={styles.gradientHeaderContainer}>
                    <View style={styles.gradientGlowBackground} />

                    {/* Crypto Selector */}
                    <TouchableOpacity
                        style={styles.cryptoSelector}
                        onPress={() => setShowNetworkModal(true)}
                    >
                        <View style={styles.cryptoSelectorLeft}>
                            <View style={[styles.cryptoIconWrapper, { shadowColor: selectedCrypto.color }]}>
                                <Image source={selectedCrypto.image} style={styles.cryptoIcon} />
                            </View>
                            <View>
                                <Text style={styles.cryptoName}>{selectedCrypto.name}</Text>
                                <Text style={styles.cryptoSymbol}>{selectedCrypto.symbol}</Text>
                            </View>
                        </View>
                        <ChevronDown color="#888888" size={20} />
                    </TouchableOpacity>

                    {/* Network Info */}
                    <View style={styles.networkInfo}>
                        <Text style={styles.networkLabel}>Network</Text>
                        <Text style={styles.networkValue}>{getNetworkName()}</Text>
                    </View>
                </View>

                {/* QR Code Section with Glow */}
                <View style={styles.qrSection}>
                    <View style={styles.qrGlowBackdrop} />
                    <View style={styles.qrCodeContainer}>
                        <Image
                            source={require('../assets/images/QRCODE.png')}
                            style={styles.qrImage}
                            resizeMode="contain"
                        />
                        {/* Center Coin Icon */}
                        <View style={[styles.qrCoinIcon, { backgroundColor: selectedCrypto.color, shadowColor: selectedCrypto.color }]}>
                            <Image source={selectedCrypto.image} style={styles.qrCoinIconImage} />
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleCopyAddress}
                    >
                        {isCopied ? (
                            <Check color="#00D09C" size={20} />
                        ) : (
                            <Copy color="#FFFFFF" size={20} />
                        )}
                        <Text style={[styles.actionButtonText, isCopied && styles.actionButtonTextCopied]}>
                            {isCopied ? 'Copied' : 'Copy'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleDownloadQR}
                    >
                        <Download color="#FFFFFF" size={20} />
                        <Text style={styles.actionButtonText}>Download</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleShare}
                    >
                        <Share2 color="#FFFFFF" size={20} />
                        <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Address Section */}
                <View style={styles.addressSection}>
                    <Text style={styles.addressLabel}>{selectedCrypto.name} Address</Text>
                    <TouchableOpacity style={styles.addressBox} onPress={handleCopyAddress} activeOpacity={0.7}>
                        <Text style={styles.addressText} numberOfLines={1}>
                            {selectedCrypto.address}
                        </Text>
                        {isCopied ? (
                            <Check color="#00D09C" size={20} />
                        ) : (
                            <Copy color="#888888" size={20} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Warning Text */}
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                        ⚠️ Only send {selectedCrypto.symbol} to this address. Sending other assets may result in permanent loss.
                    </Text>
                </View>

                {/* Recent Deposits Section */}
                <View style={styles.recentDepositsSection}>
                    <Text style={styles.recentDepositsTitle}>Recent Deposits</Text>
                    {recentDeposits.map((deposit) => (
                        <View key={deposit.id} style={styles.depositItem}>
                            <View style={styles.depositLeft}>
                                <Text style={styles.depositAmount}>{deposit.amount} {deposit.symbol}</Text>
                                <Text style={styles.depositValue}>{deposit.value}</Text>
                                <Text style={styles.depositTimestamp}>{deposit.timestamp}</Text>
                            </View>
                            <View style={[styles.statusBadge, deposit.status === 'Completed' ? styles.statusCompleted : styles.statusPending]}>
                                <Text style={styles.statusText}>{deposit.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Success Toast */}
            {showSuccessToast && (
                <View style={styles.toastContainer}>
                    <View style={styles.toastContent}>
                        <Check color="#00D09C" size={20} />
                        <Text style={styles.toastText}>Address copied to clipboard</Text>
                    </View>
                </View>
            )}

            {/* Network Selection Modal */}
            <Modal
                visible={showNetworkModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowNetworkModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Asset</Text>
                            <TouchableOpacity onPress={() => setShowNetworkModal(false)}>
                                <X color="#FFFFFF" size={24} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalList}>
                            {cryptoData.map((crypto) => (
                                <TouchableOpacity
                                    key={crypto.id}
                                    style={[
                                        styles.modalItem,
                                        selectedCrypto.id === crypto.id && styles.modalItemSelected,
                                    ]}
                                    onPress={() => {
                                        setSelectedCrypto(crypto);
                                        setShowNetworkModal(false);
                                    }}
                                >
                                    <View style={styles.modalItemLeft}>
                                        <View style={[styles.modalCryptoIcon, { backgroundColor: crypto.color }]}>
                                            <Image source={crypto.image} style={styles.modalCryptoIconImage} />
                                        </View>
                                        <View>
                                            <Text style={styles.modalCryptoName}>{crypto.name}</Text>
                                            <Text style={styles.modalCryptoSymbol}>{crypto.symbol}</Text>
                                        </View>
                                    </View>
                                    {selectedCrypto.id === crypto.id && (
                                        <Check color="#00D09C" size={20} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    gradientHeaderContainer: {
        backgroundColor: '#0D1117',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#1C2326',
        position: 'relative',
        overflow: 'hidden',
    },
    gradientGlowBackground: {
        position: 'absolute',
        top: -50,
        left: -50,
        right: -50,
        height: 150,
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
        borderRadius: 100,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 40,
        elevation: 10,
    },
    cryptoSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
        zIndex: 10,
    },
    cryptoSelectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cryptoIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    cryptoIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
    cryptoName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    cryptoSymbol: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    networkInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#1C2326',
        position: 'relative',
        zIndex: 10,
    },
    networkLabel: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    networkValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    qrSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginBottom: 24,
        position: 'relative',
    },
    qrGlowBackdrop: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(0, 208, 156, 0.08)',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 30,
        elevation: 15,
    },
    qrCodeContainer: {
        width: 200,
        height: 200,
        borderRadius: 16,
        backgroundColor: '#0D1117',
        borderWidth: 1,
        borderColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
    },
    qrImage: {
        width: '100%',
        height: '100%',
    },
    qrCoinIcon: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 10,
    },
    qrCoinIconImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D1117',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
        gap: 8,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    actionButtonTextCopied: {
        color: '#00D09C',
    },
    addressSection: {
        marginBottom: 20,
    },
    addressLabel: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        marginBottom: 10,
    },
    addressBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0D1117',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    addressText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        flex: 1,
        marginRight: 12,
    },
    warningContainer: {
        backgroundColor: 'rgba(255, 149, 0, 0.1)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 149, 0, 0.3)',
    },
    warningText: {
        color: '#FF9500',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
    },
    recentDepositsSection: {
        backgroundColor: '#0D1117',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    recentDepositsTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 16,
    },
    depositItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1C2326',
    },
    depositLeft: {
        flex: 1,
    },
    depositAmount: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 4,
    },
    depositValue: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        marginBottom: 4,
    },
    depositTimestamp: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusCompleted: {
        backgroundColor: 'rgba(0, 208, 156, 0.15)',
    },
    statusPending: {
        backgroundColor: 'rgba(255, 149, 0, 0.15)',
    },
    statusText: {
        color: '#00D09C',
        fontSize: 12,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    toastContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        zIndex: 1000,
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D1117',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#00D09C',
        gap: 10,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    toastText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#0D1117',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '70%',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1C2326',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    modalList: {
        padding: 10,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    modalItemSelected: {
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
        borderWidth: 1,
        borderColor: '#00D09C',
    },
    modalItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    modalCryptoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCryptoIconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    modalCryptoName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    modalCryptoSymbol: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
});

export default Receive;
