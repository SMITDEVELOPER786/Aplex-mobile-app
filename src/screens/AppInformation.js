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
    Image,
} from 'react-native';
import { ArrowLeft, ShieldCheck, Zap, BarChart3 } from 'lucide-react-native';

const AppLogo = require('../assets/images/Walthrough1.png');

const AppInformation = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('About');

    const renderTabs = () => (
        <View style={styles.tabContainer}>
            {['About', 'Terms', 'Privacy'].map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderAbout = () => (
        <View style={styles.aboutContent}>
            <View style={styles.logoCard}>
                <View style={styles.logoWrapper}>
                    <Image source={AppLogo} style={styles.logoImage} />
                </View>
                <Text style={styles.appName}>Alpexa Suisse</Text>
                <Text style={styles.versionInfo}>Version 2.0.0</Text>
                <Text style={styles.buildInfo}>Build 12345</Text>
            </View>

            <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>About Alpexa Suisse</Text>
                <Text style={styles.descriptionText}>
                    It's designed for serious users who want more than just a place to store Bitcoin; it supports STOs, offers insured custody, and integrates with fiat payments. If you're into digital assets, tokenized equities, or advanced crypto usage.
                </Text>
            </View>

            <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Key Features</Text>

                <View style={styles.featureItem}>
                    <ShieldCheck color="#00D33B" size={20} style={styles.featureIcon} />
                    <View style={styles.featureTextWrapper}>
                        <Text style={styles.featureTitle}>Bank Level Security</Text>
                        <Text style={styles.featureDesc}>Your assets are protected with multi layer encryption and cold storage</Text>
                    </View>
                </View>

                <View style={styles.featureItem}>
                    <Zap color="#4facfe" size={20} style={styles.featureIcon} />
                    <View style={styles.featureTextWrapper}>
                        <Text style={styles.featureTitle}>Easy Trading</Text>
                        <Text style={styles.featureDesc}>Buy, sell and swap crypto in just a few taps.</Text>
                    </View>
                </View>

                <View style={styles.featureItem}>
                    <BarChart3 color="#00D33B" size={20} style={styles.featureIcon} />
                    <View style={styles.featureTextWrapper}>
                        <Text style={styles.featureTitle}>Earn Rewards</Text>
                        <Text style={styles.featureDesc}>Stake your assets and earn passive income daily.</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderTerms = () => (
        <View style={styles.termsContent}>
            <Text style={styles.legalTitle}>Terms Of Service</Text>
            <Text style={styles.lastUpdated}>Last Updated: November 15, 2025</Text>

            <View style={styles.legalSection}>
                <Text style={styles.legalPoint}>1. Acceptance of Terms.</Text>
                <Text style={styles.legalText}>
                    By accessing and using wallet, you accept and agree to be bound by terms of this agreement.
                </Text>

                <Text style={styles.legalPoint}>2. Use License</Text>
                <Text style={styles.legalText}>
                    Permission is granted to temporarily use wallet for personal, non-commercial transitory viewing only.
                </Text>

                <Text style={styles.legalPoint}>3. Use Account</Text>
                <Text style={styles.legalText}>
                    You are responsible for maintain the confidentiality of your account and password.
                </Text>

                <Text style={styles.legalPoint}>4. Trading & Transactions</Text>
                <Text style={styles.legalText}>
                    All cryptocurrency transactions are final and irreversible. You acknowledge the risks associated with trading.
                </Text>
            </View>
        </View>
    );

    const renderPrivacy = () => (
        <View style={styles.termsContent}>
            <Text style={styles.legalTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last Updated: November 14, 2025</Text>

            <View style={styles.legalSection}>
                <Text style={styles.legalPoint}>1. Information We Collect</Text>
                <Text style={styles.legalText}>
                    We collect information you provide directly to us including your name, email address, phone number and identification doc.
                </Text>

                <Text style={styles.legalPoint}>2. Information Sharing</Text>
                <Text style={styles.legalText}>
                    We do not share your personal information with third parties except as described in this policy or with your consent.
                </Text>

                <Text style={styles.legalPoint}>3. Data Security</Text>
                <Text style={styles.legalText}>
                    We implement appropriate security measures to protect your personal information from access.
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>App Information</Text>
                <View style={{ width: 44 }} />
            </View>

            {renderTabs()}

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {activeTab === 'About' && renderAbout()}
                {activeTab === 'Terms' && renderTerms()}
                {activeTab === 'Privacy' && renderPrivacy()}
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#111111',
        marginHorizontal: 20,
        padding: 4,
        borderRadius: 25,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#333333',
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        opacity: 0.5,
    },
    activeTabText: {
        opacity: 1,
        fontFamily: 'DMSans-Bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    aboutContent: {
        gap: 30,
    },
    logoCard: {
        backgroundColor: '#111111',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#222222',
    },
    logoWrapper: {
        width: 80,
        height: 80,
        backgroundColor: '#000000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    logoImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    appName: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    versionInfo: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginBottom: 2,
    },
    buildInfo: {
        color: '#444444',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    descriptionSection: {
        gap: 12,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    descriptionText: {
        color: '#999999',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 22,
    },
    featuresSection: {
        gap: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    featureIcon: {
        marginTop: 2,
        marginRight: 16,
    },
    featureTextWrapper: {
        flex: 1,
    },
    featureTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    featureDesc: {
        color: '#666666',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        lineHeight: 18,
    },
    termsContent: {
        paddingTop: 10,
    },
    legalTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    lastUpdated: {
        color: '#666666',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        marginBottom: 30,
    },
    legalSection: {
        gap: 24,
    },
    legalPoint: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 8,
    },
    legalText: {
        color: '#999999',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 22,
    },
});

export default AppInformation;
