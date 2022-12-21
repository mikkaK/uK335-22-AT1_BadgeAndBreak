import {FAB} from "react-native-paper"
import {styles} from "../../styles/home.styles"
import {View} from "react-native";


export default function AddNewReminderFAB({navigation}) {

    return (
        <View style={styles.fabView}>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() =>
                navigation.navigate('Details')}
            />
        </View>
    )
}
