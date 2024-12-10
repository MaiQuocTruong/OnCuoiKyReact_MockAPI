import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native';

const MedicineScreen = ({ route }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { username } = route.params;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('https://671ddfd71dfc4299198087e5.mockapi.io/medicines');
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.priceStarContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.star}>⭐ {item.star}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read More ➔</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}> 
      <ScrollView style={{ width: "100%", height: 500 }}>
      <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={[styles.searchBox, searchFocused && styles.inputContainerFocused]}>
              <Image source={require('../assets/anh01.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search here..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.logoBackground}>
              <Image source={require('../assets/anh02.png')} style={styles.logoicon} />
            </View>
          </View>
        </View>
        
        {/* Banner Component */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/anh03.png')} style={styles.banner} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Free Consultation</Text>
            <Text style={styles.bannerText}>Feel free to consult with one of our experienced {'\n'} doctors for personalized advice.</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <Text style={styles.subtitle}>We have some additional suggestions for you.</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All ➔</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={medicines}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        )}

          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh09.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh10.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh11.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>My Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh12.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Hospital</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh13.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/anh14.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>  
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  inputContainerFocused: {
    borderColor: '#1a73e8',
    borderWidth: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  logoBackground: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  logoicon: {
    width: 15,
    height: 15,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  bannerText: {
    color: '#fff',
    fontSize: 12,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  greeting: {
    color: '#1a73e8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  seeAll: {
    color: '#1a73e8',
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  priceStarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#1a73e8',
  },
  star: {
    fontSize: 14,
    color: '#777',
  },
  description: {
    fontSize: 12,
    color: '#777',
  },
  readMore: {
    color: '#1a73e8',
    fontSize: 14,
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navicon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 12,
    color: '#555',
  },
});
export default MedicineScreen;