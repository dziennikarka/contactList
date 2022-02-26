import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import {useState} from 'react';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      let { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      data = data.filter(item => (item.hasOwnProperty('phoneNumbers')));
      setContacts(data);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18}}>{item.firstName} {item.lastName} {item.phoneNumbers[0].number}</Text>  
          </View>}
      />
      <Button onPress={getContacts} title="GET CONTACTS"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
