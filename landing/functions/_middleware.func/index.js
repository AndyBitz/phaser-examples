export default function middleware(request, _event) {
	console.log('request.host', request.host);
	console.log('request.url', request.url);

	// Do nothing
	const headers = new Headers(request.headers ?? {});
	headers.set('x-middleware-next', '1');

	return new Response(null, {
		headers,
	});
}
