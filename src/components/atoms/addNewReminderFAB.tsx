import { FAB } from "react-native-paper"
import { styles } from "../../styles/home.styles"


export default function AddNewReminderFAB() {
return(
    <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => console.log('Create new Reminder')}
  />
)
}