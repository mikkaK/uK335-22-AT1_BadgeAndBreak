import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *
 * @param key (is needed to set and get a specific storage)
 * @param value (is needed to set the specific storage to value)
 * These functions are used to deal with storage persistence and "clearStorage" (not used at the moment) to wipe storage if needed
 */
const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {

    }
};

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (e) {

    }
};

const clearStorage = async () => {
    await AsyncStorage.clear()
}
const StorageService = {
    storeData,
    getData,
    clearStorage
};

export default StorageService;
