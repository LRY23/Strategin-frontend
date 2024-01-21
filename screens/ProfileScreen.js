import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Alert } from 'react-native';
import { logout } from '../reducers/users'

export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.value);
  
  const handleDelete = () => {
    fetch(`http://localhost:3000/users/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token, 
      },
    })
    .then(response  => response.json())
    .then(data => {
      console.log('Utilisateur supprimé :', data);
      
      if (data.result) {
        navigation.navigate('Home');
      }
    });
  }
  const logoutSessions = () => {
    dispatch(logout());
    navigation.navigate('Home');
  };

  const deleteConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette annonce ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => handleDelete(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const logoutConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          onPress: () => logoutSessions(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <View style={styles.logout}>
                  <Text style={styles.logoutTitle}>Quitter l'application</Text>
                    <TouchableOpacity 
                        style={styles.logoutBtn}
                        onPress={() => logoutConfirmation()}>
                        <Text style={styles.textBtn}>Se déconnecter</Text>
                    </TouchableOpacity>
              </View>

              <View style={styles.delete}>
                  <Text style={styles.title}>Supprimer mon profil</Text>
                  <Text style={styles.warning}>Attention, dès que vous aurez procédé à la suppression de votre profil, votre nom sera retiré de la liste des utilisateurs de Strateg-in </Text>
                <TouchableOpacity 
                    style={styles.deleteBtn} 
                    onPress={() => deleteConfirmation()}>
                    <Text style={styles.textBtn}>Supprimer</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  }
 
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems:'center',
    justifyContent:'center'
  },
  safeAreaView: {
    backgroundColor: '#ffffff',
    flex:1
  },
  logout: {
    width:370,
    alignItems:'center',
  },
  logoutTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  logoutBtn: {
    height: 45,
    width:250,
    borderRadius: 12,
    marginTop: 25,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#0554ca',
  },
  delete: {
    width:370,
    alignItems:'center',
    marginTop:150
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  warning : {
    fontSize:18,
    width: 330,
    marginTop:15,
  },
  deleteBtn: { 
    height: 45,
    width:250,
    borderRadius: 12,
    marginTop: 25,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#FA3245',
  }, 
  textBtn : {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
});