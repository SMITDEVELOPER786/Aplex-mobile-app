import React, { useState, useEffect, useRef } from 'react';
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
    Image,
    Platform,
    Alert,
    Modal,
    Animated,
} from 'react-native';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react-native';

const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { isNewSignup, email: signupEmail } = route?.params || {};
    
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        // Pre-fill email if coming from new signup
        if (signupEmail) {
            setEmail(signupEmail);
        }
    }, [signupEmail]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (isNewSignup) {
                setShowSuccessModal(true);
            } else {
                navigation.navigate('Main');
            }
        }
    };

    const handleContinue = () => {
        setShowSuccessModal(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const isFormValid = email.trim() && password.trim() && validateEmail(email) && password.length >= 6;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Background Gradient Glow */}
            <View style={styles.backgroundGlowContainer}>
                <View style={styles.gradientOrb} />
            </View>

            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
                        <View style={styles.successIconCircle}>
                            <Check color="#000000" size={32} strokeWidth={3} />
                        </View>
                        <Text style={styles.modalTitleText}>Account Created Successfully</Text>
                        <Text style={styles.modalSubtitleText}>
                            Welcome to Alpexa Suisse! Your account has been created.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleContinue}
                        >
                            <Text style={styles.modalButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#FFFFFF" size={24} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to your account</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="Enter your email"
                                placeholderTextColor="#666666"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={[styles.passwordInputWrapper, errors.password && styles.passwordInputWrapperError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#666666"
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff color="#888888" size={20} />
                                    ) : (
                                        <Eye color="#888888" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.rememberRow}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                    {rememberMe && <Check color="#FFFFFF" size={14} strokeWidth={3} />}
                                </View>
                                <Text style={styles.rememberText}>Remember Me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.signInButton, !isFormValid && styles.signInButtonDisabled]}
                            onPress={handleSignIn}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.signInText}>Sign In</Text>
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
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        color: '#888888',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#0D1117',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    passwordInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#666666',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#00D09C',
        borderColor: '#00D09C',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    rememberText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    forgotText: {
        color: '#A0A0A0',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    passwordInputWrapperError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 6,
    },
    signInButtonDisabled: {
        opacity: 0.5,
    },
    signInButton: {
        backgroundColor: '#00D09C',
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    signInText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#333333',
    },
    dividerText: {
        color: '#666666',
        paddingHorizontal: 15,
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    modalContent: {
        backgroundColor: '#0D1117',
        width: '100%',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1C2326',
        marginHorizontal: 20,
    },
    successIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00D09C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
    },
    modalTitleText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    modalSubtitleText: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    modalButton: {
        backgroundColor: '#00D09C',
        width: '100%',
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
    modalButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    backgroundGlowContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    gradientOrb: {
        position: 'absolute',
        top: -200,
        right: -200,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(0, 208, 156, 0.12)',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 80,
        elevation: 20,
    },
});

export default Login;
