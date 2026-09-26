begin;

insert into public.hub_inquiries
  (project_id, name, email, message, phone, source_url, utm_source, utm_medium, utm_campaign, created_at)
values
  ('__test_project_1', 'Ava Thompson', 'ava.thompson@example.com', 'Interested in a demo of your platform for our marketing team.', '+1-202-555-0143', 'https://project-one.example.com/pricing', 'google', 'cpc', 'fall-launch', now() - interval '34 days'),
  ('__test_project_1', 'Marcus Lee', 'marcus.lee@example.com', 'Can you send more details about enterprise plans?', null, 'https://project-one.example.com/enterprise', 'linkedin', 'social', null, now() - interval '27 days'),
  ('__test_project_1', 'Priya Nair', 'priya.nair@example.com', 'Following up on the webinar, would like a call this week.', '+1-415-555-0198', 'https://project-one.example.com/webinar', null, null, null, now() - interval '9 days'),
  ('__test_project_1', 'Diego Fernandez', 'diego.fernandez@example.com', 'Question about API rate limits for our use case.', null, 'https://project-one.example.com/docs/api', 'google', 'organic', null, now() - interval '2 days'),

  ('__test_project_2', 'Sophie Turner', 'sophie.turner@example.com', 'We need a custom integration with our CRM, is that possible?', '+44-20-7946-0958', 'https://project-two.example.com/contact', 'facebook', 'social', 'q3-promo', now() - interval '30 days'),
  ('__test_project_2', 'Noah Kim', 'noah.kim@example.com', 'Requesting a quote for 50 seats.', null, 'https://project-two.example.com/pricing', 'google', 'cpc', 'q3-promo', now() - interval '21 days'),
  ('__test_project_2', 'Elena Petrova', 'elena.petrova@example.com', 'Can someone reach out about onboarding support?', '+7-495-555-0132', 'https://project-two.example.com/support', null, null, null, now() - interval '13 days'),
  ('__test_project_2', 'Liam O''Brien', 'liam.obrien@example.com', 'Interested in the annual plan discount.', null, 'https://project-two.example.com/pricing', 'newsletter', 'email', 'q3-promo', now() - interval '4 days'),

  ('__test_project_3', 'Grace Chen', 'grace.chen@example.com', 'Do you offer a free trial for non-profits?', null, 'https://project-three.example.com/nonprofits', 'google', 'organic', null, now() - interval '32 days'),
  ('__test_project_3', 'Omar Haddad', 'omar.haddad@example.com', 'Looking for a partnership opportunity.', '+971-4-555-0176', 'https://project-three.example.com/partners', 'linkedin', 'social', null, now() - interval '19 days'),
  ('__test_project_3', 'Isabella Rossi', 'isabella.rossi@example.com', 'Getting an error on checkout, can you help?', null, 'https://project-three.example.com/checkout', null, null, null, now() - interval '11 days'),
  ('__test_project_3', 'Jamal Carter', 'jamal.carter@example.com', 'Would like a demo scheduled for next week.', '+1-312-555-0187', 'https://project-three.example.com/demo', 'google', 'cpc', 'demo-drive', now() - interval '1 days'),

  ('__test_project_4', 'Mia Nakamura', 'mia.nakamura@example.com', 'Interested in the reseller program.', null, 'https://project-four.example.com/reseller', 'twitter', 'social', null, now() - interval '28 days'),
  ('__test_project_4', 'Ethan Walsh', 'ethan.walsh@example.com', 'Requesting technical documentation access.', null, 'https://project-four.example.com/docs', 'google', 'organic', null, now() - interval '17 days'),
  ('__test_project_4', 'Zara Ahmed', 'zara.ahmed@example.com', 'Can we set up a call to discuss migration from our current vendor?', '+92-21-555-0164', 'https://project-four.example.com/migrate', 'linkedin', 'social', 'migration-push', now() - interval '8 days'),
  ('__test_project_4', 'Lucas Silva', 'lucas.silva@example.com', 'What integrations are available out of the box?', null, 'https://project-four.example.com/integrations', 'google', 'cpc', 'migration-push', now() - interval '3 days'),

  ('__test_project_5', 'Hannah Schmidt', 'hannah.schmidt@example.com', 'Interested in a security/compliance review call.', null, 'https://project-five.example.com/security', 'google', 'organic', null, now() - interval '25 days'),
  ('__test_project_5', 'Ravi Patel', 'ravi.patel@example.com', 'Can you confirm SOC2 compliance status?', '+1-650-555-0121', 'https://project-five.example.com/compliance', 'linkedin', 'social', null, now() - interval '15 days'),
  ('__test_project_5', 'Chloe Martin', 'chloe.martin@example.com', 'Looking for pricing for a 200-seat rollout.', null, 'https://project-five.example.com/pricing', 'google', 'cpc', 'enterprise-q4', now() - interval '6 days'),
  ('__test_project_5', 'Kenji Sato', 'kenji.sato@example.com', 'Requesting a sandbox environment for evaluation.', null, 'https://project-five.example.com/sandbox', null, null, 'enterprise-q4', now());

commit;
