import React from 'react';
import { useSelector } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Alert } from 'react-native';

export default function ProfileScreen({ navigation }) {

  const user = useSelector((state) => state.users.value);
  
  const handleDelete = () => {
    fetch(`https://strategin-backend.vercel.app/users/delete`, {
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
  
  const afficherConfirmation = () => {
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
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <Text style={styles.title}>Supprimer mon profil</Text>
              <Text style={styles.warning}>Attention, dès que vous aurez procédé à la suppression de votre profil, votre nom sera retiré de la liste des utilisateurs de Strateg-in </Text>
        
              <View style={styles.inputContainer}>
                <TouchableOpacity 
                        style={styles.registerBtn} 
                        onPress={() => afficherConfirmation()}>
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
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginTop:205
  },
  warning : {
    fontSize:18,
    width: 330,
    marginTop:55
  },
  inputContainer: {
    width: '80%',
    padding: 20,
    height:600,
    borderRadius: 10,
    marginTop:25
  },
  textInput: {
    borderRadius:12,
    borderWidth:1,
    padding:20,
    marginTop:25
  }, 
  registerBtn: { 
    height: 45,
    width:250,
    borderRadius: 12,
    marginTop: 4,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcone: {
    position: 'absolute',
    right: 15,
    top:25
  },
  textInput: {
    borderWidth: 0,
    fontSize: 23,
    height: 40,
    width: 240,
    marginTop: 24,
    justifyContent:'center',
    borderWidth: 0,
    borderBottomWidth: 2, 
    borderBottomColor: '#0554ca',
  }, 
});