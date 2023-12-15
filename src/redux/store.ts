import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  Store,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { completedCourseReducer } from '@/redux/completedCourse/completedCourseReducer';

import { courseDescriptionReducer } from './coursesDescription/courseDescriptionReducer';
import { marketplaceReducer } from './marketplace/marketplaceReducer';
import { notificationReducer } from './notification/notificationReducer';
import { purchaseHistoryReducer } from './purchaseHistory/purchaseHistoryReducer';
import { searchCoursesReducer } from './searchCourses/searchReducer';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'marketplacePersistData',
  storage,
};

const rootReducer = combineReducers({
  notification: notificationReducer,
  purchaseHistory: purchaseHistoryReducer,
  marketplace: marketplaceReducer,
  singleCourse: courseDescriptionReducer,
  searchCourses: searchCoursesReducer,
  completedCourse: completedCourseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, { type: string }, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store: Store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
