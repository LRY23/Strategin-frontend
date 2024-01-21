import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/users'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { View,Text,TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, Image, SafeAreaView} from 'react-native';

function RegisterScreen({navigation}) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [checkPassword, setcheckPassword] = useState(false);

  const passwordVisible = () => {
    setcheckPassword(!checkPassword);
  };
  
   const handleRegister = () => {
    fetch('http://strategin-backend.vercel.app/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, username: username}),
    })

      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({
            token: data.token,
            email: data.email,
            username: data.username,
          }));

          setEmail('');
          setPassword('');
          navigation.navigate('TabNavigator')
        } else {
          setErrorMessage(data.error);
        }
      })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                
                <View style={styles.title}>
                    <Image source={require('../assets/strategin.jpg')} style={styles.homeImg}/>
                </View>

                <View style={styles.input}>

                    <TextInput
                        style={styles.textInput}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Nom d'utilisateur"
                    />
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        placeholder="Adresse mail"
                        onChangeText={(text) => setEmail(text)}
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
                        style={styles.registerBtn} 
                        onPress={() => handleRegister()}>
                        <Text style={styles.textBtn}>Inscription</Text>
                    </TouchableOpacity>
                    {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
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
    alignItems: 'center'
  },
  safeAreaView: {
    flex: 1,
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 45,
    marginTop:80,
  },
  input: {
    marginTop:100,
    alignItems:'center',
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
    marginTop:20,
    justifyContent:'center',
    borderWidth: 0,
    borderBottomWidth: 2, 
    borderBottomColor: '#0554ca'
  }, 
  homeBtn : {
    width: 300,
    height: 45,
    borderRadius: 12,
    marginTop: 34,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#0554ca',
  },
  registerBtn: {
    width: 300,
    height: 45,
    borderRadius: 12,
    marginTop: 54,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  eyeIcone: {
    position: 'absolute',
    right: 10,
  },
  errorMessage:{
    color:'red'
  }
})

export default RegisterScreen;

