import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome6';

// DB
import db from '../database';

const ViewContact = (props: any) => {
  const [viewContact, setViewContact] = useState('');

  const route = useRoute();
  const contactId = route.params.item.id;
  const viewItem = route.params.item;
  // console.log(viewItem);

  useEffect(() => {
    db.transaction(async tx => {
      await tx.executeSql(
        'SELECT * FROM contacts WHERE id = ?',
        [contactId],
        (_, results) => {
          if (results.rows.length > 0) {
            const contact = results.rows.item(0);
            console.log(contact);
            setViewContact(contact);
          }
        },
        (_, error) => {
          console.error('Error fetching last submitted data:', error);
        },
      );
    });
  }, []);

  function deleteContact() {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id = ?;',
        [contactId],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            console.log('User information deleted successfully!');
            props.navigation.goBack();
          } else {
            console.error('No user found with the given ID.');
          }
        },
        error => console.error('Error deleting user information:', error),
      );
    });
  }

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
          {/* <Text style={styles.headerText}>Create Contact</Text> */}
        </View>

        <View style={styles.createContext}>
          <Image
            source={require('../images/pro-pic.png')}
            style={styles.profilePhoto}
          />
          <Text style={styles.contactName}>{viewContact.name}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoHeading}>Contact info</Text>
          <Text style={styles.contactNumber}>{viewContact.phoneNumber}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditContact', {viewItem})
            }>
            <View style={styles.editButton}>
              <Text style={styles.buttonTextedit}>Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteContact}>
            <View style={styles.deleteButton}>
              <Text style={styles.buttonTextdelete}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewContact;

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    backgroundColor: '#1B2421',
    height: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  createContext: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contactInfo: {
    marginTop: 70,
  },
  contactInfoHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  contactNumber: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'center',
    marginTop: 90,
  },
  editButton: {
    backgroundColor: '#B25AE8',
    width: 100,
    padding: 10,
    borderRadius: 7,
  },
  buttonTextedit: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F4253E',
    width: 100,
    padding: 10,
    borderRadius: 7,
  },
  buttonTextdelete: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
