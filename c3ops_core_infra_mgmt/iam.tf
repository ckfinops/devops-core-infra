# Groups
resource "aws_iam_group" "c3ops_admin" {
  name = "c3ops-admin"
}
resource "aws_iam_group" "c3ops_finops" {
  name = "c3ops-finops"
}
resource "aws_iam_group" "c3ops_developer" {
  name = "c3ops-developer"
}
resource "aws_iam_group" "c3ops_readonly" {
  name = "c3ops-readonly"
}

# Users
resource "aws_iam_user" "joel" {
  name = "joel@c3ops.in"
}
resource "aws_iam_user" "jessi" {
  name = "jessi@c3ops.in"
}
resource "aws_iam_user" "kesav" {
  name = "kesav@c3ops.in"
}
resource "aws_iam_user" "sam" {
  name = "sam@c3ops.in"
}

# Enable AWS Console access for users with a default password
resource "aws_iam_user_login_profile" "joel" {
  user                    = aws_iam_user.joel.name
  password_reset_required = true
}
resource "aws_iam_user_login_profile" "jessi" {
  user                    = aws_iam_user.jessi.name
  password_reset_required = true
}
resource "aws_iam_user_login_profile" "kesav" {
  user                    = aws_iam_user.kesav.name
  password_reset_required = true
}
resource "aws_iam_user_login_profile" "sam" {
  user                    = aws_iam_user.sam.name
  password_reset_required = true
}

# IAM Group for Preprod/Prod Access
resource "aws_iam_group" "preprod_prod_access" {
  name = "PreprodProdAccess"
}

# IAM Policy to allow AssumeRole into preprod/prod accounts only
resource "aws_iam_policy" "assume_preprod_prod" {
  name        = "AssumePreprodProdRole"
  description = "Allow assuming roles in preprod and prod accounts only."
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = "sts:AssumeRole",
        Resource = [
          "arn:aws:iam::225989338000:role/<ROLE_NAME>",
          "arn:aws:iam::225989338000:role/<ROLE_NAME>"
        ]
      }
    ]
  })
}

# Attach policy to group
resource "aws_iam_group_policy_attachment" "preprod_prod_access" {
  group      = aws_iam_group.preprod_prod_access.name
  policy_arn = aws_iam_policy.assume_preprod_prod.arn
}


# Admin group: Full access
resource "aws_iam_policy" "admin_full_access" {
  name        = "c3ops-admin-full-access"
  description = "Full admin access for c3ops-admin group"
  policy      = data.aws_iam_policy_document.admin_full_access.json
}
data "aws_iam_policy_document" "admin_full_access" {
  statement {
    actions   = ["*"]
    resources = ["*"]
    condition {
      test     = "StringEquals"
      variable = "aws:RequestedRegion"
      values   = ["ap-south-2", "us-east-1"]
    }
  }
}
resource "aws_iam_group_policy_attachment" "admin_full_access" {
  group      = aws_iam_group.c3ops_admin.name
  policy_arn = aws_iam_policy.admin_full_access.arn
}

# FinOps group: Billing, Cost Explorer, Budgets, Cost & Usage Reports
resource "aws_iam_policy" "finops_access" {
  name        = "c3ops-finops-access"
  description = "FinOps access for c3ops-finops group"
  policy      = data.aws_iam_policy_document.finops_access.json
}
data "aws_iam_policy_document" "finops_access" {
  statement {
    actions = [
      "aws-portal:*Billing",
      "aws-portal:View*",
      "ce:*",
      "budgets:*",
      "cur:*",
      "organizations:Describe*",
      "organizations:List*"
    ]
    resources = ["*"]
  }
}
resource "aws_iam_group_policy_attachment" "finops_access" {
  group      = aws_iam_group.c3ops_finops.name
  policy_arn = aws_iam_policy.finops_access.arn
}

# Developer group: EC2, S3, Lambda, CloudWatch, RDS (modify as needed)
resource "aws_iam_policy" "developer_access" {
  name        = "c3ops-developer-access"
  description = "Developer access for c3ops-developer group"
  policy      = data.aws_iam_policy_document.developer_access.json
}
data "aws_iam_policy_document" "developer_access" {
  statement {
    actions = [
      "ec2:*",
      "s3:*",
      "lambda:*",
      "cloudwatch:*",
      "rds:*"
    ]
    resources = ["*"]
    condition {
      test     = "StringEquals"
      variable = "aws:RequestedRegion"
      values   = ["ap-south-2", "us-east-1"]
    }
  }
}
resource "aws_iam_group_policy_attachment" "developer_access" {
  group      = aws_iam_group.c3ops_developer.name
  policy_arn = aws_iam_policy.developer_access.arn
}

# Readonly group: All read-only actions
resource "aws_iam_policy" "readonly_access" {
  name        = "c3ops-readonly-access"
  description = "Read-only access for c3ops-readonly group"
  policy      = data.aws_iam_policy_document.readonly_access.json
}
data "aws_iam_policy_document" "readonly_access" {
  statement {
    actions = [
      "ec2:Describe*",
      "ec2:Get*",
      "ec2:List*",
      "s3:Get*",
      "s3:List*",
      "rds:Describe*",
      "rds:List*",
      "cloudwatch:Get*",
      "cloudwatch:List*",
      "cloudwatch:Describe*",
      "iam:Get*",
      "iam:List*",
      "iam:Generate*",
      "lambda:List*",
      "lambda:Get*",
      "organizations:Describe*",
      "organizations:List*",
      "ce:Get*",
      "ce:List*",
      "ce:Describe*",
      "budgets:ViewBudget",
      "budgets:Describe*"
    ]
    resources = ["*"]
    condition {
      test     = "StringEquals"
      variable = "aws:RequestedRegion"
      values   = ["ap-south-2", "us-east-1"]
    }
  }
}
resource "aws_iam_group_policy_attachment" "readonly_access" {
  group      = aws_iam_group.c3ops_readonly.name
  policy_arn = aws_iam_policy.readonly_access.arn
}

# Users to groups (already present, but for clarity)
resource "aws_iam_user_group_membership" "joel_membership" {
  user   = aws_iam_user.joel.name
  groups = [aws_iam_group.c3ops_admin.name]
}
resource "aws_iam_user_group_membership" "jessi_membership" {
  user   = aws_iam_user.jessi.name
  groups = [aws_iam_group.c3ops_finops.name]
}
resource "aws_iam_user_group_membership" "kesav_membership" {
  user   = aws_iam_user.kesav.name
  groups = [aws_iam_group.c3ops_developer.name]
}
resource "aws_iam_user_group_membership" "sam_membership" {
  user   = aws_iam_user.sam.name
  groups = [aws_iam_group.c3ops_readonly.name]
}

# SSO/Identity Provider integration for cross-account access
# resource "aws_iam_saml_provider" "c3ops_idp" {
#   name                   = "c3ops-sso-idp"
#   saml_metadata_document = file("sso-idp-metadata.xml") # Place your SAML metadata XML in this file
# }
#
# resource "aws_iam_role" "cross_account_access" {
#   name = "c3ops-cross-account-access"
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Principal = {
#           Federated = aws_iam_saml_provider.c3ops_idp.arn
#         },
#         Action = "sts:AssumeRoleWithSAML",
#         Condition = {
#           StringEquals = {
#             "SAML:aud" = "https://signin.aws.amazon.com/saml"
#           }
#         }
#       }
#     ]
#   })
# }
#
# resource "aws_iam_role_policy_attachment" "cross_account_access_admin" {
#   role       = aws_iam_role.cross_account_access.name
#   policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
# }

# Direct IAM users for cross-account access
resource "aws_iam_role" "cross_account_access" {
  name = "c3ops-cross-account-access"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = [
            "arn:aws:iam::225989338000:user/joel@c3ops.in",
            "arn:aws:iam::225989338000:user/jessi@c3ops.in",
            "arn:aws:iam::225989338000:user/kesav@c3ops.in",
            "arn:aws:iam::225989338000:user/sam@c3ops.in"
          ]
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "cross_account_access_admin" {
  role       = aws_iam_role.cross_account_access.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# Replace <PREPROD_ACCOUNT_ID>, <PROD_ACCOUNT_ID>, and <ROLE_NAME> with actual values.
# Add more users, groups, and policies as needed.