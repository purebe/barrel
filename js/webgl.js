export class WebGL {
	/**
	 * @param {!HTMLCanvasElement} canvas
	 * @returns {!WebGLRenderingContext}
	 */
	static init(canvas) {
		const gl = canvas.getContext('webgl');
		if (!gl) {
			throw new Error('Unable to initialize WebGL.');
		}
		return gl;
	}
}

export class Shader {
	/**
	 * @param {!WebGLProgram} program
	 */
	constructor(program) {
		this.program = program;
	}

	/**
	 * @param {!WebGLRenderingContext} gl
	 * @param {!string} vertexSrc
	 * @param {!string} fragmentSrc
	 */
	static build(gl, vertexSrc, fragmentSrc) {
		const shaders = [
			Shader.compile(gl, vertexSrc, gl.VERTEX_SHADER),
			Shader.compile(gl, fragmentSrc, gl.FRAGMENT_SHADER)
		];
		const program = Shader.link(gl, shaders);
		return new Shader(program);
	}

	/**
	 * @param {!WebGLRenderingContext} gl
	 * @param {!string} src
	 * @param {!GLenum} type
	 * @returns {WebGLShader}
	 */
	static compile(gl, src, type) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const log = gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw new Error(`Shader compilation failed: ${log}.`);
		}
		return shader;
	}

	/**
	 * @param {!WebGLRenderingContext} gl
	 * @param {!WebGLShader[]}
	 * @returns {WebGLProgram}
	 */
	static link(gl, shaders) {
		const program = gl.createProgram();
		shaders.forEach(shader => gl.attachShader(program, shader));
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const log = gl.getProgramInfoLog(program);
			gl.deleteProgram(program);
			throw new Error(`Program link failed: ${log}.`);
		}
		return program;
	}
}
