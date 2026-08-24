interface NavLink {
  href: string;
  label: string;
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const extraLinks = JSON.parse(this.getAttribute('extra-links') ?? '[]') as NavLink[];

    // TODO: consider placement of extra nav links. currently have sandwiched them
    // after the 'Home' link but we could also just put them before everything
    this.innerHTML = `
            <nav>
                ${this.link('/', 'Home', path)}
                ${extraLinks.length > 0 ? '<hr />' : ''}
                ${extraLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
                ${extraLinks.length > 0 ? '<hr />' : ''}
                ${this.link('/events/', 'Events', path)}
                ${this.link('/library/', 'Library', path)}
                ${this.link('/committee/', 'Committee', path)}
                ${this.link('/publications/', 'Publications', path)}
                ${this.link('/picocon/', 'Picocon', path)}
                ${this.link('/quotes/', 'Quotes', path)}
                ${this.link('/gallery/', 'Gallery', path)}
                ${this.link('/history/', 'History', path)}
                
            </nav>
        `;
  }

  private link(href: string, label: string, currentPath: string): string {
    return `<a href="${href}" ${currentPath === href ? 'class="active"' : ''}>${label}</a>`;
  }
}

customElements.define('site-nav', SiteNav);