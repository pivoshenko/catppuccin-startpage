default:
    @just --list

install:
    cargo install catppuccin-whiskers

dev:
    python3 -m http.server 8000

build:
    whiskers templates/palette.tera

# Regenerate awoo.min.css from awoo-local.min.css by prepending the Google Fonts @import.
build-awoo:
    printf '@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");\n' > src/css/awoo.min.css
    tail -n +2 src/css/awoo-local.min.css >> src/css/awoo.min.css
