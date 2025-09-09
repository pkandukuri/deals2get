import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-name">Deals2get.in</span>
        </div>
        <nav className="top-nav" aria-label="Top">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Docs</a>
          <a href="#" className="nav-link">About</a>
        </nav>
      </div>
    </header>
  )
}