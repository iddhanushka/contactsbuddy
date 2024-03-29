import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome6';

// DB
import db from '../database';

const EditContact = (props: any) => {
  const route = useRoute();
  const updateItem = route.params.viewItem;
  // console.log(updateItem);

  const [editableName, setEditableName] = useState(updateItem.name);
  const [editablePhone, setEditablePhone] = useState(updateItem.phoneNumber);

  function updateContact() {
    db.transaction(async tx => {
      await tx.executeSql(
        'UPDATE contacts SET name = ?, phoneNumber = ? WHERE id = ?;',
        [editableName, editablePhone, updateItem.id],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            console.log('User information updated successfully!');
            props.navigation.navigate('Home');
          } else {
            console.error('No user found with the given ID.');
          }
        },
        error => console.error('Error updating user information:', error),
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
          <Text style={styles.headerText}>Edit Contact</Text>
        </View>

        <View style={styles.createContext}>
          <Image
            source={require('../images/pro-pic.png')}
            style={styles.profilePhoto}
          />
          <Text style={styles.contactName}>Update picture</Text>
        </View>
        <View style={styles.contactField}>
          <TextInput
            onChangeText={updatedName => setEditableName(updatedName)}
            value={editableName}
            placeholder="Name"
            placeholderTextColor="#fff"
            style={styles.name}></TextInput>
          <TextInput
            onChangeText={updatePhone => setEditablePhone(updatePhone)}
            value={editablePhone}
            keyboardType="number-pad"
            placeholder="Phone"
            placeholderTextColor="#fff"
            style={styles.phone}></TextInput>
        </View>

        <TouchableOpacity onPress={updateContact}>
          <View style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditContact;

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
    marginTop: 50,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contactField: {
    marginTop: 70,
  },
  name: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    color: '#fff',
  },
  phone: {
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#B25AE8',
    padding: 10,
    borderRadius: 7,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
