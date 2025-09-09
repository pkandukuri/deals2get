import React from 'react'

/**
 * items = [
 *  { label: 'Home', href: '#' },
 *  { label: 'Playground', href: '#' },
 *  { label: 'Random Dog' } // last item is current page (no link)
 * ]
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className={isLast ? 'crumb current' : 'crumb'}>
              {!isLast && item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
              {!isLast && <span className="sep" aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}