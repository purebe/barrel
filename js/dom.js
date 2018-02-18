export default class DOM {
	/**
	 * @param {!*} options
	 * @returns {Element}
	 */
	static createElement({ tagName, id, classes, attribs, css } = {}) {
		const el = document.createElement(tagName);
		if (id != null) {
			el.id = id;
		}
		if (classes != null) {
			el.classList.add(...classes);
		}
		if (attribs != null) {
			Object.assign(el, attribs);
		}
		if (css != null) {
			Object.assign(el.style, css);
		}
		return el;
	}
}
