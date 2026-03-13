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
    Switch,
} from 'react-native';
import { ArrowLeft, TrendingUp, CheckCircle, Shield, Gift } from 'lucide-react-native';

const Notifications = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [settings, setSettings] = useState({
        priceAlert: true,
        transactionUpdates: true,
        securityAlert: false,
        emailNotifications: true,
    });

    const [notificationsData, setNotificationsData] = useState([
        {
            id: '1',
            type: 'Price Alert',
            title: 'Price Alert: Bitcoin',
            description: 'BTC has reached your target price of $45,000',
            time: '5 minutes ago',
            icon: <TrendingUp color="#00D33B" size={18} />,
            unread: true,
        },
        {
            id: '2',
            type: 'Transaction',
            title: 'Transaction Completed',
            description: 'Your purchase of 0.001 BTC has been confirmed.',
            time: '1 hour ago',
            icon: <CheckCircle color="#00D33B" size={18} />,
            unread: true,
        },
        {
            id: '3',
            type: 'Security',
            title: 'Security Alert',
            description: 'New login from Chrome on Windows and ios.',
            time: '3 hours ago',
            icon: <Shield color="#00D33B" size={18} />,
            unread: false,
        },
        {
            id: '4',
            type: 'Referral',
            title: 'Referral Reward',
            description: 'You earned $10 for referring a friend and family.',
            time: 'Yesterday',
            icon: <Gift color="#00D33B" size={18} />,
            unread: false,
        },
    ]);

    const handleMarkAllRead = () => {
        setNotificationsData(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderTabs = () => (
        <View style={styles.tabContainer}>
            {['All', 'Unread', 'Settings'].map((tab) => (
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

    const renderNotificationItem = (item) => (
        <View key={item.id} style={[styles.notificationCard, item.unread && styles.unreadBorder]}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        {item.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationDesc}>{item.description}</Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
            </View>
        </View>
    );

    const renderSettings = () => (
        <View style={styles.settingsList}>
            <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>Price Alert</Text>
                    <Text style={styles.settingSubtitle}>Get notified when prices reach your targets.</Text>
                </View>
                <Switch
                    value={settings.priceAlert}
                    onValueChange={() => toggleSetting('priceAlert')}
                    trackColor={{ false: '#333333', true: '#00D33B' }}
                    thumbColor="#FFFFFF"
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>Transaction updates</Text>
                    <Text style={styles.settingSubtitle}>Notification for all transactions.</Text>
                </View>
                <Switch
                    value={settings.transactionUpdates}
                    onValueChange={() => toggleSetting('transactionUpdates')}
                    trackColor={{ false: '#333333', true: '#00D33B' }}
                    thumbColor="#FFFFFF"
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>Security Alert</Text>
                    <Text style={styles.settingSubtitle}>New login from Chrome on windows and ios.</Text>
                </View>
                <Switch
                    value={settings.securityAlert}
                    onValueChange={() => toggleSetting('securityAlert')}
                    trackColor={{ false: '#333333', true: '#00D33B' }}
                    thumbColor="#FFFFFF"
                />
            </View>

            <View style={styles.settingItem}>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>Email Notifications</Text>
                    <Text style={styles.settingSubtitle}>New login from Chrome on windows and ios.</Text>
                </View>
                <Switch
                    value={settings.emailNotifications}
                    onValueChange={() => toggleSetting('emailNotifications')}
                    trackColor={{ false: '#333333', true: '#00D33B' }}
                    thumbColor="#FFFFFF"
                />
            </View>
        </View>
    );

    const filteredNotifications = activeTab === 'Unread'
        ? notificationsData.filter(n => n.unread)
        : notificationsData;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={handleMarkAllRead}>
                    <Text style={styles.markReadText}>Mark all read</Text>
                </TouchableOpacity>
            </View>

            {renderTabs()}

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {activeTab === 'Settings' ? (
                    renderSettings()
                ) : (
                    <View style={styles.notificationsList}>
                        {filteredNotifications.map(renderNotificationItem)}
                    </View>
                )}
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
    markReadText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'DMSans-SemiBold',
        opacity: 0.6,
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
    notificationsList: {
        gap: 12,
    },
    notificationCard: {
        backgroundColor: '#111111',
        borderRadius: 16,
        padding: 16,
    },
    unreadBorder: {
        borderWidth: 1,
        borderColor: '#333333',
    },
    cardHeader: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    notificationDesc: {
        color: '#999999',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        lineHeight: 18,
        marginBottom: 8,
    },
    notificationTime: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    settingsList: {
        gap: 24,
        marginTop: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingTextContainer: {
        flex: 1,
        marginRight: 20,
    },
    settingTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    settingSubtitle: {
        color: '#666666',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00D33B',
    },
});

export default Notifications;
