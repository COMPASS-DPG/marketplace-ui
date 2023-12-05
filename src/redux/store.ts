import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  Store,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { courseDescriptionReducer } from './coursesDescription/courseDescriptionReducer';
import { marketplaceReducer } from './marketplace/marketplaceReducer';
import { notificationReducer } from './notification/notificationReducer';
import { purchaseHistoryReducer } from './purchaseHistory/purchaseHistoryReducer';
import { searchCoursesReducer } from './searchCourses/searchReducer';

const rootReducer = combineReducers({
  notification: notificationReducer,
  purchaseHistory: purchaseHistoryReducer,
  marketplace: marketplaceReducer,
  singleCourse: courseDescriptionReducer,
  searchCourses: searchCoursesReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, { type: string }, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store: Store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);
