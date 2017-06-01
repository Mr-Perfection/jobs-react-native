# jobs-react-native
Jobs search application using Indeed API, [React Navigation](https://reactnavigation.org/docs/intro/), and maps.

*Disclaimer: I followed through Stephen Grinder's [Advanced React Native](https://www.udemy.com/react-native-advanced/).
However, due to explosive growth and constant improvements of React Native, by the time I followed through his lecture, syntax and some navigation codes are outdated. I overcame these challenges by going to their official documentations in [navigations](https://reactnavigation.org/docs) and [react native](https://facebook.github.io/react-native). IF YOU ARE GOING TO FOLLOW HIS LECTURE, MAKE SURE TO CHECK `package.json` first to match the versions*

### Overview
All the screens that I will be working on.
![alt text](demo/screens.png)

How these screens are related to each other.
![alt text](demo/flow.png)

### Setting up
Installing `react-navigation`
```bash
npm install --save react-navigation
```

Installing `react-native-elements`
```bash
npm install --save react-native-elements
```

Installing `redux react-redux redux-thunk`
```bash
npm install --save redux react-redux redux-thunk
```

Installing `lodash`
```bash
npm install --save lodash
```

Installing [axios](https://github.com/mzabriskie/axios)
```bash
npm install --save axios
```

Installing [geocode converter to zipcode](https://www.npmjs.com/package/latlng-to-zip)
```bash
npm install --save latlng-to-zip
```

Installing [query-string parsing & stringifying](https://www.npmjs.com/package/qs)
```bash
npm install --save qs
```

### Coding Standards
I am currently following coding Standards from [airbnb](https://github.com/airbnb/javascript/tree/master/react).
I have decided to use `fat-arrow functions` for actions.
I have decided to use `functions` for stateless classes (without state, they are essentially just functions).

### Welcome Screen (or Tutorials Screen)
This [Tutorials screen](jobs/components/Slides.js) will introduce users what this app is about and how it will work!
<img src="demo/tut1.png" width="280"> <img src="demo/tut2.png" width="280"> <img src="demo/tut3.png" width="280">

### Authentication Screen (FB auth)
I will be using [Facebook Authentication via Expo](https://docs.expo.io/versions/v17.0.0/sdk/facebook.html).
*Disclaimer: I put my API keys into `.gitignore` so please get your own keys if you are going to use this project.*
<img src="demo/authFlow.png">

```js
// How to use AsyncStorage
import { AsyncStorage } from 'react-native';
// it works like a localStorage in web browser but is asynchronous. Need a callback to handle after successful request.
AsyncStorage.setItem('fb_token', token)
AsyncStorage.getItem('fb_token')

//ES6 arrow function + async-await
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action that FB login is completed
  } else {
    // Start up FB Login process
  }
}
```
More details on how my [auth action](jobs/actions/auth_action.js) works.

### Map Screen (Airbnb's mapscreen)
This [Map screen](jobs/screens/MapScreen.js) is redirected after FB authentication is successful.
I am utilizing [Mapview](https://github.com/airbnb/react-native-maps) from React Native.

<img src="demo/tut1.png" width="280">

### Deck Screen
This [Deck screen](jobs/screens/DeckScreen.js) will fetch a list of jobs in the area that was designated from previous screen.
The `SwipeDeck` component will be used to render a job, and if user likes a job, it will be stored into a list of saved jobs.

<img src="demo/deckScreen.png" width="280">

### Review Screen
This [Review screen](jobs/screens/ReviewScreen.js) will render a list of jobs that user has liked.

<img src="demo/reviewScreen1.png" width="280">

### Settings Screen
This [Settings screen](jobs/screens/SettingsScreen.js) will have a button that will clear out the list of liked jobs.
<img src="demo/settingsScreen.png" width="280">
