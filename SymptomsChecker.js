import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

export default function SymptomsChecker({ navigation }) {
    const [symptom, setSymptom] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');

    const showAlert = (title, message) => {
        if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
            window.alert(`${title}: ${message}`);
        } else {
            Alert.alert(title, message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login');
        } catch (e) {
            navigation.replace('Login');
        }
    };

    const analyzeSymptoms = () => {
        if (!symptom.trim()) {
            showAlert('Empty Input', 'Please enter a symptom or disease to search.');
            return;
        }
        
        const result = `You searched for "${symptom}". Based on general data, this could be related to common waterborne pathogens. Please stay hydrated and consult a doctor if severe.`;
        setAnalysisResult(result);
        showAlert('Preliminary Analysis', result);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <View style={styles.topBar}>
                    <Text style={styles.appBadge}>AquaSafe</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={18} color="#005F99" style={{ marginRight: 4 }} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Symptom Checker</Text>
                        <Text style={styles.headerSubtitle}>Select symptoms to get a preliminary analysis</Text>
                    </View>

                    <View style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a symptom (e.g., 'fever', 'diarrhea')"
                            placeholderTextColor="#999999"
                            value={symptom}
                            onChangeText={(text) => {
                                setSymptom(text);
                                if (analysisResult) setAnalysisResult('');
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.analyzeButton} onPress={analyzeSymptoms}>
                        <Text style={styles.analyzeButtonText}>ANALYZE SYMPTOMS</Text>
                        <Ionicons name="trending-up-outline" size={20} color="#FFFFFF" style={styles.analyzeIcon} />
                    </TouchableOpacity>

                    {analysisResult ? (
                        <View style={styles.resultCard}>
                            <View style={styles.resultHeader}>
                                <Ionicons name="medical" size={20} color="#005F99" style={{ marginRight: 8 }} />
                                <Text style={styles.resultTitle}>Preliminary Analysis</Text>
                            </View>
                            <Text style={styles.resultBody}>{analysisResult}</Text>
                        </View>
                    ) : null}
                </ScrollView>
                
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.nextButton}
                        onPress={() => navigation.navigate('Report')}
                    >
                        <Text style={styles.nextButtonText}>Next: Report Incident</Text>
                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.nextIcon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7F8', // Light background matching photo
    },
    keyboardView: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 6,
    },
    appBadge: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005F99',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: '#E1F5FE',
    },
    logoutText: {
        color: '#005F99',
        fontSize: 13,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#005F99', // Dark blue
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#555555',
        textAlign: 'center',
    },
    inputCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        fontSize: 16,
        color: '#333333',
    },
    analyzeButton: {
        backgroundColor: '#006699', // Dark blue background
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        shadowColor: '#006699',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    analyzeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    analyzeIcon: {
        marginLeft: 10,
    },
    resultCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 16,
        marginTop: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#005F99',
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005F99',
    },
    resultBody: {
        fontSize: 14,
        color: '#333333',
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: Platform.OS === 'ios' ? 0 : 24,
        paddingTop: 10,
    },
    nextButton: {
        backgroundColor: '#4CAF50', // Green button
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextIcon: {
        marginLeft: 10,
    },
});
