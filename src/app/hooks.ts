import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = `ThomZz Hockey App - ${title}`
    }, [title])
}