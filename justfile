default:
    @just --list

install:
    cargo install catppuccin-whiskers

format:
    @echo "no formatter configured"

lint:
    @echo "no linter configured"

test:
    @echo "no tests configured"

check: lint test build

update:
    cargo install catppuccin-whiskers

build:
    whiskers templates/palette.tera

build-awoo-css:
    printf '@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");\n' > src/css/awoo.min.css
    tail -n +2 src/css/awoo-local.min.css >> src/css/awoo.min.css

run-dev-server:
    python3 -m http.server 8000
