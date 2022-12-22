import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("errrrorrr")
    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("erererririri")
    }
};

const clearStorage = async () => {
    AsyncStorage.clear()
}
const StorageService = {
    storeData,
    getData,
    clearStorage
};

export default StorageService;
