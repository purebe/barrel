export default class Net {
	/**
	 */
	static async fetch(url, dataType) {
		const data = await fetch(url);
		return data[dataType]();
	}
}
