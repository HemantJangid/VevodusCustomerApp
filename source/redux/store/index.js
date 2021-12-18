import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import FilesystemStorage from 'redux-persist-filesystem-storage'
// import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persist = persistReducer(persistConfig, rootReducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(persist);
export const persistor = persistStore(store);
