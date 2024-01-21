import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';

function UtilisateurScreen() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://strategin-backend.vercel.app/profiles/users')
      .then(response => response.json())
      .then(data => {
          if (data && data.usernames) {
            setUsers(data.usernames);
          }
      })
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des utilisateur inscrit en base données:</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {users.map(username => (
            <Text key={username} style={styles.usernameText}>{username}</Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor:'#fff'
  },
  title: {
    marginTop: 40,
    height:50
  },
  scrollView: {
    width:350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 40,  
  },
});

export default UtilisateurScreen;
