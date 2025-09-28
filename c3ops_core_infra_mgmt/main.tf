resource "aws_organizations_organization" "this" {
  feature_set = "ALL"
}

# Enable SCP (Service Control Policy) type for the root
# resource "aws_organizations_policy_type" "scp" {
#   root_id     = aws_organizations_organization.this.roots[0].id
#   policy_type = "SERVICE_CONTROL_POLICY"
# }

# Example OUs
resource "aws_organizations_organizational_unit" "workloads" {
  name      = "Workloads"
  parent_id = aws_organizations_organization.this.roots[0].id
}

# SCP denying IAM except mgmt CodeBuild role
# data "aws_iam_policy_document" "scp_deny_iam_except_mgmt_cb" {
#   statement {
#     sid       = "DenyIAMExceptMgmtCB"
#     effect    = "Deny"
#     actions   = ["iam:*"]
#     resources = ["*"]
#     condition {
#       test     = "StringNotEquals"
#       variable = "aws:PrincipalArn"
#       values   = [var.mgmt_allowed_principal_arn]
#     }
#   }
# }

# resource "aws_organizations_policy" "deny_iam_except_mgmt_cb" {
#   name        = "DenyIAMExceptMgmtCB"
#   description = "Deny IAM everywhere except mgmt CodeBuild role"
#   type        = "SERVICE_CONTROL_POLICY"
#   content     = data.aws_iam_policy_document.scp_deny_iam_except_mgmt_cb.json
# }

# Attach SCP to Root (or Workloads OU)
# resource "aws_organizations_policy_attachment" "attach_root" {
#   policy_id  = aws_organizations_policy.deny_iam_except_mgmt_cb.id
#   target_id  = aws_organizations_organization.this.roots[0].id
#   # depends_on = [aws_organizations_policy_type.scp]
# }

# variable "mgmt_allowed_principal_arn" {
#   description = "The ARN of the management CodeBuild role allowed to use IAM actions"
#   type        = string
# }