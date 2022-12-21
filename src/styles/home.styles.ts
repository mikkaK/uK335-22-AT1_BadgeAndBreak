import { StyleSheet} from 'react-native';
import {transparent} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      alignItems: 'center',
      justifyContent: "center",
      flexDirection: 'row'
      
    },
    card: {
        backgroundColor: 'pink',   
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
        marginTop: "2%",
        width: "90%",
       /* maxHeight:"5000%",*/
        //TODO min max stuff damit nicht kacke

    },
    iconButton: {
        position: 'absolute',
       top: 10,
       right: 10,

    },
    fab: {
    flex: 2,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    margin: 16,
    left: "45%",
    bottom: 10,
    transform: [{translateX:-30}]  ,


    }, scrollView: {
      flex:1,
 

    },
    FABContainer: {
        flex:0.19
    },
    fabView: {
        position: 'absolute',
        left: "45%",
        bottom: 5,

    }


});
