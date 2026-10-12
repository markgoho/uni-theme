{{- /* Fixture override of the llms-full.txt body hook (uni-theme#40):
  the shared requirement fixture through text/requirements.md, as a
  consumer's per-award section would. */ -}}
## Fixture Badge

{{ $fixture := partial "fixture/requirements.html" . -}}
{{ partial "text/requirements.md" (dict "nodes" $fixture.nodes "footnotes" $fixture.footnotes) }}
