import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './index';

// using custom hooks instead of plain 'useDispatch' and 'useSelector';
// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;