import { IconButton } from "react-native-paper"
import { styles } from "../../styles/home.styles"

export default function EditIconButton() {
return(
<IconButton
             icon="pen"
             iconColor="black"
             
             size={30}
             style={styles.iconButton}
             onPress={() => console.log('Edit Reminder')}
           />

)
}