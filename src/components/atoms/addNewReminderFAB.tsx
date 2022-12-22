import {FAB} from "react-native-paper"
import {styles} from "../../styles/home.styles"
import {View} from "react-native";

/**
 *
 * @param navigation (react-native-router variable used for navigation)
 * @param reminders (passes all existing reminders to the detailsPage)
 * @constructor
 * Floating Action component used for adding a new reminder on the home page
 */
export default function AddNewReminderFAB({navigation, reminders}) {
    return (
        <View style={styles.fabView}>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() =>
                    navigation.navigate('Details', {reminders})}
            />
        </View>
    )
}
