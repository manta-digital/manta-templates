---
description: Rules for modern Python development with focus on readability and testability
globs: ["**/*.py", "**/pyproject.toml", "**/requirements*.txt", "**/Pipfile"]
alwaysApply: false
---

# Python Development Rules

## Version & Type Hints

- Target Python 3.9+ exclusively (no 2.x or 3.7 compatibility)
- Use built-in types: `list`, `dict`, `tuple`, not `List`, `Dict`, `Tuple`
- Use `|` for union types: `str | None` not `Optional[str]` or `Union[str, None]`
- Type hint all function signatures and class attributes
- Use `from __future__ import annotations` when needed for forward references

## Code Style & Structure

- Follow PEP 8 with 88-character line length (Black formatter default)
- Use descriptive variable names, avoid single letters except in comprehensions
- Prefer f-strings over `.format()` or `%` formatting
- Use pathlib.Path for file operations, not os.path
- Dataclasses or Pydantic for data structures, avoid raw dicts for complex data
- One class per file for models/services, group related utilities

## Functions & Error Handling

- Small, single-purpose functions (max 20 lines preferred)
- Use early returns to reduce nesting
- Explicit exception handling, avoid bare `except:`
- Raise specific exceptions with meaningful messages
- Use context managers (`with`) for resource management
- Prefer `ValueError`, `TypeError` over generic `Exception`

## Modern Python Patterns

- Use `match/case` for complex conditionals (3.10+)
- Walrus operator `:=` where it improves readability
- Comprehensions over `map`/`filter` when clear
- Generator expressions for memory efficiency
- `itertools` and `functools` for functional patterns
- Enum for constants, not module-level variables

## Testing & Quality

- Write tests alongside implementation
- Use pytest, not unittest
- Fixtures for test data and dependencies
- Parametrize tests for multiple scenarios
- Mock external dependencies at boundaries
- Docstrings for public APIs (Google or NumPy style)
- Type check with mypy or pyright in strict mode

## Dependencies & Imports

- Use poetry for complex projects, uv for simple ones
- Pin direct dependencies, let tools resolve transitive ones
- Group imports: standard library, third-party, local
- Absolute imports for project modules
- Avoid wildcard imports except in `__init__.py`

## Async & Performance

- Use `async`/`await` for I/O operations
- asyncio or trio for concurrency, not threading
- Profile before optimizing
- functools.cache for expensive pure functions
- Prefer built-in functions and comprehensions for speed

## Security & Best Practices

- Never hardcode secrets or credentials
- Use environment variables or secret management
- Validate all external input
- Use parameterized queries for SQL
- Keep dependencies updated
- Use `secrets` module for tokens, not `random`