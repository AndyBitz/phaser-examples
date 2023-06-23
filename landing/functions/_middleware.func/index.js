const games = new Set([
	'anims',
	'phaser-first-test',
	'states',
]);

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

	const cookies = new Map(
		request.headers.get('cookie')?.split(';').map(raw => {
			return raw.split('=');
		}) ||
		[]
	);

	// Fallback to the referer, because the cookie seems to be missing for
	// some assets.
	const gameReferer = new URL(request.headers.get('referer') || url).searchParams.get('game');
	const gameCurrent = cookies.get('game') || gameReferer;
	const gameInit = url.searchParams.get('game');

	// Remove the cookie if there is no `game` query param on the root path.
	if (gameCurrent && !gameInit && url.pathname === '/') {
		return new Response(null, {
			headers: {
				'x-middleware-rewrite': new URL(`/${url.search}`, url).toString(),
				'Set-Cookie': 'game=; Path=/; HttpOnly; Max-Age=0'
			},
		});
	}

	// Set the cookie and rewrite to the game.
	if (gameInit && url.pathname === '/' && gameCurrent !== gameInit) {
		return new Response(null, {
			headers: {
				'x-middleware-rewrite': new URL(`/${gameInit}${url.search}`, url).toString(),
				'Set-Cookie': `game=${gameInit}; Path=/; HttpOnly`,
			},
		});
	}

	// Rewrite all paths if the current game is set via a cookie.
	if (games.has(gameCurrent)) {
		return new Response(null, {
			headers: {
				'x-middleware-rewrite': new URL(`/${gameCurrent}${url.pathname}${url.search}`, url).toString(),
			}
		});
	}

	// Do nothing
	const response = new Response();
	response.headers.set('x-middleware-next', '1');
	return response;
}
