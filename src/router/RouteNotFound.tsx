import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const RouteNotFound = ({children}: Props) => {
  return (
    <Routes>
        {children}
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  ) 
}