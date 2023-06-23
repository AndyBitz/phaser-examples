export default function middleware(request, _event) {
	const url = new URL(request.url);

	// This is an unnecessarily complex way to make this work,
	// but better than rewriting all the games.
	//
	// When a request comes in on the root path it'll
	// set a cookie when `game` is set so that all follow up requests
	// will be rewritten to that game.
	//
	// If then another request to the root games in without the
	// query param, it'll unset the cookie again.

	const gameInit = url.searchParams.get('game');
	if (gameInit && url.pathname === '/') {
		return new Response(null, {
			headers: {
				'x-middleware-next': '1',
				'Set-Cookie': `game=${gameInit}; Path=/; HttpOnly`,
			},
		});
	}

	const games = new Set([
		'anims',
		'phaser-first-test',
		'states',
	]);

	const cookies = new Map(request.headers.get('cookie')?.split(';').map(raw => {
		const [name, value] = raw.split('=');
		return [name.trimLeft(), value]
	}) || []);

	const game = cookies.get('game');

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

	if (!gameInit && url.pathname === '/' && cookies.get('game')) {
		response.headers.set('Set-Cookie', `game=; Path=/; HttpOnly; Max-Age=0`);
	}

	return response;
}
