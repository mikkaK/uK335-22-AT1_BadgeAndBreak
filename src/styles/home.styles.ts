
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
    },
    card: {
        backgroundColor: 'pink',   
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
        marginTop: "2%",
        width: "90%",
        minHeight: "12%"
    },
    iconButton: {
        position: 'absolute',
       top: 10,
       right: 10,
    

    },
    fab: {
    width: 60,  
    height: 60,   
    borderRadius: 30,   
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    margin: 16,
    left: "45%",
    bottom: 0,  
    transform: [{translateX:-30}]                                             

    }
  });