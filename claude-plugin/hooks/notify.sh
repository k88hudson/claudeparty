#!/usr/bin/env bash
# Called by Claude Code hooks with state as $1, hook JSON on stdin
set -euo pipefail

STATE="$1"
INPUT=$(cat)

SESSION_ID=$(echo "$INPUT" | grep -o '"session_id" *: *"[^"]*"' | head -1 | sed 's/.*: *"//;s/"//')
CWD=$(echo "$INPUT" | grep -o '"cwd" *: *"[^"]*"' | head -1 | sed 's/.*: *"//;s/"//')

if [ -z "$SESSION_ID" ] || [ -z "$CWD" ]; then
  exit 0
fi

# Derive project name from git repo
PROJECT=$(git -C "$CWD" rev-parse --show-toplevel 2>/dev/null | xargs basename 2>/dev/null || basename "$CWD")

# Walk up the process tree to find the TTY of the terminal session
TTY=""
PID=$PPID
for _ in 1 2 3 4 5 6 7 8; do
  T=$(ps -o tty= -p "$PID" 2>/dev/null | tr -d ' ')
  if [ -n "$T" ] && [ "$T" != "??" ]; then
    TTY="$T"
    break
  fi
  PID=$(ps -o ppid= -p "$PID" 2>/dev/null | tr -d ' ')
  [ -z "$PID" ] && break
done
TERM_PROG="${TERM_PROGRAM:-}"

PORT="${CATPARTY_PORT:-4689}"
URL="http://localhost:${PORT}/api/session"

if [ "$STATE" = "__delete__" ]; then
  ENCODED_ID=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$SESSION_ID")
  curl -sf -X DELETE "${URL}/${ENCODED_ID}" >/dev/null 2>&1 || true
else
  BODY=$(jq -n \
    --arg sid "$SESSION_ID" \
    --arg proj "$PROJECT" \
    --arg state "$STATE" \
    --arg tty "$TTY" \
    --arg tp "$TERM_PROG" \
    --arg cwd "$CWD" \
    '{session_id: $sid, project: $proj, state: $state, tty: $tty, term_program: $tp, cwd: $cwd}')
  curl -sf -X POST "$URL" \
    -H 'Content-Type: application/json' \
    -d "$BODY" \
    >/dev/null 2>&1 || true
fi
