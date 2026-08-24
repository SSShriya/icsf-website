class SiteHeader extends HTMLElement {
  connectedCallback() {
    const subtitle = this.getAttribute('subtitle') ?? '';

    this.innerHTML = `
            <h1>
                <a id="logo" href="/">
                    <img src="/logo.png" alt="ICSF Logo" width="93" height="60" />
                </a>
                ICSF
                <span id="subtitle">${subtitle}</span>
            </h1>
        `;
  }
}

customElements.define('site-header', SiteHeader);