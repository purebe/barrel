import { WebGL, Shader } from '/js/webgl.js';
import DOM from '/js/dom.js';
import Net from '/js/net.js';

export default class Barrel {
	constructor() {
		this.canvas = DOM.createElement({
			tagName: 'canvas',
			attribs: {
				width: window.innerWidth,
				height: window.innerHeight
			},
			css: {
				display: 'block'
			}
		});
		this.gl = WebGL.init(this.canvas);
		this.shaders = [];
		this.render = this.render.bind(this);
	}

	/**
	 * @param {!Element} attachment Tag to attach the rendering context to.
	 */
	async initialize(attachment) {
		attachment.appendChild(this.canvas);

		this.gl.clearColor(0, 0, 0, 1);
		this.gl.enable(this.gl.DEPTH_TEST);

		const [ vertexSrc, fragmentSrc ] = (await Promise.all([
			Net.fetch('shaders/test.vert', 'text'),
			Net.fetch('shaders/test.frag', 'text')
		]));

		this.shaders.push(Shader.build(this.gl, vertexSrc, fragmentSrc));

		requestAnimationFrame(this.render);
	}

	/**
	 * @param {!DOMHighResTimeStamp} timestamp
	 */
	render(timestamp) {
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}
}
