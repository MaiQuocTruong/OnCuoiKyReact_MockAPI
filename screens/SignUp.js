import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [role, setRole] = useState('');

  const validateInputs = () => {
    if (!username || !password || !email || !avatar || !role || !birthday) {
      alert('Lỗi: Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (username.length < 3 || password.length < 3) {
      alert('Lỗi: Tên người dùng và mật khẩu phải có ít nhất 3 ký tự');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.get('https://6758529b60576a194d0ffec5.mockapi.io/users/users');
      const userExists = response.data.some(u => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) {
        alert('Lỗi: Tên người dùng đã tồn tại');
        return;
      }

      const newUser = {
        username,
        password,
        email,
        avatar,
        birthday: birthday.toISOString().split('T')[0],
        role,
      };

      await axios.post('https://6758529b60576a194d0ffec5.mockapi.io/users/users', newUser);
      alert('Đăng ký thành công');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
      alert('Lỗi: Không thể kết nối đến máy chủ');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Avatar</Text>
        <TextInput
          placeholder="URL Avatar"
          value={avatar}
          onChangeText={setAvatar}
          style={styles.input}
        />
      </View>

      <View style={[styles.inputContainer, { zIndex: 10 }]}>
        <Text style={styles.label}>Birthday</Text>
        <DatePicker
          selected={birthday}
          onChange={setBirthday}
          dateFormat="yyyy/MM/dd"
          customInput={<TextInput style={styles.input} />}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Select role" value="" />
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="User" value="User" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default SignUp;
