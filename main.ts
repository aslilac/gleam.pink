import { serve } from "https://deno.land/std@0.186.0/http/server.ts";

function redirect(location: string) {
	return new Response(null, {
		status: 302,
		headers: {
			location,
		},
	});
}

const redirects = new Map([
	[
		"/install.sh",
		"https://raw.githubusercontent.com/gleam-community/gleam-install/HEAD/install.sh",
	],
]);

function router(request: Request) {
	const url = new URL(request.url);
	const location = redirects.get(url.pathname);

	if (!location) {
		return redirect("https://gleam.run")
	}

	return redirect(location);
}

serve(router);