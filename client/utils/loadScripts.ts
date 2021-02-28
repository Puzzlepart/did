/**
 * Load scripts using document.createElement
 *
 * @param scriptSrc - Sources to load
 */
export async function loadScripts(scriptSrc: string[]): Promise<void> {
	return new Promise(resolve => {
		Promise.all(
			scriptSrc.map(
				async s =>
					new Promise(r => {
						const script = document.createElement('script');
						script.addEventListener('load', () => {
							r(true);
						});
						script.src = s;
						document.head.append(script);
					})
			)
		).then(() => {
			resolve();
		});
	});
}
