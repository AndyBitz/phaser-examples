export default function middleware(request, _event) {
	const url = new URL(request.url);

	const redirect = url.searchParams.get('game');
	if (redirect) {
		// Redirect to the correct host
		const dest = new URL(`${url.protocol}//${redirect}.${url.host}${url.pathname}${url.search}`);

		return new Response(null, {
			status: 307,
			headers: {
				Location: String(dest),
			}
		});
	}

	const game = url.host.split('.')[0];

	const games = new Set([
		'anims',
		'phaser-first-test',
		'states',
	]);

	if (games.has(game)) {
		// Rewrite to the game by prefixing the path for the rewrite
		const dest = new URL(`/${game}/${url.pathname}${url.search}`, url);

		const response = new Response();
		response.headers.set('x-middleware-rewrite', String(dest));

		return response;
	}

	// Do nothing
	const response = new Response();
	response.headers.set('x-middleware-next', '1');
	return response;
}
