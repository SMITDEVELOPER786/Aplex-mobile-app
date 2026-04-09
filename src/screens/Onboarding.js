import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StatusBar,
    Animated,
    ScrollView,
    Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { InterType, space } from '../theme/typography';

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    const slides = [
        {
            id: 'welcome',
            title: 'Welcome to Alpexa Suisse',
            description:
                'Get access to the tools you need to invest, spend and put your money in motion.',
            image: require('../assets/images/Walthrough1.png'),
        },
        {
            id: 'airdrop',
            title: 'Start with just\n$1',
            description: 'Sign up and receive an airdrop of 100 ALPX shares',
            image: require('../assets/images/Walkthrough2.png'),
        },
        {
            id: 'security',
            title: "We've got you\ncovered",
            description:
                'Swiss bank-standard security powered by HSM, MPC keys, MFA, and AI threat monitoring.',
            image: require('../assets/images/Walthrough3.png'),
        },
    ];

    const runEnterAnimation = () => {
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.95);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    };

    React.useEffect(() => {
        runEnterAnimation();
    }, []);

    const handleIndexChanged = (index) => {
        setSlideIndex(index);
        runEnterAnimation();
    };

    const renderSlide = (slide) => (
        <ScrollView
            style={styles.slideVerticalScroll}
            contentContainerStyle={styles.welcomeScrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={Platform.OS === 'android'}
            bounces
        >
            <Animated.View
                style={[
                    styles.slide,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.imageContainer}>
                    <Image source={slide.image} style={styles.image} resizeMode="contain" />
                </View>
                <View style={[styles.textContainer, { paddingHorizontal: space(1) }]}>
                    <Text style={[InterType.headline, styles.titleCenter]}>{slide.title}</Text>
                    <Text style={[InterType.body, styles.description]}>{slide.description}</Text>
                </View>
            </Animated.View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.swiperContainer}>
                <Swiper
                    index={slideIndex}
                    loop={false}
                    onIndexChanged={handleIndexChanged}
                    showsPagination={false}
                >
                    {slides.map((slide) => (
                        <View key={slide.id} style={styles.slideOuter}>
                            {renderSlide(slide)}
                        </View>
                    ))}
                </Swiper>
            </View>

            <View style={[styles.progressContainer, { marginBottom: space(2) }]}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressDot,
                            slideIndex === index && styles.progressDotActive,
                        ]}
                    />
                ))}
            </View>

            <View
                style={[
                    styles.buttonContainer,
                    { paddingHorizontal: space(3), paddingBottom: space(6) },
                ]}
            >
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.7}
                >
                    <Text style={[InterType.button, styles.loginText]}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('EmailSignup')}
                    activeOpacity={0.8}
                >
                    <Text style={[InterType.button, styles.signupText]}>Sign up</Text>
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
    swiperContainer: {
        flex: 4,
    },
    slideOuter: {
        flex: 1,
    },
    slideVerticalScroll: {
        flex: 1,
    },
    welcomeScrollContent: {
        flexGrow: 1,
        paddingBottom: space(4),
    },
    slide: {
        alignItems: 'center',
        paddingHorizontal: space(3),
        paddingTop: space(6),
    },
    imageContainer: {
        minHeight: width * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: space(2),
    },
    image: {
        width: width * 0.72,
        height: width * 0.72,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: space(3),
        paddingBottom: space(2),
        zIndex: 1,
    },
    titleCenter: {
        textAlign: 'center',
        lineHeight: 40,
    },
    description: {
        textAlign: 'center',
        marginTop: space(2),
        paddingHorizontal: space(1),
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: space(1),
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3A3A3C',
    },
    progressDotActive: {
        backgroundColor: '#FFFFFF',
        transform: [{ scale: 1.15 }],
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: space(2),
    },
    loginButton: {
        flex: 1,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    loginText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    signupButton: {
        flex: 1,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    signupText: {
        color: '#000000',
        fontWeight: '700',
    },
});

export default Onboarding;
