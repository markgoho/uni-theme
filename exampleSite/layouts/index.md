{{/* Markdown twin of index.html: the same fixture nodes through
  text/requirements.md (uni-theme#38). CI fails on any HTML tag or "{{"
  in a generated .md file. */ -}}
# {{ .Title }}

{{ $fixture := partial "fixture/requirements.html" . -}}
{{ partial "text/requirements.md" (dict "nodes" $fixture.nodes "footnotes" $fixture.footnotes) }}
