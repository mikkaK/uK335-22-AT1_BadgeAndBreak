import AsyncStorage from "@react-native-async-storage/async-storage";
import {create, MMKVLoader} from "react-native-mmkv-storage";

/*const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    }catch(e){
        console.log("errrrorrr")
    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null){
            return value;
        }
    }catch(e) {
        console.log("erererririri")
    }
};*/

const storage = new MMKVLoader().initialize();
const useStorage = create(storage)

const setValue  = async (key:string, value:string) => {
    await storage.setStringAsync(key, value);
}
const getValue = async (key:string):Promise<string> => {
    let string = await storage.getStringAsync("string");
    return string;
}

/*const StorageService = {
    storeData,
    getData,
};*/

const StorageService = {
    setValue,
    getValue
}
export default StorageService;
