import React, { useState } from 'react';
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
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendCode = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigation.navigate('VerificationCode', { email, isNewSignup: false });
        }
    };

    const isFormValid = email.trim() && validateEmail(email);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#FFFFFF" size={24} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Forgot Password</Text>
                        <Text style={styles.subtitle}>
                            Enter the email associated with your account and we'll send an email instruction to reset password.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder=""
                                placeholderTextColor="#666666"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Text style={styles.helperText}>
                                Please enter your email address to receive a Verification Code
                            </Text>
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        <TouchableOpacity
                            style={[styles.sendButton, !isFormValid && styles.sendButtonDisabled]}
                            onPress={handleSendCode}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
        textAlign: 'center',
        opacity: 0.9,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 60,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 12,
        fontFamily: 'DMSans-SemiBold',
    },
    input: {
        backgroundColor: 'transparent',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#FFFFFF',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#666666',
    },
    helperText: {
        color: '#675F5F',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        lineHeight: 18,
    },
    sendButton: {
        backgroundColor: '#00D09C',
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    sendText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 6,
        textAlign: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});

export default ForgotPassword;
