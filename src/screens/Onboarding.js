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
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentIndex]);

    const slides = [
        {
            id: 1,
            title: 'Welcome to\nAlpexa Suisse',
            description: 'Get access to the tools you need to invest, spend and put your money in motion.',
            image: require('../assets/images/Walthrough1.png'),
            gradientColor: 'rgba(0, 208, 156, 0.15)',
        },
        {
            id: 2,
            title: 'Start with just\n$1',
            description: 'Sign up and receive an airdrop of 100 ALPX shares',
            image: require('../assets/images/Walkthrough2.png'),
            gradientColor: 'rgba(0, 208, 156, 0.12)',
        },
        {
            id: 3,
            title: "We've got you\ncovered",
            description: 'Swiss bank-standard security powered by HSM, MPC keys, MFA, and AI threat monitoring.',
            image: require('../assets/images/Walthrough3.png'),
            gradientColor: 'rgba(0, 208, 156, 0.1)',
        },
    ];

    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <View style={styles.swiperContainer}>
                <Swiper
                    ref={swiperRef}
                    loop={false}
                    onIndexChanged={handleIndexChanged}
                    showsPagination={false}
                >
                    {slides.map((slide) => (
                        <Animated.View 
                            key={slide.id} 
                            style={[
                                styles.slide,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }],
                                }
                            ]}
                        >
                            <View style={styles.imageContainer}>
                                {/* Glow backdrop behind image */}
                                <View style={[styles.imageGlowBackdrop, { backgroundColor: slide.gradientColor }]} />
                                <Image
                                    source={slide.image}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{slide.title}</Text>
                                <Text style={styles.description}>{slide.description}</Text>
                            </View>
                        </Animated.View>
                    ))}
                </Swiper>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressBar,
                            currentIndex === index && styles.progressBarActive,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('EmailSignup')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signupText}>Sign up</Text>
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
    backgroundGlowContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    swiperContainer: {
        flex: 4,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 60,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    imageGlowBackdrop: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        opacity: 0.5,
    },
    image: {
        width: width * 0.65,
        height: width * 0.65,
        zIndex: 1,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 40,
        height: 180,
        zIndex: 1,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 38,
        letterSpacing: -0.5,
    },
    description: {
        color: '#888888',
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    progressBar: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#333333',
    },
    progressBarActive: {
        backgroundColor: '#00D09C',
        width: 32,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingBottom: 50,
        justifyContent: 'space-between',
        gap: 15,
    },
    loginButton: {
        flex: 1,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#0D1117',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1C2326',
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'DMSans-SemiBold',
        fontWeight: '600',
    },
    signupButton: {
        flex: 1,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#00D09C',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00D09C',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    signupText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        fontWeight: '700',
    },
});

export default Onboarding;
