import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Thêm import Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ScreenUser() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // State users
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const [birthday, setBirthday] = useState(new Date());

  // Hàm lấy dữ liệu người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://6758529b60576a194d0ffec5.mockapi.io/users/users'); // Địa chỉ API của danh sach user
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  // Hàm lọc danh sách người dùng dựa trên username
  const filterUsers = () => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Hàm thêm người dùng mới
  const addUser = async () => {
    if (!username || !password || !email || !role || !avatar || !birthday) {
      alert("Please fill all fields.");
      return;
    }
  
    const newUser = {
      username,
      password,
      email,
      avatar,
      role,
      birthday: birthday.toISOString().split('T')[0],
    };
  
    try {
      await axios.post('https://6758529b60576a194d0ffec5.mockapi.io/users/users', newUser);
      alert("User added successfully!");
      // reset dữ liệu
      setUsername('');
      setPassword('');
      setEmail('');
      setAvatar('');
      setRole('');
      setBirthday(new Date());
      // Cập nhật danh sách người dùng
      fetchUsers();
    } catch (error) {
      console.error("Lỗi add user:", error);
      alert("Không thể add user.");
    }
  };

  // Hàm xóa người dùng
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://6758529b60576a194d0ffec5.mockapi.io/users/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId)); // Cập nhật lại danh sách sau khi xóa
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const renderUserRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('ScreenDetailUser', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={[styles.role, item.role === 'Admin' && styles.adminRole]}>
          {item.role}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteIconContainer} 
        onPress={() => handleDeleteUser(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );  

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: 500 }}>
        {/* Form inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Avatar</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your url avatar"
            value={avatar}
            onChangeText={setAvatar}
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

        <TouchableOpacity style={styles.addButton} onPress={addUser}>
          <Text style={styles.addText}>Add user</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Search</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm theo username"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filterUsers()}  
          renderItem={renderUserRow}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  roleContainer: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  deleteIconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  role: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  adminRole: {
    backgroundColor: '#dff0d8',
    borderColor: '#3c763d',
    color: '#3c763d',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginVertical: 10,
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
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    height: 40, // Tăng chiều cao của picker
    borderWidth: 1, // Đặt đường viền cho picker
    borderColor: '#ccc', // Đặt màu viền cho picker
    borderRadius: 5, // Bo góc cho picker
    paddingHorizontal: 10, // Thêm padding ngang
  },
});
