import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
export default function MercadosScreen() {
  return (<SafeAreaView style={styles.container}><Text style={styles.title}>Mercados</Text><Text style={styles.subtitle}>Proximamente: precios live</Text></SafeAreaView>);
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', paddingHorizontal: 32 },
});