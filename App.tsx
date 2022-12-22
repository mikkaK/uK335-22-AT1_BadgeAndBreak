import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider,} from "react-native-paper";
import Home from "./src/components/pages/Home";
import Details from "./src/components/pages/Details";
import {NativeRouter} from "react-router-native";
import {useEffect} from "react";
import StorageService from "./src/services/StorageService";
import {ReminderType} from "./src/types/models/Reminders.models";
import {useTranslation} from "react-i18next";
import "./src/config/i18n/config";
import "intl";
import notifee, {EventType} from "@notifee/react-native";

/**
 *  on top of your index.android.js file
 */
const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file

/**
 * in your index.js file
 */
if (isAndroid) {
    /**
     * this line is only needed if you don't use an .android.js file
     */
    require('@formatjs/intl-getcanonicallocales/polyfill');
    require('@formatjs/intl-locale/polyfill');

    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-displaynames/polyfill');
    require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-listformat/polyfill');
    require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-numberformat/polyfill');
    require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/polyfill');
    require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/add-golden-tz.js');

    require('@formatjs/intl-displaynames/polyfill');
    require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-listformat/polyfill');
    require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-numberformat/polyfill');
    require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/polyfill');
    require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/add-golden-tz.js');

    /**
     * https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
      */

    if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
        Intl.DateTimeFormat.__setDefaultTimeZone(
            require("expo-localization").timezone
        );
    }
} // this line is only needed if you don't use an .android.js file
type RootStackParamList = {
    Home: {};
    Details: {};
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#FF597B",
        secondary: "#FF8E9E",
        tertiary: "#F9B5D0",
        neutral: "#EEEEEE",
        error: "#BA1A1A",
        onPrimary: "#FFFFFF",
        primaryContainer: "#FFD8DD",
        onPrimaryContainer: "#400012"

    }
}

const Stack = createStackNavigator<RootStackParamList>()
export default function App() {
    const allReminders: ReminderType[] = []
    const {t} = useTranslation();
    const {clearStorage} = StorageService;

    const globalScreenOptions = {
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTintColor: theme.colors.onPrimary,
    };

    return (
        <NativeRouter>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
                        <Stack.Screen
                            name="Details"
                            component={Details}
                            options={{title: t("description.details")}}
                        />
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{title: t('description.reminders')}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </NativeRouter>

    );
}

