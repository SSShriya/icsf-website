class SiteHeader extends HTMLElement {
  static observedAttributes = ['subtitle'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const subtitle = this.getAttribute('subtitle') ?? '';
    const base = import.meta.env.BASE_URL;
    this.innerHTML = `
            <h1>
                <a id="logo" href="${base}">
                    <img src="${base}logo.png" alt="ICSF Logo" width="93" height="60" />
                </a>
                ICSF
                <span id="subtitle">${subtitle}</span>
            </h1>
        `;
  }
}

customElements.define('site-header', SiteHeader);