import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const schema = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
const docs = await Promise.all(["PRIVACY_POLICY_TEMPLATE.md", "TERMS_OF_USE_TEMPLATE.md", "COMMUNITY_GUIDELINES.md", "SECURITY.md", "DATA_RETENTION_POLICY.md"].map((file) => readFile(new URL(`../${file}`, import.meta.url), "utf8")));

test("privacy data model has deny-by-default RLS enabled for every requested table", () => {
  for (const table of ["profiles", "projects", "join_requests", "tasks", "reports", "blocked_users", "consent_records", "cookie_preferences", "privacy_requests", "data_export_requests", "account_deletion_requests", "moderation_actions", "moderation_appeals", "audit_logs"]) {
    assert.match(schema, new RegExp(`alter table public\\.${table} enable row level security`));
  }
});

test("privacy controls and moderation safeguards are represented", () => {
  assert.match(schema, /analytics boolean not null default false/);
  assert.match(schema, /unique\(project_id, requester_id\)/);
  assert.match(schema, /moderators manage reports/);
  assert.match(schema, /moderators decide appeals/);
  assert.match(schema, /is_moderator boolean not null default false/);
});

test("legal docs preserve required placeholders and safety language", () => {
  assert.match(docs[0], /\[LEGAL_ENTITY_NAME\]/);
  assert.match(docs[0], /\[SUPERVISORY_AUTHORITY\]/);
  assert.match(docs[1], /\[GOVERNING_LAW\]/);
  assert.match(docs[2], /academic cheating services/);
  assert.match(docs[3], /Incident response/);
  assert.match(docs[4], /Backups/);
});
