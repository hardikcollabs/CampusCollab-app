create extension if not exists "pgcrypto";

create type public.project_status as enum ('Open', 'Full', 'In Progress', 'Completed', 'Archived');
create type public.request_status as enum ('Pending', 'Accepted', 'Rejected', 'Withdrawn');
create type public.task_status as enum ('To Do', 'In Progress', 'Done');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 80),
  avatar_url text,
  college text check (char_length(college) <= 120),
  course text check (char_length(course) <= 120),
  year text check (char_length(year) <= 30),
  bio text check (char_length(bio) <= 500),
  interests text[] not null default '{}',
  availability text check (char_length(availability) <= 120),
  portfolio_url text,
  show_college_year boolean not null default true,
  is_moderator boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null check (char_length(name) between 1 and 60)
);

create table public.profile_skills (
  profile_id uuid references public.profiles(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  primary key (profile_id, skill_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 5 and 120),
  description text not null check (char_length(description) between 20 and 2000),
  category text not null check (category in ('Academic', 'Hackathon', 'Competition', 'Startup', 'Other')),
  teammates_needed integer not null check (teammates_needed between 0 and 20),
  deadline date,
  time_commitment text check (char_length(time_commitment) <= 80),
  status public.project_status not null default 'Open',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_skills (
  project_id uuid references public.projects(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  primary key (project_id, skill_id)
);

create table public.join_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  requester_id uuid not null references public.profiles(id) on delete cascade,
  note text check (char_length(note) <= 500),
  status public.request_status not null default 'Pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, requester_id)
);

create table public.team_members (
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key(project_id, user_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  assignee_id uuid references public.profiles(id) on delete set null,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 2 and 160),
  description text check (char_length(description) <= 1000),
  due_date date,
  status public.task_status not null default 'To Do',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reported_user_id uuid references public.profiles(id) on delete cascade,
  reported_project_id uuid references public.projects(id) on delete cascade,
  reason text not null check (reason in ('Harassment', 'Spam', 'Scam', 'Inappropriate content', 'Other')),
  notes text check (char_length(notes) <= 1000),
  status text not null default 'Open' check (status in ('Open','Under review','Actioned','Closed')),
  evidence_ref text,
  assigned_moderator uuid references public.profiles(id) on delete set null,
  action_taken text,
  appeal_status text not null default 'Not requested' check (appeal_status in ('Not requested','Pending','Reviewed')),
  created_at timestamptz not null default now(),
  check (reported_user_id is not null or reported_project_id is not null)
);

create table public.blocked_users (
  blocker_id uuid references public.profiles(id) on delete cascade,
  blocked_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  consent_version text not null,
  selected_categories text[] not null default '{}',
  granted_at timestamptz not null default now(),
  withdrawn_at timestamptz
);
create table public.cookie_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  essential boolean not null default true,
  analytics boolean not null default false,
  marketing boolean not null default false,
  consent_version text not null,
  updated_at timestamptz not null default now()
);
create table public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  request_type text not null check (request_type in ('access','correction','deletion','restriction','objection','portability','withdraw_consent')),
  details text check (char_length(details) <= 2000),
  status text not null default 'Pending' check (status in ('Pending','In progress','Completed','Rejected')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create table public.data_export_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'Queued' check (status in ('Queued','Processing','Ready','Expired','Failed')),
  file_path text,
  requested_at timestamptz not null default now(),
  expires_at timestamptz
);
create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  confirmation_text text not null,
  status text not null default 'Queued' check (status in ('Queued','Review','Completed','Cancelled')),
  requested_at timestamptz not null default now(),
  completed_at timestamptz
);
create table public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  moderator_id uuid not null references public.profiles(id),
  report_id uuid references public.reports(id) on delete set null,
  target_user_id uuid references public.profiles(id) on delete set null,
  target_project_id uuid references public.projects(id) on delete set null,
  action text not null check (action in ('No action','Warning','Content removed','Feature restricted','Suspended','Terminated')),
  reason text not null check (char_length(reason) between 5 and 1000),
  created_at timestamptz not null default now()
);
create table public.moderation_appeals (
  id uuid primary key default gen_random_uuid(),
  action_id uuid not null references public.moderation_actions(id) on delete cascade,
  appellant_id uuid not null references public.profiles(id) on delete cascade,
  statement text not null check (char_length(statement) between 10 and 2000),
  status text not null default 'Pending' check (status in ('Pending','Upheld','Reversed','Partially reversed')),
  outcome_notes text,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  target_type text,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index projects_status_idx on public.projects(status);
create index projects_owner_idx on public.projects(owner_id);
create index join_requests_project_idx on public.join_requests(project_id);

alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.profile_skills enable row level security;
alter table public.projects enable row level security;
alter table public.project_skills enable row level security;
alter table public.join_requests enable row level security;
alter table public.team_members enable row level security;
alter table public.tasks enable row level security;
alter table public.reports enable row level security;
alter table public.blocked_users enable row level security;
alter table public.consent_records enable row level security;
alter table public.cookie_preferences enable row level security;
alter table public.privacy_requests enable row level security;
alter table public.data_export_requests enable row level security;
alter table public.account_deletion_requests enable row level security;
alter table public.moderation_actions enable row level security;
alter table public.moderation_appeals enable row level security;
alter table public.audit_logs enable row level security;

create policy "public profiles are readable without contact details" on public.profiles for select using (true);
create policy "users manage their profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "skills readable" on public.skills for select using (true);
create policy "users manage profile skills" on public.profile_skills for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "public projects readable" on public.projects for select using (is_public = true or auth.uid() = owner_id);
create policy "owners manage projects" on public.projects for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "project skills readable" on public.project_skills for select using (exists (select 1 from public.projects p where p.id = project_id and (p.is_public or p.owner_id = auth.uid())));
create policy "owners manage project skills" on public.project_skills for all using (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "requesters and owners read requests" on public.join_requests for select using (requester_id = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "requesters create requests" on public.join_requests for insert with check (requester_id = auth.uid() and not exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "requesters withdraw or owners decide" on public.join_requests for update using (requester_id = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "requesters delete requests" on public.join_requests for delete using (requester_id = auth.uid());
create policy "team members and owners read teams" on public.team_members for select using (user_id = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "owners manage teams" on public.team_members for all using (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "team members and owners read tasks" on public.tasks for select using (created_by = auth.uid() or assignee_id = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "team members create tasks" on public.tasks for insert with check (created_by = auth.uid() and exists (select 1 from public.team_members tm where tm.project_id = project_id and tm.user_id = auth.uid()));
create policy "task creators and owners manage tasks" on public.tasks for update using (created_by = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "task creators and owners delete tasks" on public.tasks for delete using (created_by = auth.uid() or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
create policy "users create reports" on public.reports for insert with check (reporter_id = auth.uid());
create policy "users read own reports" on public.reports for select using (reporter_id = auth.uid());
create policy "moderators manage reports" on public.reports for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true)) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "users manage blocks" on public.blocked_users for all using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy "users manage own consent" on public.consent_records for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users manage own cookie preferences" on public.cookie_preferences for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users manage own privacy requests" on public.privacy_requests for select using (user_id = auth.uid());
create policy "users create privacy requests" on public.privacy_requests for insert with check (user_id = auth.uid());
create policy "users read own exports" on public.data_export_requests for select using (user_id = auth.uid());
create policy "users create own exports" on public.data_export_requests for insert with check (user_id = auth.uid());
create policy "users read own deletion requests" on public.account_deletion_requests for select using (user_id = auth.uid());
create policy "users create own deletion requests" on public.account_deletion_requests for insert with check (user_id = auth.uid());
create policy "moderators read moderation actions" on public.moderation_actions for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "moderators manage moderation actions" on public.moderation_actions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true)) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "users read own appeals" on public.moderation_appeals for select using (appellant_id = auth.uid() or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "users create own appeals" on public.moderation_appeals for insert with check (appellant_id = auth.uid());
create policy "moderators decide appeals" on public.moderation_appeals for update using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "moderators read audit logs" on public.audit_logs for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));
create policy "moderators create audit logs" on public.audit_logs for insert with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_moderator = true));

create or replace function public.prevent_project_flood()
returns trigger language plpgsql security definer as $$
begin
  if exists (select 1 from public.projects where owner_id = auth.uid() and created_at > now() - interval '1 hour') then
    raise exception 'Please wait before creating another project';
  end if;
  return new;
end; $$;
create trigger project_rate_limit before insert on public.projects for each row execute function public.prevent_project_flood();

create or replace function public.prevent_full_project_request()
returns trigger language plpgsql security definer as $$
declare capacity integer; current_members integer;
begin
  select teammates_needed into capacity from public.projects where id = new.project_id and status = 'Open';
  if capacity is null then raise exception 'This project is not accepting requests'; end if;
  select count(*) into current_members from public.team_members where project_id = new.project_id;
  if current_members >= capacity then raise exception 'This team is full'; end if;
  return new;
end; $$;
create trigger project_capacity_guard before insert on public.join_requests for each row execute function public.prevent_full_project_request();
