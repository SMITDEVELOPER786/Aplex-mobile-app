import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Switch,
    Platform,
    ScrollView,
} from 'react-native';
import { ArrowLeft, ShieldCheck, Fingerprint, Lock } from 'lucide-react-native';

const SecuritySetting = ({ navigation }) => {
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
    const [isPinEnabled, setIsPinEnabled] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Security Setting</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Security Level */}
                <View style={styles.securityItem}>
                    <View style={styles.iconCircle}>
                        <ShieldCheck color="#00D33B" size={20} />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>Security Level: High</Text>
                        <Text style={styles.itemSubtitle}>Your account is well protected</Text>
                    </View>
                </View>

                {/* Biometric */}
                <View style={styles.securityItem}>
                    <View style={styles.iconCircle}>
                        <Fingerprint color="#00D33B" size={20} />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>Biometric Login</Text>
                        <Text style={styles.itemSubtitle}>Use Fingerprint or Face ID</Text>
                    </View>
                    <Switch
                        value={isBiometricEnabled}
                        onValueChange={setIsBiometricEnabled}
                        trackColor={{ false: '#333333', true: '#00D33B' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                {/* PIN Code */}
                <View style={styles.securityItem}>
                    <View style={styles.iconCircle}>
                        <Lock color="#00D33B" size={20} />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>PIN Code</Text>
                        <Text style={styles.itemSubtitle}>Require PIN for transactions</Text>
                    </View>
                    <Switch
                        value={isPinEnabled}
                        onValueChange={setIsPinEnabled}
                        trackColor={{ false: '#333333', true: '#00D33B' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                {/* Active Sessions */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Active Sessions</Text>
                </View>

                <View style={styles.sessionItem}>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>Security Level: High</Text>
                        <Text style={styles.itemSubtitle}>San Francisco, CA</Text>
                        <Text style={styles.itemSubtitle}>Last Active : Now</Text>
                    </View>
                    <Text style={styles.currentText}>Current</Text>
                </View>

                <View style={styles.sessionItem}>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>Chrome on Windows</Text>
                        <Text style={styles.itemSubtitle}>New York, NY</Text>
                        <Text style={styles.itemSubtitle}>Last Active : 2 days ago</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.revokeText}>Revoke</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    securityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    itemSubtitle: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    sectionHeader: {
        marginTop: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
    },
    sessionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    currentText: {
        color: '#00D33B',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    revokeText: {
        color: '#FF4444',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
});

export default SecuritySetting;
