import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// FontAwesome
import Icon from 'react-native-vector-icons/FontAwesome6';

// DB
import db from '../database';

export default function Search(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    db.transaction(async tx => {
      await tx.executeSql(
        'SELECT * FROM contacts WHERE name LIKE ?',
        [`%${searchTerm}%`],
        (_, results) => {
          const len = results.rows.length;
          const result = [];
          for (let i = 0; i < len; i++) {
            result.push(results.rows.item(i));
          }
          setFilteredContacts(result);
        },
        (_, error) => {
          console.error('Error fetching contacts:', error);
        },
      );
    });
  }, [filteredContacts]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Icon
              name="circle-arrow-left"
              size={24}
              color={'#fff'}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search contacts</Text>
        </View>

        <View>
          <TextInput
            onChangeText={name => setSearchTerm(name)}
            value={searchTerm}
            placeholder="Search"
            placeholderTextColor="#000"
            style={styles.searchInput}
          />
        </View>
        <ScrollView>
          <View style={styles.contactList}>
            {filteredContacts.length > 0 ? (
              filteredContacts.map(item => (
                <TouchableOpacity>
                  <View style={styles.contactItem}>
                    <Image
                      source={require('../images/pro-pic.png')}
                      style={styles.profilePhoto}
                    />
                    <View>
                      <Text style={[styles.contactName, styles.contactInfo]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.contactNumber, styles.contactInfo]}>
                        {item.phoneNumber}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noContacts}>No contacts available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    backgroundColor: '#1B2421',
    height: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
    height: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 30,
    fontSize: 16,
  },
  profilePhoto: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactInfo: {
    color: '#fff',
    lineHeight: 25,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contactNumber: {
    fontSize: 14,
  },
  contactList: {
    marginTop: 30,
    position: 'relative',
  },
  addContactButton: {
    backgroundColor: '#665D5D',
    padding: 10,
    width: 50,
    height: 50,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  noContacts: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 18,
  },
  backButton: {
    marginRight: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
