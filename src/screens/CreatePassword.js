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
import { Eye, EyeOff } from 'lucide-react-native';

const CreatePassword = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (pwd) => {
        return pwd.length >= 6;
    };

    const handleSavePassword = () => {
        const newErrors = {};

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigation.navigate('Login');
        }
    };

    const isFormValid = password.trim() && confirmPassword.trim() && validatePassword(password) && password === confirmPassword;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create New Password</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <View style={[styles.passwordInputWrapper, errors.password && styles.passwordInputWrapperError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Enter Your Password"
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
                                        <EyeOff color="#666666" size={20} />
                                    ) : (
                                        <Eye color="#666666" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={[styles.passwordInputWrapper, errors.confirmPassword && styles.passwordInputWrapperError]}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Confirm Your Password"
                                    placeholderTextColor="#666666"
                                    value={confirmPassword}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                                    }}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? (
                                        <EyeOff color="#666666" size={20} />
                                    ) : (
                                        <Eye color="#666666" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                        </View>

                        <TouchableOpacity
                            style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
                            onPress={handleSavePassword}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.saveText}>Save Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.backText}>Back</Text>
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
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 50,
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 25,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'DMSans-Medium',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#333333',
    },
    passwordInputWrapperError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 6,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    passwordInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14,
        height: '100%',
    },
    saveButton: {
        backgroundColor: '#00D09C',
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    saveText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
    backButton: {
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    backText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
    },
});

export default CreatePassword;
