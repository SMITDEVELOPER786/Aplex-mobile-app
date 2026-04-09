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
    Modal,
    Image,
} from 'react-native';
import { ArrowLeft, X, ChevronDown, Info, ArrowUpRight, ArrowDownLeft, RefreshCcw, Zap, Download } from 'lucide-react-native';
import { useWallet } from '../context/WalletContext';
import { ActivityIndicator, FlatList } from 'react-native';

const AlpexaSuisse = require('../assets/images/AlpexaSuisse.png');
const BitcoinIcon = require('../assets/images/BitcoinIcon.png');

const TransactionHistory = ({ navigation }) => {
    const { transactions } = useWallet();
    const [isAccountSheetVisible, setIsAccountSheetVisible] = useState(false);
    const [isTypeSheetVisible, setIsTypeSheetVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('All accounts');
    const [selectedType, setSelectedType] = useState('All Types');
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'Buy': return <ArrowDownLeft color="#1F51FF" size={20} />;
            case 'Send': return <ArrowUpRight color="#FF5000" size={20} />;
            case 'Receive': return <ArrowDownLeft color="#1F51FF" size={20} />;
            case 'Stake': return <Zap color="#1F51FF" size={20} />;
            case 'Swap': return <RefreshCcw color="#1F51FF" size={20} />;
            default: return <RefreshCcw color="#888888" size={20} />;
        }
    };

    const getStatusColor = (type) => {
        switch (type) {
            case 'Buy': 
            case 'Receive':
            case 'Stake':
                return '#1F51FF';
            case 'Send':
            case 'Swap':
                return '#FF5000';
            default:
                return '#888888';
        }
    };

    const accounts = [
        { id: '1', name: 'All' },
        { id: '2', name: 'Alpexa Suisse', icon: AlpexaSuisse },
        { id: '3', name: 'Crypto', icon: BitcoinIcon },
    ];

    const types = [
        { id: '1', name: 'All' },
        { id: '2', name: 'Buy' },
        { id: '3', name: 'Send' },
        { id: '4', name: 'Receive' },
        { id: '5', name: 'Stake' },
        { id: '6', name: 'Swap' },
    ];

    const renderAccountSheet = () => (
        <Modal
            visible={isAccountSheetVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsAccountSheetVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setIsAccountSheetVisible(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>Select an account</Text>

                    <View style={styles.sheetContent}>
                        {accounts.map((acc) => (
                            <TouchableOpacity
                                key={acc.id}
                                style={styles.sheetItem}
                                onPress={() => {
                                    setSelectedAccount(acc.name === 'All' ? 'All accounts' : acc.name);
                                    setIsAccountSheetVisible(false);
                                }}
                            >
                                <View style={styles.sheetItemLeft}>
                                    {acc.icon ? (
                                        <View style={styles.itemIconCircle}>
                                            <Image source={acc.icon} style={styles.iconImage} />
                                        </View>
                                    ) : (
                                        <Text style={[styles.sheetItemText, { marginLeft: 0 }]}>All</Text>
                                    )}
                                    {acc.icon && <Text style={styles.sheetItemText}>{acc.name}</Text>}
                                </View>
                                <View style={[styles.radioCircle, (selectedAccount === acc.name || (selectedAccount === 'All accounts' && acc.name === 'All')) && styles.radioCircleSelected]} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.closeSheetBtn}
                        onPress={() => setIsAccountSheetVisible(false)}
                    >
                        <Text style={styles.closeSheetText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderTypeSheet = () => (
        <Modal
            visible={isTypeSheetVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsTypeSheetVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setIsTypeSheetVisible(false)}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>Transaction type</Text>

                    <View style={styles.sheetContent}>
                        {types.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={styles.sheetItem}
                                onPress={() => {
                                    setSelectedType(type.name === 'All' ? 'All Types' : type.name);
                                    setIsTypeSheetVisible(false);
                                }}
                            >
                                <Text style={styles.sheetItemText}>{type.name}</Text>
                                <View style={[styles.radioCircle, (selectedType === type.name || (selectedType === 'All Types' && type.name === 'All')) && styles.radioCircleSelected]} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.closeSheetBtn}
                        onPress={() => setIsTypeSheetVisible(false)}
                    >
                        <Text style={styles.closeSheetText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const filteredTransactions = transactions.filter(item => {
        const matchesType = selectedType === 'All Types' || item.type === selectedType;
        // Account filtering logic (mock)
        const matchesAccount = selectedAccount === 'All accounts' ||
            (selectedAccount === 'Crypto' && (item.asset === 'Bitcoin' || item.asset === 'Solana')) ||
            (selectedAccount === 'Alpexa Suisse' && item.type === 'Internal');
        return matchesType && matchesAccount;
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>History</Text>
                <TouchableOpacity style={styles.iconBtn} onPress={() => { }}>
                    <Download color="#FFFFFF" size={24} opacity={0.8} />
                </TouchableOpacity>
            </View>

            {/* Robinhood-style Gradient Glow */}
            <View style={styles.gradientHeaderContainer}>
                <View style={styles.gradientGlowBackground} />
                
                {/* Filter Pills */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={styles.filterPill}
                        onPress={() => setIsAccountSheetVisible(true)}
                    >
                        <Text style={styles.filterText} numberOfLines={1}>{selectedAccount}</Text>
                        <ChevronDown color="#888888" size={16} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.filterPill}
                        onPress={() => setIsTypeSheetVisible(true)}
                    >
                        <Text style={styles.filterText} numberOfLines={1}>{selectedType}</Text>
                        <ChevronDown color="#888888" size={16} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                </View>

                {/* Transaction Count */}
                <View style={styles.countContainer}>
                    <Text style={styles.countLabel}>Total Transactions</Text>
                    <Text style={styles.countValue}>{filteredTransactions.length}</Text>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1F51FF" />
                </View>
            ) : (
                <FlatList
                    data={filteredTransactions}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
                            <View style={[styles.transactionIconContainer, { shadowColor: getStatusColor(item.type) }]}>
                                <View style={[styles.iconBackground, { backgroundColor: getStatusColor(item.type) + '20' }]}>
                                    {getIcon(item.type)}
                                </View>
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionAsset}>{item.asset}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                                <View style={styles.typeBadge}>
                                    <Text style={[styles.typeText, { color: getStatusColor(item.type) }]}>{item.type}</Text>
                                </View>
                            </View>
                            <View style={styles.transactionValues}>
                                <Text style={[styles.transactionAmount, { color: getStatusColor(item.type) }]}>{item.amount}</Text>
                                <Text style={styles.transactionValue}>{item.value}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconContainer}>
                                <RefreshCcw color="#888888" size={40} />
                            </View>
                            <Text style={styles.emptyText}>No transactions found</Text>
                            <Text style={styles.emptySubtext}>Your transaction history will appear here</Text>
                        </View>
                    }
                />
            )}

            {renderAccountSheet()}
            {renderTypeSheet()}
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
        paddingBottom: 10,
    },
    iconBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        flex: 1,
        marginLeft: 10,
    },
    gradientHeaderContainer: {
        backgroundColor: '#0D1117',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 20,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    gradientGlowBackground: {
        position: 'absolute',
        top: -50,
        left: -50,
        right: -50,
        height: 120,
        backgroundColor: 'rgba(31, 81, 255, 0.08)',
        borderRadius: 80,
        shadowColor: '#1F51FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 12,
        position: 'relative',
        zIndex: 10,
    },
    filterPill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C2326',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 6,
    },
    filterText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#1C2326',
        position: 'relative',
        zIndex: 10,
    },
    countLabel: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    countValue: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    transactionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    iconBackground: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionAsset: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 4,
    },
    transactionDate: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        marginBottom: 6,
    },
    typeBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(31, 81, 255, 0.1)',
    },
    typeText: {
        fontSize: 11,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    transactionValues: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 4,
    },
    transactionValue: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    emptyContainer: {
        marginTop: 120,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtext: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#0D1117',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    sheetHandle: {
        width: 36,
        height: 4,
        backgroundColor: '#333333',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    sheetTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 32,
    },
    sheetContent: {
        gap: 8,
        marginBottom: 30,
    },
    sheetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 8,
    },
    sheetItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    itemIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1C2326',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    sheetItemText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        opacity: 0.3,
    },
    radioCircleSelected: {
        backgroundColor: '#1F51FF',
        borderColor: '#1F51FF',
        opacity: 1,
    },
    closeSheetBtn: {
        backgroundColor: '#1F51FF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1F51FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    closeSheetText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
});

export default TransactionHistory;
