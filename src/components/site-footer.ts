class SiteFooter extends HTMLElement {
  connectedCallback() {
    const extraText = this.getAttribute('extra-text') ?? '';

    this.innerHTML = `
            <footer>
                ${extraText ? `<p>${extraText}</p>` : ''}
                <p class="copyright">
                    Imperial College Science Fiction Society. Please report issues to
                    <a href="mailto:icsf.techpriest@gmail.com">icsf.techpriest@gmail.com</a>
                </p>
            </footer>
        `;
  }
}

customElements.define('site-footer', SiteFooter);