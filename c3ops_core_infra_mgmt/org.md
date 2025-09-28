2) Control-plane model (no human access to Mgmt)

Principles

Mgmt = “organization control plane” only. Nobody logs in.

Only a locked-down CodeBuild role in Mgmt can:

Manage Organizations/OUs/SCPs and central security services

Create/rotate KMS keys for state/artifacts

Create/update cross-account deploy roles in Preprod/Prod

Preprod & Prod each host their own CodePipeline + CodeBuild that assume a stage-specific deploy role to apply Terraform for that account.

Github → CodePipeline integration via a Connection (no runners needed).

Key Roles

c3ops-mgmt-iac-role (in mgmt): used by mgmt CodeBuild for org/security/seed.

c3ops-preprod-deploy-role and c3ops-prod-deploy-role: target roles that pipelines assume to apply infra/app.

c3ops-crossacct-codepipeline-role (in preprod/prod): lets CodePipeline/CodeBuild assume respective *-deploy-role.

SCP guardrails (attached to Root/OU)

Deny iam:* and organizations:* except for the mgmt CodeBuild role

Deny console login to mgmt (allow only programmatic for principals matching the CodeBuild role)

Deny creation of access keys for humans in mgmt

Require MFA for any future exceptions (if ever)


IAM policies have been created and attached:

c3ops-admin: Full access to all AWS resources.
c3ops-finops: Access to billing, cost explorer, budgets, and related services.
c3ops-developer: Access to EC2, S3, Lambda, CloudWatch, and RDS.
c3ops-readonly: Read-only access to all resources.
