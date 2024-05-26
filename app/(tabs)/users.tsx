import {StyleSheet, Image, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import currentEnvironment from '@/constants/environment';
import { useEffect, useState, useCallback } from 'react';
import Checkbox from 'expo-checkbox';
import { Avatar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from 'expo-linear-gradient';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
};

export default function TabTwoScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = useCallback(async (page: number, gender: Gender) => {
    setLoading(true);

    const genderQuery = gender ? `&gender=${gender}` : '';
    const result = await fetch(
      `${currentEnvironment.api.baseUrl}?results=5${genderQuery}&page=${String(page)}`,
    );

    const data = await result.json();
    const usersResults = data.results as User[];

    setUsers(oldUsers =>
      page === 1 ? usersResults : [...oldUsers, ...usersResults],
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    getUsers(pageToGet, gender);
  }, [pageToGet, gender, getUsers]);

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/logo.webp')}
          style={styles.logo}
          resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Users</ThemedText>
      </ThemedView>

      <View style={styles.checkboxContainer}>

        <Checkbox
          value={gender === 'female'}
          onValueChange={() => {
            setGender('female');
            setPageToGet(1);
          }}
          color={gender === 'female' ? '#4630EB' : undefined}
        />
        <ThemedText>Female</ThemedText>

        <Checkbox
          value={gender === 'male'}
          onValueChange={() => {
            setGender('male');
            setPageToGet(1);
          }}
          color={gender === 'male' ? '#f44336' : undefined}
        />
        <ThemedText>Male</ThemedText>

        <Checkbox
          value={gender === ''}
          onValueChange={() => {
            setGender('');
            setPageToGet(1);
          }}
          color={gender === '' ? '#6a329f' : undefined}
        />
        <ThemedText>All</ThemedText>

      </View>

      {users.length > 0 &&
        users.map((user: User) => (
          <ListItem
            key={user.login.uuid}
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ['#00a7a7', '#141414'],
              start: { x: 0, y: 0 },
              end: { x: 1.1, y: 0 },
            }}
            ViewComponent={LinearGradient}
            bottomDivider
          >
            <Avatar rounded source={{ uri: user.picture.thumbnail }} />
            <ListItem.Content>
              <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                {user.name.first} {user.name.last}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: 'white' }}>
                {user.gender}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
          </ListItem>

          //<Text key={user.login.uuid} style={styles.userText}>
          // {user.name.first} {user.name.last} {user.gender}
          //</Text>
        ))}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#00a7a7"
          style={styles.loadingIndicator}
        />
      )}
      <TouchableOpacity
        style={styles.loadMore}
        onPress={() => {
          setPageToGet(v => v + 1);
        }}
      >
        <Text style={styles.loadMoreText}>Load More</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: '70%',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    margin: 10,
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    gap: 10,
    justifyContent: 'center',
  },
  userText: {
    color: 'white',
    margin: 10,
  },
  loadMore: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 6,
    margin: 10,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

// 1. The logo spills out of its designated area.
// 2. TEC theme is not displayed on the header bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change checkbox.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
// 10.Use the phone camera to take a picture and show it to the home screen.
