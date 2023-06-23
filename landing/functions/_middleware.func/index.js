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

	const cookies = new Map(request.headers.get('cookie')?.split(';').map(raw => {
		const [name, value] = raw.split('=');
		return [name.trimLeft(), value]
	}) || []);

	const gameCurrent = cookies.get('game');
	const gameInit = url.searchParams.get('game');

	if (!gameInit && url.pathname === '/') {
		// Remove the cookie if there is no `game` query param on the root path.
		return new Response(null, {
			headers: {
				'x-middleware-rewrite': new URL(`/${url.search}`, url).toString(),
				'Set-Cookie': 'game=; Path=/; HttpOnly; Max-Age=0'
			},
		});
	}

	if (gameInit && url.pathname === '/' && gameCurrent !== gameInit) {
		return new Response(null, {
			headers: {
				'x-middleware-rewrite': new URL(`/${gameInit}${url.search}`, url).toString(),
				'Set-Cookie': `game=${gameInit}; Path=/; HttpOnly`,
			},
		});
	}

	const games = new Set([
		'anims',
		'phaser-first-test',
		'states',
	]);

	if (gameCurrent && games.has(gameCurrent)) {
		// Rewrite to the game by prefixing the path for the rewrite
		const dest = new URL(`/${gameCurrent}/${url.pathname}${url.search}`, url);

		const response = new Response();
		response.headers.set('x-middleware-rewrite', String(dest));

		return response;
	}

	// Do nothing
	const response = new Response();
	response.headers.set('x-middleware-next', '1');
	return response;
}
