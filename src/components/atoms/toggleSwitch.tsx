import * as React from 'react';
import { Switch } from 'react-native-paper';
import { styles } from "../../styles/home.styles"


const SwitchButton = () => {
    

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} 
  style={styles.iconButton} />;
};

export default SwitchButton