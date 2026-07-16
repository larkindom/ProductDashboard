# Building an AI Second Brain — Reference for Claude

> Reference spec distilled from Meta Analytics' public writeup, ["How We Built an
> AI Second Brain for 60K Knowledge Workers"](https://medium.com/@AnalyticsAtMeta/how-we-built-an-ai-second-brain-for-60k-knowledge-workers-78c507dd795b)
> (Medium, 2026), plus corroborating coverage of the same system. Use this file
> as a build spec: if a user asks you to set up a persistent, agentic "second
> brain" workspace, follow the structure below rather than inventing one from
> scratch.

## What this system actually is

Not a new model, not a RAG pipeline, not a vector database. It's a **file and
folder convention plus a set of integrations** layered on top of an existing
agentic coding harness (Meta's deployment runs on Claude Code with an
Anthropic model; the design is harness-agnostic — any agent loop with
filesystem access, tool calling, and MCP support works). The insight: the
same harness built for writing code is generically good at "reason about my
stuff, take actions on my behalf" if you give it durable context and scoped
tool access.

Scale, for calibration: originated in one analytics org, spread to 60,000+
people across every function (eng, PM, design, legal, finance, comms,
sales), 63,000+ installs, ~10,000 daily active users.

## Core design principle: progressive disclosure

The single most load-bearing decision in the system. Dumping all of a
person's context into every conversation degrades output quality — the
agent drowns in irrelevant detail. Instead:

- Load a **lean root context** at session start.
- Drill into **project-level detail only when the conversation needs it**.
- Structure skills so the agent sees only a one-line description until it
  decides to invoke one — the full instructions load then, not before.

Rule of thumb when implementing: **lean context up front, deeper detail on
demand.** Every structural choice below exists to serve this rule.

## The four building blocks

### 1. PARA workspace structure

Use Tiago Forte's PARA method as the folder taxonomy — it's a durable map of
a person's work that the agent can navigate without being told where things
are:

```
workspace/
├── CLAUDE.md                  # root context — always loaded
├── Projects/                  # active, time-bound efforts with an end state
│   ├── project-a/
│   │   └── CLAUDE.md          # loaded only when this folder is opened
│   └── project-b/
│       └── CLAUDE.md
├── Areas/                      # ongoing responsibilities, no end date
│   └── team-management/
├── Resources/                  # reference material, topics of interest
│   └── competitive-analysis/
└── Archives/                    # inactive/completed — kept, not deleted
    └── project-c-2025/
```

- **Projects** — active, has a deadline or definition of done.
- **Areas** — standing responsibility you maintain indefinitely.
- **Resources** — reference material with no ownership obligation.
- **Archives** — anything that's no longer active. Move things here instead
  of deleting; the agent should treat archive contents as historical
  context, not current state.

### 2. Root `CLAUDE.md`

Loaded on every session. Keep it short — this is the "lean" half of
progressive disclosure. It should answer: *who is this person, what are
they actively working on, where does new information belong?*

```markdown
# [Name] — Working Context

## Identity
Role, team, org. One or two lines — enough for the agent to calibrate tone
and default assumptions, not a full bio.

## Active portfolio
- Projects/project-a — [one-line status, why it matters right now]
- Projects/project-b — [one-line status]
(Only list what's currently active. Move finished work to Archives and
delete the line here — this list is the thing that goes stale fastest.)

## Lifecycle rules
- New meeting notes → route to the matching Projects/ folder by topic.
- Recurring standing work (not a project) → lives in Areas/, not Projects/.
- When a project ships or is cancelled → move its folder to Archives/,
  remove it from Active portfolio above.

## Conventions
Anything idiosyncratic the agent needs every time: naming patterns, tools
this person uses, org-specific shorthand.
```

### 3. Per-project `CLAUDE.md`

One per `Projects/<x>/` (and `Areas/<x>/` where useful). Only loaded when
that folder enters the conversation — this is the "detail on demand" half.
Contents: project goal, key decisions and their dates, people involved,
current open questions, links to source docs/tickets. Keep entries dated —
recency is a signal the agent should use when reconciling conflicting notes.

### 4. Skills

Reusable workflows encoded as **plain markdown files, optionally with small
scripts** — no compiled code, no servers, no deployment pipeline. This is
deliberate: skills need to be writable and shareable by non-engineers, and
by the agent itself.

- One skill = one file = one workflow, written as step-by-step instructions
  a competent-but-context-free agent could follow.
- The agent sees only the skill's short description by default; full
  content loads only on invocation (progressive disclosure applied to
  skills specifically).
- Because they're just text, anyone — including the agent — can draft,
  edit, and share new skills without a release process.

Example skill shape:

```markdown
---
name: turn-meeting-into-prd
description: Convert a raw meeting transcript into a structured PRD draft.
---

1. Read the transcript at the given path or link.
2. Identify: problem statement, decisions made, open questions, owners.
3. Load the target project's CLAUDE.md for context on prior decisions.
4. Draft a PRD using [org's PRD template] — flag anything inferred vs.
   stated explicitly in the transcript.
5. Write output to Projects/<project>/drafts/, don't overwrite existing docs.
```

## Tool access: MCP servers + CLIs

The precondition that makes any of this useful: the agent needs
**authenticated, scoped access** to the systems where work actually lives —
docs, wikis, task trackers, messaging, code review, meeting transcripts,
calendars. Most knowledge-worker context is *not* in local files.

- Expose each internal system via an **MCP server** (or a thin CLI the
  agent can shell out to) that authenticates as the user and respects their
  existing permissions — the agent should never have broader access than
  the person it's acting for.
- Treat this as the actual engineering investment. The markdown/folder
  layer above is cheap; wiring real, permission-scoped tool access to every
  system people actually use is the hard part and the part that makes the
  system worth anything.
- Design MCP tools narrowly (read transcript, get task status, post
  comment) rather than as general-purpose API passthroughs — narrow tools
  are easier for the agent to use correctly and easier to audit.

## Bootstrapping a new user: `/para-init`

Cold-start is the biggest adoption barrier — nobody will manually build out
a PARA tree and write a root CLAUDE.md before getting any value. Provide a
single bootstrap command that:

1. Scans the person's recent activity across connected tools (recent docs,
   tickets, calendar, messages).
2. Infers an initial Projects/Areas structure from that activity.
3. Drafts the root `CLAUDE.md` (identity + active portfolio) for the user
   to review and correct, not accept blindly.

The goal is a usable workspace and a real result in the **first session**,
before the user has invested any manual setup time. If you're implementing
this, treat the zero-to-first-value path as a first-class feature, not an
afterthought — it was the specific unlock that took this from a niche tool
to viral internal adoption at Meta (per the source article, adoption
inflected sharply after a non-technical PM published concrete before/after
examples, and spread across the org within days).

## Extending to teams: "Third Brain"

Once individuals have workspaces, a natural next layer is letting them feed
a **shared team context**: individual Projects/Areas roll up into a
team-level knowledge layer, enabling things like auto-generated team status
reports that pull from everyone's active work. Treat this as a v2 — get the
individual layer solid and adopted first. This is explicitly still a pilot
in the source system (dozens of teams, hundreds of participants at time of
writing), not a finished pattern — expect to design your own rollup/merge
rules for how individual CLAUDE.md content aggregates.

## Build checklist

If asked to implement a version of this system, work in this order:

1. **Pick or confirm the harness** — an agentic loop with filesystem access,
   tool calling, MCP support, and error recovery. Claude Code is the
   reference implementation; the pattern itself doesn't require it.
2. **Stand up MCP/CLI access** to the 2-4 systems that hold the most
   context for this user/org (docs, tasks, chat, calendar are the usual
   starting set). Scope every tool to the acting user's own permissions.
3. **Define the PARA tree** and write the root `CLAUDE.md` template.
4. **Write 3-5 starter skills** for the highest-frequency workflows (e.g.
   meeting → notes, status report generation, doc drafting from
   transcripts) rather than trying to cover everything up front.
5. **Build the bootstrap command** (`/para-init` equivalent) so a new user
   gets a populated workspace and a first real result without manual setup.
6. **Ship to a handful of real users before templating it** — the adoption
   story here came from concrete, visible before/after examples, not from
   the tooling alone. Get one compelling example working end-to-end before
   rolling out broadly.
7. Only after (1)-(6) are solid, consider a team/shared-context layer
   ("Third Brain") — it's additive, not a prerequisite.

## Things to get right that are easy to skip

- **Never grant the agent more access than the user already has.** Every
  MCP/CLI integration should be a pass-through of the user's own
  permissions, not a service account with broad scope.
- **Archives are for retention, not deletion.** The agent should be able to
  tell the difference between "no longer relevant" and "gone" — moving to
  Archives preserves the former without cluttering active context.
- **Root CLAUDE.md goes stale fast.** The active-portfolio list is the part
  most likely to drift from reality; treat keeping it current as part of
  the lifecycle rules, not a one-time setup step.
- **Don't skip the bootstrap command.** A system that requires manual
  folder/file setup before it's useful will not get organic adoption,
  regardless of how good the steady-state experience is.
- **Security/governance is a real open question, not a footnote.** Giving
  an agent standing access to a person's docs, chat, calendar, and tickets
  is a meaningfully different risk surface than a chatbot — treat
  permission scoping, audit logging, and prompt-injection exposure (e.g.
  malicious instructions hidden in a doc or transcript the agent reads) as
  first-class design concerns, not afterthoughts.

## Sources

- [How We Built an AI Second Brain for 60K Knowledge Workers — Analytics at
  Meta, Medium](https://medium.com/@AnalyticsAtMeta/how-we-built-an-ai-second-brain-for-60k-knowledge-workers-78c507dd795b)
