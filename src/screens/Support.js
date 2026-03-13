import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { ArrowLeft, Send, HelpCircle, Mail, Phone, ChevronDown } from 'lucide-react-native';

const Support = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Chat');
    const [message, setMessage] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const scrollRef = useRef();

    const [chatMessages, setChatMessages] = useState([
        { id: '1', text: 'Hello! How can I help you today?', time: '10:00 AM', isUser: false },
        { id: '2', text: 'I need help with a transaction', time: '10:03 AM', isUser: true },
        { id: '3', text: 'I\'d be happy to help! Can you provide the ID?', time: '10:05 AM', isUser: false },
    ]);

    const faqs = [
        {
            id: '1',
            question: 'How do I verify my Account?',
            answer: 'To verify your account, go to Profile > Verify Account and upload a valid government-issued ID. Verification usually takes 24-48 hours.'
        },
        {
            id: '2',
            question: 'What are the transaction fees?',
            answer: 'Transaction fees vary by network. Standard wallet transfers are 0.5%, while external bank transfers may include additional provider fees.'
        },
        {
            id: '3',
            question: 'Is my crypto insured?',
            answer: 'Yes, Alpexa provides institutional-grade insurance coverage for all assets stored in our cold storage vaults.'
        },
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isUser: true
            };
            setChatMessages([...chatMessages, newMessage]);
            setMessage('');
            setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        }
    };

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const renderTabs = () => (
        <View style={styles.tabContainer}>
            {['Chat', 'FAQ', 'Contact'].map((tab) => (
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

    const renderChat = () => (
        <View style={styles.chatWrapper}>
            <View style={styles.statusBanner}>
                <View style={styles.statusDot} />
                <View>
                    <Text style={styles.statusTitle}>Support team is online</Text>
                    <Text style={styles.statusSubtitle}>Average response time : 2 minutes</Text>
                </View>
            </View>

            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.chatScroll}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
                {chatMessages.map((msg) => (
                    <View key={msg.id} style={[styles.messageBubble, msg.isUser ? styles.userBubble : styles.supportBubble]}>
                        <Text style={[styles.messageText, msg.isUser ? styles.userMessageText : styles.supportMessageText]}>{msg.text}</Text>
                        <Text style={styles.messageTime}>{msg.time}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.chatInput}
                    placeholder="Type your message..."
                    placeholderTextColor="#666666"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Send color="#000000" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderFAQ = () => (
        <ScrollView style={styles.faqContent} showsVerticalScrollIndicator={false}>
            <View style={styles.faqHeader}>
                <View style={styles.faqIconWrapper}>
                    <HelpCircle color="#FFFFFF" size={24} opacity={0.6} />
                </View>
                <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                <Text style={styles.faqSubtitle}>Find answers to common questions below</Text>
            </View>

            <View style={styles.accordionContainer}>
                {faqs.map((faq) => (
                    <View key={faq.id} style={styles.accordionWrapper}>
                        <TouchableOpacity
                            style={styles.accordionItem}
                            onPress={() => toggleFaq(faq.id)}
                        >
                            <Text style={styles.accordionText}>{faq.question}</Text>
                            <ChevronDown
                                color="#FFFFFF"
                                size={18}
                                opacity={0.5}
                                style={{ transform: [{ rotate: expandedFaq === faq.id ? '180deg' : '0deg' }] }}
                            />
                        </TouchableOpacity>
                        {expandedFaq === faq.id && (
                            <View style={styles.answerContainer}>
                                <Text style={styles.answerText}>{faq.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderContact = () => (
        <ScrollView style={styles.contactContent} showsVerticalScrollIndicator={false}>
            {/* Email Support */}
            <View style={styles.contactSection}>
                <View style={styles.contactSectionHeader}>
                    <Mail color="#00D33B" size={20} />
                    <Text style={styles.contactSectionTitle}>Email Support</Text>
                </View>
                <Text style={styles.contactDetail}>support@cryptowallet.app</Text>
                <TouchableOpacity style={styles.greenButton}>
                    <Text style={styles.greenButtonText}>Send Email</Text>
                </TouchableOpacity>
            </View>

            {/* Phone Support */}
            <View style={styles.contactSection}>
                <View style={styles.contactSectionHeader}>
                    <Phone color="#00D33B" size={20} />
                    <Text style={styles.contactSectionTitle}>Phone Support</Text>
                </View>
                <Text style={styles.contactDetail}>+1 (800) 123-4567</Text>
                <Text style={styles.contactSubDetail}>Mon - Fri, 9AM-6PM EST</Text>
                <TouchableOpacity style={styles.greenButton}>
                    <Text style={styles.greenButtonText}>Call Now</Text>
                </TouchableOpacity>
            </View>

            {/* Office Hours */}
            <View style={styles.hoursCard}>
                <Text style={styles.hoursTitle}>Office Hours</Text>
                <Text style={styles.hoursText}>Our Team is available 24/7 via chat. Phone and email service available Monday- Friday 9AM-6PM EST.</Text>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Customer Support</Text>
                <View style={{ width: 44 }} />
            </View>

            {renderTabs()}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {activeTab === 'Chat' && renderChat()}
                {activeTab === 'FAQ' && renderFAQ()}
                {activeTab === 'Contact' && renderContact()}
            </KeyboardAvoidingView>
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
    chatWrapper: {
        flex: 1,
    },
    statusBanner: {
        backgroundColor: '#111111',
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00D33B',
    },
    statusTitle: {
        color: '#00D33B',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    statusSubtitle: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
    },
    chatScroll: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    supportBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#333333',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333',
    },
    messageText: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
        marginBottom: 4,
    },
    supportMessageText: {
        color: '#FFFFFF',
    },
    userMessageText: {
        color: '#FFFFFF',
    },
    messageTime: {
        fontSize: 10,
        color: '#666666',
        fontFamily: 'DMSans-Regular',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#000000',
        alignItems: 'center',
        gap: 12,
    },
    chatInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#111111',
        borderRadius: 12,
        paddingHorizontal: 16,
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faqContent: {
        paddingHorizontal: 20,
    },
    faqHeader: {
        marginBottom: 30,
    },
    faqIconWrapper: {
        marginBottom: 16,
    },
    faqTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginBottom: 8,
    },
    faqSubtitle: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
    },
    accordionContainer: {
        gap: 12,
    },
    accordionWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    accordionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
    },
    accordionText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
    },
    answerContainer: {
        paddingBottom: 18,
        paddingHorizontal: 4,
    },
    answerText: {
        color: '#A0A0A0',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 20,
    },
    contactContent: {
        paddingHorizontal: 20,
    },
    contactSection: {
        marginBottom: 40,
    },
    contactSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    contactSectionTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    contactDetail: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        marginBottom: 4,
    },
    contactSubDetail: {
        color: '#666666',
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        marginBottom: 16,
    },
    greenButton: {
        backgroundColor: '#00D33B',
        height: 40,
        width: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    greenButtonText: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'DMSans-Bold',
    },
    hoursCard: {
        backgroundColor: '#111111',
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#222222',
    },
    hoursTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'DMSans-Bold',
        marginBottom: 12,
    },
    hoursText: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        lineHeight: 22,
    },
});

export default Support;
