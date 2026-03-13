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
    Image,
    Platform,
    Modal,
    FlatList,
    Animated,
} from 'react-native';
import { Eye, EyeOff, ArrowLeft, ChevronDown } from 'lucide-react-native';

const COUNTRIES = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+383', name: 'Chile', flag: '🇨🇱' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
];

const EmailSignup = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[9]);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [errors, setErrors] = useState({});

    const fadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 7 && cleaned.length <= 15;
    };

    const handleSignUp = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

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

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else {
            const cleaned = phoneNumber.replace(/\D/g, '');
            if (cleaned.length < 7) {
                newErrors.phoneNumber = 'Phone number is too short';
            } else if (cleaned.length > 15) {
                newErrors.phoneNumber = 'Phone number is too long';
            } else if (!validatePhoneNumber(phoneNumber)) {
                newErrors.phoneNumber = 'Please enter a valid phone number';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigation.navigate('VerificationCode', { email, isNewSignup: true });
        }
    };

    const isFormValid =
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        validateEmail(email) &&
        password.trim() &&
        password.length >= 6 &&
        phoneNumber.trim() &&
        validatePhoneNumber(phoneNumber);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Background Gradient Glow */}
            <View style={styles.backgroundGlowContainer}>
                <View style={styles.gradientOrb1} />
                <View style={styles.gradientOrb2} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#FFFFFF" size={24} />
                    </TouchableOpacity>

                    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Join Alpexa Suisse today</Text>
                        </View>
                    </Animated.View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={[styles.input, errors.firstName && styles.inputError]}
                                placeholder="Enter your First name"
                                placeholderTextColor="#666666"
                                value={firstName}
                                onChangeText={(text) => {
                                    setFirstName(text);
                                    if (errors.firstName) setErrors({ ...errors, firstName: '' });
                                }}
                            />
                            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={[styles.input, errors.lastName && styles.inputError]}
                                placeholder="Enter your Last name"
                                placeholderTextColor="#666666"
                                value={lastName}
                                onChangeText={(text) => {
                                    setLastName(text);
                                    if (errors.lastName) setErrors({ ...errors, lastName: '' });
                                }}
                            />
                            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Your Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="Enter your email address"
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
                                    placeholder="Enter your Password"
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

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={[styles.phoneInputWrapper, errors.phoneNumber && styles.phoneInputWrapperError]}>
                                <TouchableOpacity
                                    style={styles.countryPicker}
                                    onPress={() => setShowCountryPicker(true)}
                                >
                                    <Text style={styles.flagEmoji}>{selectedCountry.flag}</Text>
                                    <Text style={styles.countryCode}>{selectedCountry.code}</Text>
                                    <ChevronDown color="#888888" size={16} />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor="#666666"
                                    value={phoneNumber}
                                    onChangeText={(text) => {
                                        const filtered = text.replace(/[^0-9\-\s()]/g, '');
                                        setPhoneNumber(filtered);
                                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                                    }}
                                    keyboardType="phone-pad"
                                    maxLength={18}
                                />
                            </View>
                            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                            <Modal
                                visible={showCountryPicker}
                                transparent={true}
                                animationType="slide"
                                onRequestClose={() => setShowCountryPicker(false)}
                            >
                                <SafeAreaView style={styles.modalContainer}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Select Country</Text>
                                        <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                                            <Text style={styles.closeButton}>✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={COUNTRIES}
                                        keyExtractor={(item) => item.code}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={[
                                                    styles.countryItem,
                                                    selectedCountry.code === item.code && styles.countryItemActive,
                                                ]}
                                                onPress={() => {
                                                    setSelectedCountry(item);
                                                    setShowCountryPicker(false);
                                                }}
                                            >
                                                <Text style={styles.countryItemFlag}>{item.flag}</Text>
                                                <View style={styles.countryItemText}>
                                                    <Text style={styles.countryItemName}>{item.name}</Text>
                                                    <Text style={styles.countryItemCode}>{item.code}</Text>
                                                </View>
                                                {selectedCountry.code === item.code && (
                                                    <Text style={styles.checkmark}>✓</Text>
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                </SafeAreaView>
                            </Modal>
                        </View>

                        <TouchableOpacity
                            style={[styles.signUpButton, !isFormValid && styles.signUpButtonDisabled]}
                            onPress={handleSignUp}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.signUpText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginLinkButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginLinkText}>Already have an account? </Text>
                            <Text style={styles.loginLinkHighlight}>Log in</Text>
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
    headerContainer: {
        width: '100%',
    },
    header: {
        marginTop: 20,
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
        height: '100%',
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D1117',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#333333',
        paddingRight: 10,
        height: '100%',
        gap: 6,
    },
    flagEmoji: {
        fontSize: 20,
    },
    countryCode: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    phoneInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14,
        height: '100%',
        paddingLeft: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    closeButton: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Regular',
        fontWeight: '300',
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    countryItemActive: {
        backgroundColor: '#00D09C20',
    },
    countryItemFlag: {
        fontSize: 24,
        marginRight: 12,
    },
    countryItemText: {
        flex: 1,
    },
    countryItemName: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
    countryItemCode: {
        color: '#A0A0A0',
        fontSize: 12,
        marginTop: 4,
    },
    checkmark: {
        color: '#00D09C',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    signUpButton: {
        backgroundColor: '#00D09C',
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    signUpText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    loginLinkButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 15,
    },
    loginLinkText: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    loginLinkHighlight: {
        color: '#00D09C',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    backgroundGlowContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    gradientOrb1: {
        position: 'absolute',
        top: -150,
        left: -150,
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 60,
        elevation: 15,
    },
    gradientOrb2: {
        position: 'absolute',
        bottom: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(0, 208, 156, 0.08)',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 60,
        elevation: 15,
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    passwordInputWrapperError: {
        borderColor: '#FF3B30',
    },
    phoneInputWrapperError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 6,
    },
    signUpButtonDisabled: {
        opacity: 0.5,
    },
});

export default EmailSignup;
