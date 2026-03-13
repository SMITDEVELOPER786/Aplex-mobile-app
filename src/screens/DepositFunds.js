import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { ArrowLeft, ChevronDown, Copy, X } from 'lucide-react-native';

const DepositFunds = ({ navigation }) => {
    const [step, setStep] = useState(1); // 1: Amount, 2: Method, 3: Wire Info
    const [amount, setAmount] = useState('500');
    const [selectedFrom, setSelectedFrom] = useState('Choose Account');
    const [selectedTo, setSelectedTo] = useState('Alpexa Suisse');
    const [selectedMethod, setSelectedMethod] = useState('add');

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
            setAmount(amount + key);
        }
    };

    const handleContinue = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            if (selectedMethod === 'wire') {
                setStep(3);
            } else {
                // Logic for adding an account would go here
                alert('Add account feature coming soon!');
            }
        }
    };

    const copyToClipboard = (text) => {
        // Implement clipboard functionality
        console.log('Copied:', text);
    };

    // Step 1: Amount Entry
    if (step === 1) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Deposit</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.content}>
                    {/* Amount Display */}
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>${amount}</Text>
                    </View>

                    {/* Balance Info */}
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>Daily Deposit limit: 0.00/100000</Text>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>

                    {/* Keypad */}
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
                </View>
            </SafeAreaView>
        );
    }

    // Step 2: Deposit Method Selection
    if (step === 2) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setStep(1)}>
                        <ArrowLeft color="#FFFFFF" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Deposit</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Amount Display */}
                    <View style={styles.amountContainerSmall}>
                        <Text style={styles.amountTextSmall}>${amount}</Text>
                    </View>

                    {/* Deposit Form Section */}
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Deposit From</Text>

                        {/* From Account Selector */}
                        <TouchableOpacity style={styles.selector}>
                            <View style={styles.selectorContent}>
                                <Text style={styles.selectorLabel}>From</Text>
                                <View style={styles.selectorValue}>
                                    <Text style={styles.selectorText}>{selectedFrom}</Text>
                                    <ChevronDown color="#888888" size={20} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* To Account Selector */}
                        <TouchableOpacity style={styles.selector}>
                            <View style={styles.selectorContent}>
                                <Text style={styles.selectorLabel}>To</Text>
                                <View style={styles.selectorValue}>
                                    <Text style={styles.selectorText}>{selectedTo}</Text>
                                    <ChevronDown color="#888888" size={20} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* External Accounts Section */}
                        <View style={styles.externalSection}>
                            <Text style={styles.externalTitle}>External Accounts</Text>

                            <TouchableOpacity
                                style={styles.externalOption}
                                onPress={() => setSelectedMethod('add')}
                            >
                                <View style={styles.radioOuter}>
                                    {selectedMethod === 'add' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.externalText}>add an account</Text>
                            </TouchableOpacity>

                            <Text style={styles.otherMethodsTitle}>Other transfer methods</Text>

                            <TouchableOpacity
                                style={styles.externalOption}
                                onPress={() => setSelectedMethod('wire')}
                            >
                                <View style={styles.radioOuter}>
                                    {selectedMethod === 'wire' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.externalText}>Send a wire transfer</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Continue Button */}
                        <TouchableOpacity
                            style={styles.continueButtonBottom}
                            onPress={handleContinue}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Step 3: Wire Transfer Information
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Title Section */}
                <View style={styles.wireInfoHeader}>
                    <Text style={styles.wireTitle}>Send a wire Transfer</Text>
                    <Text style={styles.wireSubtitle}>
                        Submit this information to you bank exactly as its is displayed. Your full name should match your Alpexa account,
                    </Text>
                </View>

                {/* Bank Information */}
                <View style={styles.bankInfoSection}>
                    <Text style={styles.bankSectionTitle}>Transfer Information</Text>

                    {/* Transfer Information Fields */}
                    <View style={styles.infoFieldsContainer}>
                        <TouchableOpacity
                            style={styles.infoFieldItem}
                            onPress={() => copyToClipboard('1234567890')}
                        >
                            <Text style={styles.infoLabel}>Recipient Account Number</Text>
                            <Copy color="#FFFFFF" size={18} opacity={0.8} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.infoFieldItem}
                            onPress={() => copyToClipboard('987654321')}
                        >
                            <Text style={styles.infoLabel}>Routing Number</Text>
                            <Copy color="#FFFFFF" size={18} opacity={0.8} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.infoFieldItem}
                            onPress={() => copyToClipboard('Alpexa Suisse LLC')}
                        >
                            <Text style={styles.infoLabel}>Recipient Name</Text>
                            <Copy color="#FFFFFF" size={18} opacity={0.8} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.infoFieldItem}
                            onPress={() => copyToClipboard('123 Main St, City, State')}
                        >
                            <Text style={styles.infoLabel}>Recipient Address</Text>
                            <Copy color="#FFFFFF" size={18} opacity={0.8} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.infoFieldItem}
                            onPress={() => copyToClipboard('United State')}
                        >
                            <View>
                                <Text style={styles.infoSubLabel}>Bank Country</Text>
                                <Text style={styles.infoLabelText}>United State</Text>
                            </View>
                            <Copy color="#FFFFFF" size={18} opacity={0.8} />
                        </TouchableOpacity>
                    </View>

                    {/* Notice */}
                    <View style={styles.noticeContainer}>
                        <Text style={styles.noticeText}>
                            Incoming wire transfers are processed within 1-2 days , If submitted before 1 PM PT.
                        </Text>
                    </View>

                    {/* Done Button */}
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={() => {
                            navigation.navigate('Main');
                        }}
                    >
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#111111',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    amountContainer: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 20,
    },
    amountText: {
        color: '#FFFFFF',
        fontSize: 64,
        fontFamily: 'DMSans-Bold',
    },
    amountContainerSmall: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    amountTextSmall: {
        color: '#FFFFFF',
        fontSize: 48,
        fontFamily: 'DMSans-Bold',
    },
    balanceContainer: {
        alignItems: 'center',
        marginBottom: 100,
    },
    balanceText: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    continueButton: {
        backgroundColor: '#E5E5E5',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    continueButtonBottom: {
        backgroundColor: '#E5E5E5',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    continueButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingBottom: 20,
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
    formSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginBottom: 25,
    },
    selector: {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
    },
    selectorContent: {
        gap: 8,
    },
    selectorLabel: {
        color: '#888888',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    selectorValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectorText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    externalSection: {
        marginTop: 30,
    },
    externalTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    externalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        gap: 15,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#888888',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    externalText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    otherMethodsTitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        marginTop: 25,
        marginBottom: 15,
    },
    wireInfoHeader: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
    },
    wireTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 12,
    },
    wireSubtitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
    },
    bankInfoSection: {
        paddingHorizontal: 20,
    },
    bankSectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginTop: 10,
        marginBottom: 25,
    },
    infoFieldsContainer: {
        gap: 0,
    },
    infoFieldItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    infoLabel: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    infoSubLabel: {
        color: '#888888',
        fontSize: 12,
        fontFamily: 'DMSans-Medium',
        marginBottom: 4,
    },
    infoLabelText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    noticeContainer: {
        marginTop: 35,
        marginBottom: 60,
        paddingHorizontal: 0,
    },
    noticeText: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        opacity: 0.9,
    },
    doneButton: {
        backgroundColor: '#E5E5E5',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default DepositFunds;
