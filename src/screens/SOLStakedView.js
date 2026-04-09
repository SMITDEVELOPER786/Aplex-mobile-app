import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions,
} from 'react-native';
import { ChevronLeft, Info, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SOLStakedView = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#FFFFFF" size={28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.viewEthText}>View SOL</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Title & Amount */}
                <View style={styles.titleContainer}>
                    <Text style={styles.pageTitle}>Staked SOL</Text>
                    <Text style={styles.fiatAmount}>$2,500.00</Text>
                    <Text style={styles.tokenAmount}>18.93 SOL</Text>
                </View>

                {/* Progress Bar Mockup */}
                <View style={styles.chartSection}>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarFill} />
                    </View>
                    <View style={styles.progressLabels}>
                        <View style={styles.labelItem}>
                            <View style={[styles.dot, { backgroundColor: '#1F51FF' }]} />
                            <Text style={styles.labelText}>Staked</Text>
                            <View style={{ flex: 1 }} />
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.labelValue}>18.93 SOL</Text>
                                <Text style={styles.labelFiat}>$2,500.00</Text>
                            </View>
                        </View>
                        <View style={styles.labelItem}>
                            <View style={[styles.dot, { backgroundColor: '#333333' }]} />
                            <Text style={styles.labelText}>Available to stake</Text>
                            <View style={{ flex: 1 }} />
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.labelValue}>0.5 SOL</Text>
                                <Text style={styles.labelFiat}>$71.25</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info List */}
                <View style={styles.infoList}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Estimated APY</Text>
                            <Info color="#8E8E93" size={14} style={{ marginLeft: 5 }} />
                        </View>
                        <Text style={styles.infoValue}>5%</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Lifetime earnings</Text>
                        <Text style={styles.infoValue}>$127.40</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Pending earnings</Text>
                        <Text style={[styles.infoValue, { color: '#1F51FF' }]}>+$2.40</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Next payout date</Text>
                        <Text style={styles.infoValue}>7 Jun</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Text style={styles.infoLabel}>Estimated time to unstake</Text>
                            <Info color="#8E8E93" size={14} style={{ marginLeft: 5 }} />
                        </View>
                        <Text style={styles.infoValue}>3 days</Text>
                    </View>
                </View>

                {/* History Section */}
                <View style={styles.historySection}>
                    <Text style={styles.sectionTitle}>History</Text>
                    <TouchableOpacity style={styles.historyItem}>
                        <View style={styles.historyLeft}>
                            <Text style={styles.historyTitle}>SOL staking earnings</Text>
                            <Text style={styles.historyDate}>31 May 2024</Text>
                        </View>
                        <View style={styles.historyRight}>
                            <Text style={styles.historyAmount}>$2.40</Text>
                            <Text style={styles.historyToken}>0.01685344 SOL</Text>
                        </View>
                        <ChevronRight color="#333333" size={20} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('StakeSOL')}
                >
                    <Text style={styles.actionButtonText}>Stake</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.unstakeButton]}
                    onPress={() => { }}
                >
                    <Text style={styles.actionButtonText}>Unstake</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    viewEthText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 120,
    },
    titleContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    pageTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    fiatAmount: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    tokenAmount: {
        color: '#8E8E93',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    chartSection: {
        marginBottom: 40,
    },
    progressBarContainer: {
        height: 24,
        backgroundColor: '#1C1C1E',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBarFill: {
        width: '80%',
        height: '100%',
        backgroundColor: '#1F51FF',
        borderRadius: 12,
    },
    progressLabels: {
        gap: 20,
    },
    labelItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 2,
        marginRight: 12,
    },
    labelText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    labelValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    labelFiat: {
        color: '#8E8E93',
        fontSize: 13,
        fontFamily: 'DMSans-Medium',
    },
    infoList: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#1C1C1E',
        paddingVertical: 10,
        marginBottom: 40,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        color: '#8E8E93',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
    },
    historySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'DMSans-Bold',
        marginBottom: 20,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    historyLeft: {
        flex: 1,
    },
    historyTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    historyDate: {
        color: '#8E8E93',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
    },
    historyRight: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    historyAmount: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    historyToken: {
        color: '#8E8E93',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
        backgroundColor: '#000000',
        gap: 15,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unstakeButton: {
        backgroundColor: '#FFFFFF', // Both buttons are white in reference
    },
    actionButtonText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
});

export default SOLStakedView;
