import gleam/erlang
import gleam/erlang/process
import gleam/http/request
import gleam/http/response.{type Response, Response}
import gleam/result
import gleam/string
import mist
import wisp
import wisp/wisp_mist

pub fn main() {
  let assert Ok(priv) = erlang.priv_directory("gleam_pink")

  let assert Ok(_) =
    wisp_mist.handler(server(_, priv), "secret secret secret")
    |> mist.new()
    |> mist.port(8080)
    |> mist.start_http()

  process.sleep_forever()
}

fn server(r, priv) -> _ {
  use <- wisp.serve_static(r, under: "/", from: priv)

  case wisp.path_segments(r) {
    ["install.sh"] ->
      case accepts("text/html", r) {
        True ->
          found("https://github.com/aslilac/gleam.pink/tree/HEAD/install.sh")
        False ->
          found(
            "https://raw.githubusercontent.com/aslilac/gleam.pink/HEAD/install.sh",
          )
      }

    [] ->
      response.new(200)
      |> response.set_header("content-type", "text/html; charset=utf-8")
      |> response.set_body(wisp.File(priv <> "/index.html"))

    _ ->
      response.new(200)
      |> response.set_header("content-type", "text/html; charset=utf-8")
      |> response.set_body(wisp.File(priv <> "/not_found.html"))
  }
}

fn accepts(content_type, r) {
  r
  |> request.get_header("accept")
  |> result.unwrap("")
  |> string.contains(content_type)
}

fn found(at at: String) -> Response(_) {
  Response(302, [#("location", at)], wisp.Empty)
}
