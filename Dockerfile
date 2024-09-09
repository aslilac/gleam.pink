from ghcr.io/gleam-lang/gleam:v1.4.1-erlang-alpine

copy . /opt/app/

workdir /opt/app/
run gleam export erlang-shipment \
  && mv ./build/erlang-shipment/ /opt/deploy/


workdir /opt/deploy/
cmd ["/opt/deploy/entrypoint.sh", "run"]
