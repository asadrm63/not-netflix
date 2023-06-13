import React, { useState } from 'react';

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const Navbar = ({toggleTV,setToggleTV}) => {

  return (
    <div>
      <ul className='menu-bar'>
        <span className='header' onClick={() => window.scroll(0, 0)}>NOTflix</span>
        <li onClick={() => scrollToSection('trending')}>Trending</li>
        <li onClick={() => scrollToSection('sortedByGenre')}>Sorted By Genre</li>
        <li onClick={() => scrollToSection('search')}>Search</li>
        <button onClick={() => setToggleTV(!toggleTV)}>Toggle TV/Movie</button>
      </ul>
    </div>
  );
};

export default Navbar;
