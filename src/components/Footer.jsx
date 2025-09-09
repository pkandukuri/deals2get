import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <small>
          © {new Date().getFullYear()} deals2get.in
        </small>
        <div className="footer-links">
          <a href="#" className="nav-link">Privacy</a>
          <a href="#" className="nav-link">Terms</a>
        </div>
      </div>
    </footer>
  )
}