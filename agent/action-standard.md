# Playwright Automation Action Standard

This document defines the minimum engineering standard for adding or maintaining Playwright automation in this repository. Treat these rules as non-optional unless there is a documented exception with a clear technical reason.

## Objective

The automation suite must be:

- readable by any engineer without tribal knowledge
- stable under normal UI timing variance
- maintainable as the product evolves
- precise enough to fail on real regressions, not noise

## Core Principles

- Automate business behavior, not implementation detail.
- Optimize for long-term maintainability over short-term speed of authoring.
- Keep test intent obvious at first read.
- Isolate UI selectors and workflow logic behind page objects.
- Make failures diagnosable from the report, trace, and test title alone.

## Test Design Standard

- One spec should validate one business scenario or one bounded variation of that scenario.
- Each test must have a clear setup, action, and verification path.
- Test names must describe the business outcome, not the click sequence.
- Avoid combining unrelated assertions in a single test.
- Prefer independent tests over stateful test chains.
- Reuse authenticated state only when it reduces setup cost without hiding risk.

## Page Object Standard

- A page object represents a page, panel, modal, or bounded feature surface.
- A page object must expose business-level methods such as `login`, `logout`, `purchaseCourse`, `updateProfile`.
- Do not expose raw locator operations to the spec unless there is a strong reason.
- Keep locators private to the page object by convention.
- Keep methods cohesive. One method should complete one meaningful user flow.
- Split very large page objects before they become generic dumping grounds.

## Locator Strategy

Use selectors in this order of preference:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText` when the text is intentional product UI, not incidental copy
5. stable `data-testid` or equivalent explicit test hooks
6. CSS selectors only when the DOM contract is stable and semantic locators are insufficient
7. XPath only as a last resort

Additional rules:

- Selectors must be resilient to layout and styling changes.
- Do not target generated classes, DOM position, or brittle sibling chains unless unavoidable.
- If a locator is difficult to read, it is usually too fragile.
- If the product lacks stable hooks for critical flows, raise that as a product-quality issue rather than compensating with brittle selectors everywhere.

## Assertion Standard

- Assert the outcome that proves the business step succeeded.
- Assertions belong as close as possible to the action that they validate.
- Avoid weak assertions such as checking only URL changes when a visible state change is available.
- Use explicit visibility, text, value, and enabled-state assertions where appropriate.
- Do not stack redundant assertions that validate the same state.
- Each assertion should answer: what regression would this catch?

## Synchronization Standard

- Rely on Playwright's built-in waiting behavior before introducing custom waits.
- Prefer waiting on stable UI state such as visible elements, enabled actions, response completion, or confirmed text changes.
- Do not use arbitrary sleeps or timeouts to mask synchronization problems.
- If explicit waiting is required, the wait condition must represent a real user-observable state.
- When a flow is flaky, fix the state transition model first, not the timeout value.

## Data and Environment Standard

- Test data must be deliberate, minimal, and traceable.
- Environment-specific values belong in configuration or environment variables, not hard-coded into test logic.
- Secrets must never appear in committed test files.
- Use representative data values that make failures easy to interpret in reports.
- Shared data must be isolated enough that parallel or repeated execution does not corrupt results.

## Spec Structure Standard

Each spec should generally follow this shape:

1. arrange the required state
2. navigate to the entry point
3. execute one business flow through page-object methods
4. verify the expected outcome

Mandatory expectations:

- The spec file should stay thin.
- Navigation, workflow details, and locators should not sprawl inside the test body.
- Repeated setup must be extracted to fixtures, helpers, config, or reusable page methods.

## Naming Standard

- File names must use kebab-case.
- Class names must use PascalCase.
- Method names must use clear verb-led camelCase.
- Locator property names should identify the element purpose, for example `emailInput`, `submitButton`, `successToast`.
- Test titles should read like a business behavior, for example `user can enroll in two courses`.

## Error Handling and Diagnostics

- Fail early at the step where the behavior becomes invalid.
- Ensure the test title, step sequence, and assertions make the failure location obvious.
- Keep flows short enough that trace review is practical.
- Prefer assertions with meaningful expectations over generic existence checks.
- When adding custom helper logic, preserve stack clarity and avoid swallowing errors.

## Maintainability Rules

- Remove duplication once the same pattern appears more than twice and is likely to persist.
- Do not build abstractions before there is recurring evidence they are needed.
- Keep helpers narrowly scoped and intention-revealing.
- Refactor stale selectors and page methods when the UI changes; do not patch around old design with exceptions.
- If a test requires unusual branching, document the reason in a short code comment.

## Review Checklist

Before merging new automation, confirm all of the following:

- The scenario reflects a real user-critical or regression-prone behavior.
- The locator strategy is semantic and stable.
- The page object methods read at business level.
- The assertions prove outcome, not incidental motion.
- No arbitrary waits were introduced.
- Sensitive data is externalized.
- The test can be understood quickly by another senior engineer.
- The failure output would be actionable for the team.

## Non-Negotiable Anti-Patterns

Do not introduce the following without explicit justification:

- `waitForTimeout` as a synchronization strategy
- deeply chained CSS or XPath selectors tied to layout shape
- assertions only at the end of a long multi-step flow when earlier verification is possible
- specs that directly manipulate many locators instead of using page-object methods
- page objects that mix unrelated domains
- hidden dependencies on test execution order
- hard-coded credentials, tokens, phone numbers, or environment-specific URLs

## Senior Engineer Expectation

When adding automation, write it as if another engineer will need to debug a failure at 2 AM with no additional context. If the intent, state transitions, or failure signal are ambiguous, the implementation is not yet at production quality.
