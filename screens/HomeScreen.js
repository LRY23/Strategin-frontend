import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView} from 'react-native'
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const [checkPassword, setcheckPassword] = useState(false);
  
    const passwordVisible = () => {
      setcheckPassword(!checkPassword);
    };

    const handleConnection = () => {

        fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        })
        
    
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.result) {
              dispatch(login({ token: data.token, email: data.email, username: data.username }));
    
              setEmail('');
              setPassword('');
              navigation.navigate('TabNavigator')
            } else {
              setErrorMessage(data.error);
            }
          });
      };

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Image source={require('../assets/strategin.jpg')} style={styles.homeImg}/>
                    
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Adresse mail"
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.textInputMdp}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Mot de passe"
                            secureTextEntry={!checkPassword}
                        />
                        <TouchableOpacity onPress={() => passwordVisible()} style={styles.eyeIcone}>
                            <FontAwesome name={checkPassword ? 'eye' : 'eye-slash'} size={25} color="gray" />
                        </TouchableOpacity>
                    </View>
                        

                    <TouchableOpacity 
                        style={styles.homeBtn} 
                        onPress={() => handleConnection()}>
                        <Text style={styles.textBtn}>Connexion</Text>
                    </TouchableOpacity>
                    {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

                    <Text style={styles.registerText}>_________   Pas encore de compte ?   _________</Text>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')} 
                        style={styles.registerBtn} >
                        <Text style={styles.textBtn}>Inscription</Text>
                    </TouchableOpacity>  

                </View>
            </TouchableWithoutFeedback>
       </KeyboardAvoidingView>
       </SafeAreaView>
     );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeImg : {
    width: 350, 
    height: 150
  },
  textInput: {
    display: 'flex',
    borderWidth: 0,
    fontSize: 23,
    height: 40,
    width: 340,
    marginTop: 54,
    justifyContent:'center',
    borderWidth: 0,
    borderBottomWidth: 2, 
    borderBottomColor: '#0554ca'
  }, 
  textInputMdp: {
    borderWidth: 0,
    fontSize: 23,
    height: 40,
    width: 340,
    marginTop: 24,
    justifyContent:'center',
    borderWidth: 0,
    borderBottomWidth: 2, 
    borderBottomColor: '#0554ca',
  }, 
  homeBtn : {
    width: 350,
    height: 45,
    borderRadius: 12,
    marginTop: 64,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#0554ca',
  },
  textBtn : {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  register : {
     marginTop: 50
  },   
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcone: {
    position: 'absolute',
    right: 10,
    },
  registerText: {
    marginTop:45
  },
  registerBtn: {
    width: 350,
    height: 45,
    borderRadius: 12,
    marginTop: 54,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#0554ca',
  }, 
  errorMessage:{
    color:'red'
  }
 });