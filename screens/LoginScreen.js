import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const toggleShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      // Fetch users from the mock API
      const response = await axios.get('https://6758529b60576a194d0ffec5.mockapi.io/users/users');
      const users = response.data;

      // Find user by email and password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        if (user.role === 'Admin') {
          navigation.navigate('ScreenUser');
        } else if (user.role === 'User') {
          navigation.navigate('MedicineScreen', { username: user.username });
        }
      } else {
        alert('Invalid credentials', 'Please check your email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error', 'An error occurred while logging in');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon}/>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/Data/icon.png')} style={styles.logo}/>
      </View>

      <Text style={styles.title}>Hello Again!</Text>
      <Text style={styles.subtitle}>Log into your account</Text>

      <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          onChangeText={setEmail} // Cập nhật email
        />
      </View>

      <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword} // Cập nhật password
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="gray" style={styles.eyeIcon}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}/>
        <Text style={styles.orText}>or</Text>
        <View style={styles.line}/>
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/Data/google.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/Data/face.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/Data/apple.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainerFocused: {
    borderColor: '#6C63FF',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    outlineWidth: 0,
  },
  eyeIcon: {
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#0ad4fa',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#0ad4fa',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    padding: 3,
  },
  socialIcon: {
    width: 50,
    height: 44,
  },
});
