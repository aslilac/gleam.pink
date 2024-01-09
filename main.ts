import { serveDir } from "std/http/file_server.ts";

class Redirect extends Response {
	constructor(location: string) {
		super(null, { status: 302, headers: { location, vary: "accept" } });
	}
}

const redirects = new Map([
	[
		"/install.sh",
		"https://raw.githubusercontent.com/gleam-community/gleam-install/HEAD/install.sh",
	],
]);

Deno.serve((request) => {
	const url = new URL(request.url);

	if (
		url.pathname === "/install.sh" &&
		request.headers.get("accept")?.includes("text/html")
	) {
		return new Redirect(
			"https://github.com/gleam-community/gleam-install/tree/HEAD/install.sh",
		);
	}

	const location = redirects.get(url.pathname);
	if (location) {
		return new Redirect(location);
	}

	return serveDir(request, {
		fsRoot: "content/",
	});
});
