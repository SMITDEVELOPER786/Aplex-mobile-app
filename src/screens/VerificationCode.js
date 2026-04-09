import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const VerificationCode = ({ navigation, route }) => {
    const [code, setCode] = useState(['', '', '', '']);
    const [isKeypadVisible, setIsKeypadVisible] = useState(false);
    const { email, isNewSignup } = route?.params || {};

    const handleNumberPress = (num) => {
        const firstEmptyIndex = code.findIndex(digit => digit === '');
        if (firstEmptyIndex !== -1) {
            const newCode = [...code];
            newCode[firstEmptyIndex] = num;
            setCode(newCode);
        }
    };

    const handleBackspace = () => {
        const lastFilledIndex = [...code].reverse().findIndex(digit => digit !== '');
        if (lastFilledIndex !== -1) {
            const actualIndex = 3 - lastFilledIndex;
            const newCode = [...code];
            newCode[actualIndex] = '';
            setCode(newCode);
        }
    };

    const isValidCode = code.every(digit => digit !== '');

    const handleVerify = () => {
        if (isValidCode) {
            if (isNewSignup) {
                navigation.navigate('Login', { isNewSignup: true, email });
            } else {
                navigation.navigate('CreatePassword');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.content}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Verification</Text>
                    <Text style={styles.subtitle}>Enter the 4 digit code sent to your email</Text>
                </View>

                <TouchableOpacity
                    style={styles.codeContainer}
                    activeOpacity={1}
                    onPress={() => setIsKeypadVisible(true)}
                >
                    {code.map((digit, index) => (
                        <View key={index} style={[styles.codeInput, digit !== '' && styles.codeInputActive]}>
                            <Text style={styles.codeText}>{digit}</Text>
                        </View>
                    ))}
                </TouchableOpacity>

                <View style={styles.resendContainer}>
                    <TouchableOpacity>
                        <Text style={styles.resendLabel}>Resend Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.resendText}>Don't receive OTP?</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer to push button to bottom when keypad is hidden */}
                {!isKeypadVisible && <View style={{ flex: 1 }} />}

                <View style={[styles.bottomSection, isKeypadVisible && styles.bottomSectionActive]}>
                    <TouchableOpacity
                        style={[styles.verifyButton, !isValidCode && styles.verifyButtonDisabled]}
                        onPress={handleVerify}
                        disabled={!isValidCode}
                    >
                        <Text style={styles.verifyText}>Verify</Text>
                    </TouchableOpacity>

                    {isKeypadVisible && (
                        <View style={styles.keypadContainer}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    style={styles.keyButton}
                                    onPress={() => handleNumberPress(num.toString())}
                                >
                                    <Text style={styles.keyText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                            <View style={styles.keyButton} />
                            <TouchableOpacity
                                style={styles.keyButton}
                                onPress={() => handleNumberPress('0')}
                            >
                                <Text style={styles.keyText}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.keyButton}
                                onPress={handleBackspace}
                            >
                                <Text style={styles.keyText}>⌫</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    header: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginTop: 15,
        textAlign: 'center',
        opacity: 0.8,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    codeInput: {
        backgroundColor: '#1A1A1A',
        width: 65,
        height: 65,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeInputActive: {
        borderColor: '#1F51FF',
        backgroundColor: '#111111',
    },
    codeText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
    },
    resendContainer: {
        alignItems: 'center',
        gap: 12,
    },
    resendLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        opacity: 0.6,
    },
    resendText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        opacity: 0.8,
    },
    bottomSection: {
        paddingBottom: 20,
    },
    bottomSectionActive: {
        marginTop: 'auto',
    },
    verifyButton: {
        backgroundColor: '#1F51FF',
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#1F51FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    verifyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    verifyButtonDisabled: {
        opacity: 0.4,
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
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
});

export default VerificationCode;
