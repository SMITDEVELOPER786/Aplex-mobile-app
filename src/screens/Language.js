import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';
import { ArrowLeft, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Language = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [searchQuery, setSearchQuery] = useState('');

    const languages = [
        'English',
        'Spanish',
        'French',
        'Japanese',
        'German',
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Language</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search color="#666666" size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Language"
                        placeholderTextColor="#666666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <Text style={styles.sectionLabel}>Current Language</Text>

                <View style={styles.languageList}>
                    {languages
                        .filter(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((lang) => (
                            <TouchableOpacity
                                key={lang}
                                style={[
                                    styles.languageItem,
                                    selectedLanguage === lang && styles.languageItemSelected
                                ]}
                                onPress={() => setSelectedLanguage(lang)}
                            >
                                <Text style={styles.languageText}>{lang}</Text>
                                <View style={[
                                    styles.radioCircle,
                                    selectedLanguage === lang && styles.radioCircleSelected
                                ]} />
                            </TouchableOpacity>
                        ))}
                    {languages.filter(lang => lang.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <Text style={styles.noResultsText}>No languages found</Text>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LinearGradient
                        colors={['#4facfe', '#00f2fe']}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </LinearGradient>
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
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 12,
        height: 50,
        borderRadius: 12,
        marginBottom: 30,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
    },
    sectionLabel: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginBottom: 16,
    },
    languageList: {
        gap: 12,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#000000',
    },
    languageItemSelected: {
        borderColor: '#4facfe',
    },
    languageText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333333',
    },
    radioCircleSelected: {
        borderColor: '#4facfe',
        backgroundColor: '#4facfe',
    },
    footer: {
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    saveButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
    },
    noResultsText: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Language;
