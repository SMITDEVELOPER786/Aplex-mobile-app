import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import { ArrowLeft, Share2, Copy } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Deposit = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentBody}>
                    <Text style={styles.title}>Receive BITCOIN</Text>
                    <Text style={styles.subtitle}>
                        scan the QR code or copy the address to receive BITCOIN on solana.
                    </Text>

                    {/* QR Code Section with subtle glow */}
                    <View style={styles.qrSection}>
                        <LinearGradient
                            colors={['rgba(20, 241, 149, 0.1)', 'transparent']}
                            style={styles.qrGlow}
                        />
                        <View style={styles.qrContainer}>
                            <Image
                                source={require('../assets/images/QRCODE.png')}
                                style={styles.qrImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Address Section */}
                    <View style={styles.addressSection}>
                        <View style={styles.networkBadge}>
                            <View style={styles.networkDot} />
                            <Text style={styles.networkText}>Solana</Text>
                            <Text style={styles.addressTruncated}>BPcD1E..LHovgk</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.iconCircle}>
                                <Share2 color="#FFFFFF" size={20} />
                            </View>
                            <Text style={styles.actionButtonText}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.iconCircle}>
                                <Copy color="#FFFFFF" size={20} />
                            </View>
                            <Text style={styles.actionButtonText}>Copy</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentBody: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 15,
    },
    subtitle: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 50,
        paddingHorizontal: 10,
    },
    qrSection: {
        position: 'relative',
        width: width * 0.75,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    qrGlow: {
        position: 'absolute',
        width: '140%',
        height: '140%',
        borderRadius: width,
        zIndex: -1,
    },
    qrContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrImage: {
        width: '100%',
        height: '100%',
    },
    addressSection: {
        marginBottom: 50,
    },
    networkBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        gap: 8,
        borderWidth: 1,
        borderColor: '#222222',
    },
    networkDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#14F195',
    },
    networkText: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    addressTruncated: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 60,
        justifyContent: 'center',
    },
    actionButton: {
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
});

export default Deposit;
