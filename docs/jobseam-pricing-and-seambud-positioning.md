# JobSeam packaging and SeamBud positioning

Internal decision draft · November 21, 2026. The public site still presents the current capacity-based team plans. The alternatives below are proposals, without changes to billing, entitlements, or trial provisioning.

## Packaging options

| Option | How it would work | Tradeoff |
| --- | --- | --- |
| Flat workspace tiers with clearer starting points | Retain Solo $99, Early Adopter $199, Starter $299 and Growth $699 per month. Describe the jobs each tier can do, then show users, consultants, mailboxes and market limits. | Fastest to market. Buyers can see predictable team cost. Define what recurring agent work is enabled and how usage is scoped. |
| Independent module subscriptions | Sell recruiting, workforce records, and SeamBud individually, with a bundle for the full workflow. | Creates more entry points. Adds entitlement, upgrade, support and bundle complexity. A standalone module needs measurable independent value. |
| Workspace plus managed agent capacity | Include a base agent allowance and offer additional capacity by configured queue or usage band. Keep users subject to plan limits. | Aligns paid expansion to actual work. Requires metering, transparent limits and a reliable queue model before sale. |
| Free tier | Offer a bounded sample workspace or an ongoing free tier with limited active records. | Existing free demo and 14-day trial require fewer operational changes. A permanent tier needs retention, support, anti-abuse and margins defined before launch. |

Start with the first option. Organize the public pricing page by **Recruiting & Bench**, **Work Authorization & Operations**, and **SeamBud**. Sell workspace capacity using the live amounts. Keep Enterprise as scoped. Oorwin’s tabs demonstrate navigation by product area, while its pricing includes user units. BambooHR shows an alternative with a flat monthly minimum for small teams. Conrep is a closer flat-price staffing benchmark at $98/month billed annually for an entry package with unlimited users and usage caps. Juicebox sells a separate per-agent option. [Oorwin](https://oorwin.ai/pricing/) · [BambooHR](https://www.bamboohr.com/pricing/) · [Conrep](https://events.conrep.com/conrep/pricing.php) · [Juicebox](https://juicebox.ai/pricing)

Before locking any usage allowance, measure completed tasks, model and worker cost per successful run, review turnaround, retry rate and the share of recommendations accepted. Report those outcomes in pilots. Derive limits from the results.

## What to say about SeamBud

**Public message:** SeamBud keeps configured intake and review work moving between recruiter sessions. It prepares suggestions and outreach drafts from available evidence, and staff review defined decisions. Describe how the agent works through a queue. Avoid promising a headcount equivalent, continuous access to every source, or a specific throughput.

**Feedback available today:** A reviewer can submit corrections. The SeamBud profile-reading path retrieves recent relevant corrections for the same consultant and group, with task, reviewer and action metadata. JobSeam also records learning events and has an aggregate pattern review path with promotion and dismissal. These mechanisms are distinct from training model weights or deploying a replacement agent. [Profile tool](../../jobseam/api/seambud_bridge.py) · [Learning events and review](../../jobseam/api/seambud_assistant.py)

**What would be required for an agent that improves another agent:** Capture the task inputs, model version, tool outputs, reviewer decision, corrections and outcome. Build a versioned evaluation set from approved, appropriately scoped examples. Let an offline agent propose prompt, rule or retrieval changes. Replay against a held-out set and compare accuracy, policy adherence, latency and cost. Have an owner approve changes before a shadow or bounded rollout, with provenance and rollback. This is a product proposal. Current code evidence supports feedback-assisted task context and reviewed patterns.

See the [commercial implementation checklist](commercial-packaging-todo.md) for the current seat, capacity, module switch-off and export work.


## Product surfaces to demonstrate

| Surface | Show in a demo |
| --- | --- |
| SeamBud Workspace | Filter by consultant and task status. Open a run to inspect recorded steps, outcomes and proposals. |
| Consultant Tasks | Review a single consultant’s proposals, profile corrections, match decisions and available approvals. |
| Consultant Activity | Follow recorded agent, automated system, staff and consultant actions for the profile. |
| Audit Log | Inspect recorded application events within the viewer’s scope. Use filters, timestamps and identifiers to investigate an issue. |
| Scoped reports | Ask for a supported consultant CSV and show the role checks and source gaps. |

Source references: [Feature inventory](../../jobseam/docs/user-doc/FEATURE_INVENTORY_BY_ROLE.md) · [Workspace UI](../../jobseam/frontend/js/pages/seambud-workspace.js) · [Consultant workspace UI](../../jobseam/frontend/js/pages/consultant-workspace.js) · [Audit guide](../../jobseam/docs/help/audit.md)
