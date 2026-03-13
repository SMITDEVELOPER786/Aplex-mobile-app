import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Platform,
} from 'react-native';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';

const Settings = ({ navigation }) => {
    const menuItems = [
        { id: '1', title: 'Transaction History', screen: 'TransactionHistory' },
        { id: '2', title: 'Personal Information', screen: 'Profile' },
        { id: '3', title: 'Security Setting', screen: 'SecuritySetting' },
        { id: '4', title: 'Languages', screen: 'Language' },
        { id: '5', title: 'Notifications', screen: 'Notifications' },
        { id: '6', title: 'App Information', screen: 'AppInformation' },
    ];

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Setting</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionSubtitle}>Account details and options</Text>

                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.screen) {
                                    navigation.navigate(item.screen);
                                }
                            }}
                        >
                            <Text style={styles.menuTitle}>{item.title}</Text>
                            <ChevronRight color="#FFFFFF" size={20} opacity={0.5} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
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
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    sectionSubtitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 30,
        marginTop: 10,
    },
    menuContainer: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    menuTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Medium',
    },
    logoutContainer: {
        marginTop: 60,
    },
    logoutButton: {
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    logoutText: {
        color: '#FF4444',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default Settings;
