# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is currently empty (no commits, no source files). It will be a Node.js backend project. This file should be updated with build/lint/test commands and architecture notes as soon as the project is scaffolded.

## Working with this user

The user is an experienced frontend developer (JS/TS/React) who is new to Node.js backend development.

- **Explain new backend concepts as you introduce them.** When a backend-specific concept comes up for the first time (e.g. event loop, middleware, connection pooling, streams, process managers), give a 2-3 sentence explanation before or alongside using it. Don't over-explain concepts that carry over directly from frontend JS/TS.
- **Keep changes small.** Implement one feature at a time rather than bundling multiple features or large refactors into a single change.
- **Use TypeScript strict mode.** `strict: true` in `tsconfig.json`, no implicit `any`, no loosening of strict checks to make code compile.
- **Never commit secrets.** No API keys, tokens, credentials, or `.env` contents in code or commits.
- **Ask before adding a new dependency**, and state why it's needed, before running an install command.
