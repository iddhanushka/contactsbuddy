import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// FontAwesome
import Icon from 'react-native-vector-icons/AntDesign';

export default function ContactList(props: any) {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Contacts</Text>
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#000000/70%"
            style={styles.searchInput}
          />
        </View>
        <View style={styles.contactList}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewContact')}>
            <View style={styles.contactItem}>
              <Image
                source={require('../images/pro-pic.png')}
                style={styles.profilePhoto}
              />
              <View>
                <Text style={[styles.contactName, styles.contactInfo]}>
                  Amara Kamal
                </Text>
                <Text style={[styles.contactNumber, styles.contactInfo]}>
                  071 1234567
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewContact')}>
            <View style={styles.contactItem}>
              <Image
                source={require('../images/pro-pic.png')}
                style={styles.profilePhoto}
              />
              <View>
                <Text style={[styles.contactName, styles.contactInfo]}>
                  Amara Kamal
                </Text>
                <Text style={[styles.contactNumber, styles.contactInfo]}>
                  071 1234567
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewContact')}>
            <View style={styles.contactItem}>
              <Image
                source={require('../images/pro-pic.png')}
                style={styles.profilePhoto}
              />
              <View>
                <Text style={[styles.contactName, styles.contactInfo]}>
                  Amara Kamal
                </Text>
                <Text style={[styles.contactNumber, styles.contactInfo]}>
                  071 1234567
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewContact')}>
            <View style={styles.contactItem}>
              <Image
                source={require('../images/pro-pic.png')}
                style={styles.profilePhoto}
              />
              <View>
                <Text style={[styles.contactName, styles.contactInfo]}>
                  Amara Kamal
                </Text>
                <Text style={[styles.contactNumber, styles.contactInfo]}>
                  071 1234567
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateContact')}>
          <View style={styles.addContactButton}>
            <Icon name="plus" size={24} color={'#fff'} />
          </View>
        </TouchableOpacity>
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
    bottom: -10,
    right: 10,
  },
});
