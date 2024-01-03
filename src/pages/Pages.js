import React from 'react'
import Home from './Home'
import Searched from './Searched'
import Search from "../components/Search";
import { Route, Routes } from 'react-router-dom'
import Recipe from './Recipe';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
  )
}

export default Pages;
