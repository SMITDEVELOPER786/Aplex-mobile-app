import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import { X, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

const NavigationDrawer = ({ visible, onClose, navigation }) => {
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const menuItems = [
        { id: 1, title: 'Transaction History', screen: 'TransactionHistory' },
        { id: 2, title: 'Personal Information', screen: 'Profile' },
        { id: 3, title: 'Staking', screen: 'Staking' },
        { id: 4, title: 'Send', screen: 'Send' },
        { id: 5, title: 'Receive', screen: 'Receive' },
        { id: 6, title: 'Swap', screen: 'SwapCoin' },
        { id: 7, title: 'Reward', screen: 'ReferralReward' },
        { id: 8, title: 'Customer Support', screen: 'Support' },
    ];

    const handleMenuPress = (screen) => {
        onClose();
        if (navigation && screen) {
            setTimeout(() => {
                navigation.navigate(screen);
            }, 300);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
                </TouchableWithoutFeedback>

                <Animated.View style={[
                    styles.drawer,
                    { transform: [{ translateX: slideAnim }] }
                ]}>
                    <SafeAreaView style={styles.drawerContent}>
                        <View style={styles.drawerHeader}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X color="#FFFFFF" size={24} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuContainer}>
                            {menuItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.menuItem}
                                    onPress={() => handleMenuPress(item.screen)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.menuItemText}>{item.title}</Text>
                                    <ChevronRight color="#666666" size={20} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.logoutContainer}>
                            <TouchableOpacity
                                style={styles.logoutButton}
                                onPress={() => {
                                    onClose();
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }],
                                    });
                                }}
                            >
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    drawer: {
        width: DRAWER_WIDTH,
        height: '100%',
        backgroundColor: '#000000',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 10 : 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    closeButton: {
        padding: 5,
    },
    menuContainer: {
        flex: 1,
        paddingTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    menuItemText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        fontWeight: '500',
    },
    logoutContainer: {
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#FF3B30',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
});

export default NavigationDrawer;
