# Privacy implementation map

| User control | Implementation |
|---|---|
| Privacy Policy / Terms / Guidelines | `src/app/privacy`, `src/app/terms`, `src/app/guidelines`, footer and sign-up links |
| Optional consent | `consent_records`, `cookie_preferences`, `/settings/privacy`; analytics defaults to off |
| Download my data | `data_export_requests`; production worker should generate a JSON export server-side |
| Correct my data | `/profile`, protected by profile ownership RLS |
| Delete my account | `account_deletion_requests`; production worker should anonymise/delete through an audited server action |
| Privacy requests | `privacy_requests`; target response workflow is one month |
| Reports and appeals | `reports`, `moderation_actions`, `moderation_appeals`, moderator-only RLS |
| Administrator auditability | `audit_logs`, moderator-only read/insert policies |
| Data minimisation | No phone, exact address, government ID, financial, health, religion, politics, sexual orientation, or biometric fields |

The UI currently demonstrates the safe workflow and Supabase-ready data model. Queue processing, email notifications, scheduled retention jobs, and a real moderator role assignment should be implemented as authenticated server-side functions before production launch.
