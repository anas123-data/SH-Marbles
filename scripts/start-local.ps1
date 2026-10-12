param([switch]$Production)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$pnpmCommand = Get-Command pnpm -ErrorAction SilentlyContinue
if ($nodeCommand -and $pnpmCommand) {
    $runner = $pnpmCommand.Source
} else {
    $runtime = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies'
    $nodePath = Join-Path $runtime 'node/bin/node.exe'
    $runner = Join-Path $runtime 'bin/fallback/pnpm.cmd'
    if (!(Test-Path -LiteralPath $nodePath) -or !(Test-Path -LiteralPath $runner)) {
        throw 'Install Node.js 24 LTS and pnpm, then run pnpm install and pnpm dev.'
    }
    $env:PATH = (Split-Path -Parent $nodePath) + ';' + $env:PATH
}
$env:NEXT_TELEMETRY_DISABLED = '1'
if (!(Test-Path -LiteralPath 'node_modules/next/package.json')) {
    & $runner install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
if ($Production) {
    & $runner build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & $runner start
} else {
    & $runner dev
}
