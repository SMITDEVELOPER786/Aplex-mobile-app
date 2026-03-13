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
import { ArrowLeft } from 'lucide-react-native';

const Profile = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        dob: 'January 15, 1990',
        email: 'johndoe@gmail.com',
        phone: '+1 (555) 123-4567',
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
                    <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* User Identity */}
                <View style={styles.avatarSection}>
                    <Text style={styles.userName}>{profile.firstName} {profile.lastName}</Text>
                    <Text style={styles.userEmail}>{profile.email}</Text>
                    <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedBadgeText}>Verified Account</Text>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>First Name</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.firstName}
                                onChangeText={(text) => setProfile({ ...profile, firstName: text })}
                                placeholderTextColor="#666666"
                            />
                        ) : (
                            <Text style={styles.fieldValue}>{profile.firstName}</Text>
                        )}
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Last Name</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.lastName}
                                onChangeText={(text) => setProfile({ ...profile, lastName: text })}
                                placeholderTextColor="#666666"
                            />
                        ) : (
                            <Text style={styles.fieldValue}>{profile.lastName}</Text>
                        )}
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Date of Birth</Text>
                        <Text style={styles.fieldValue}>{profile.dob}</Text>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Email Address</Text>
                        <View style={styles.row}>
                            <Text style={styles.fieldValue}>{profile.email}</Text>
                            <Text style={styles.verifiedText}>verified</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Phone Number</Text>
                        <View style={styles.row}>
                            <Text style={styles.fieldValue}>{profile.phone}</Text>
                            <Text style={styles.verifiedText}>verified</Text>
                        </View>
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
    editButton: {
        minWidth: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'DMSans-SemiBold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    userName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        marginBottom: 4,
    },
    userEmail: {
        color: '#666666',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        marginBottom: 12,
    },
    verifiedBadge: {
        backgroundColor: '#00D33B',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    verifiedBadgeText: {
        color: '#000000',
        fontSize: 10,
        fontFamily: 'DMSans-ExtraBold',
        textTransform: 'uppercase',
    },
    form: {
        gap: 24,
    },
    fieldContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
        paddingBottom: 12,
    },
    fieldLabel: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        marginBottom: 8,
    },
    fieldValue: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        padding: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: -4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    verifiedText: {
        color: '#00D33B',
        fontSize: 12,
        fontFamily: 'DMSans-SemiBold',
    },
});

export default Profile;
