import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function ScreenDetailUser({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const [avatar, setAvatar] = useState(user.avatar);

  // Hàm xử lý lưu dữ liệu người dùng (cập nhật thông tin)
  const handleSave = async () => {
    if (!username || !email || !password || !role || !avatar || !birthday) {
      alert("Please fill all fields.");
      return;
    }

    const updatedUser = {
      username,
      email,
      password,
      role,
      avatar,
      birthday: birthday.toISOString().split('T')[0], // Chuyển đổi ngày sinh sang định dạng yyyy-MM-dd
    };

    try {
      await axios.put(`https://6758529b60576a194d0ffec5.mockapi.io/users/users/${user.id}`, updatedUser);
      alert("User updated successfully!");
      navigation.goBack(); // Quay lại màn hình trước khi cập nhật
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Avatar</Text>
        <TextInput
          style={styles.input}
          value={avatar}
          onChangeText={setAvatar}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
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

      <View style={[styles.inputContainer, { zIndex: 10 }]}>
        <Text style={styles.label}>Birthday</Text>
        <DatePicker
          selected={birthday}
          onChange={setBirthday}
          dateFormat="yyyy/MM/dd"
          customInput={<TextInput style={styles.input} />}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
});
