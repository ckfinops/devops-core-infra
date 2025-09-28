// feature-module1-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../../components/payment/payment.component';

import { IntroPageComponent } from './Pages/intro-page/intro-page.component';
// import { FinOpsComponent } from './Pages/finops/finops.component';
import { ContactUsComponent } from './components/contactus/contact.component';
import { BlogsComponent } from './components/blogs-component/blogs/blog.component'
import { Blog1Component } from './components/blogs-component/blogs-pages/blog1/blog1';
import { Blog2Component } from './components/blogs-component/blogs-pages/blog2/frugalarchitect';
import { Blog3Component } from './components/blogs-component/blogs-pages/blog3/ec2';
import { Blog4Component } from './components/blogs-component/blogs-pages/blog4/route53';
import { Blog5Component } from './components/blogs-component/blogs-pages/blog5/dynamodb';
import { Blog6Component } from './components/blogs-component/blogs-pages/blog6/s3';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AutoScalingComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Auto-Scalling/auto-scaling';
import { BedrockComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Bedrock/bedrock';
import { CertificateManagerComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Certificate-Manager/certificate-manager';
import { CloudFrontComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_CloudFront/cloudfront';
import { CloudWatchComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_CloudWatch_Logs/cloudwatch';
import { CodeCommitComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_CodeCommit/cc';
import { CodeWhisperComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_CodeWhisperer/codewhisper';
import { ElasticLoadBalancingComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Elastic-load-Balancing/elb';
import { IAMGroupComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_IAm-Group/iamgroup';
import { IAMIdentityComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_IAM-Identity/iamidentities';
import { IAMRoleComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_IAM-Role/iamrole';
import { IAMUserComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_IAM-User/iamuser';
import { AWSLambdaComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Lamda/awslambda';
import { AWSRDSComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_RDS/awsrds';
import { Route53Component } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Route53/route53';
import { SimpleNotificationComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Simple-notification-service(SNS)/simplenotificationservice';
import { StepFunctionComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_step-Function/stepfunction';
import { GatewayComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Transit-Gateway/gateway';
import { VPCComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Virtual-private-cloud(vpc)/vpc';
import { VPCPeeringComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_VPC-Peering/vpcpeering';
import { VPNComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_VPN/vpn';
import { XRAYComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_X-Ray/xray';
import { CodeDeployComponent } from './components/blogs-component/blogs-pages/all-blogs/AWS_CodeDeploy/codedeploy';
import { SageMakerComponent } from './components/blogs-component/blogs-pages/all-blogs/AWS_SageMaker/sagemaker';
import { RDSMYSQLComponent } from './components/blogs-component/blogs-pages/all-blogs/RDS_MYSQL/rdsmysql';
import { RoutingComponent } from './components/blogs-component/blogs-pages/all-blogs/Routing_polices/routing';
import { ServerlessComponent } from './components/blogs-component/blogs-pages/all-blogs/serverless_website/serverless';
import { AWSCourseComponent } from './Pages/aws-course/aws-course.component';
import { SETTINGNLBCompoent } from './components/blogs-component/blogs-pages/use-cases/Setting-Up-Network-Load-Balancer/setting.nlb';
import { SETTINGALBCompoent } from './components/blogs-component/blogs-pages/use-cases/Setting-Up-Application-Load-Balancer/setting.alb';
import { DISASTERRECOVERYCompoent } from './components/blogs-component/blogs-pages/use-cases/Implementing-a-disaster-recovery-strategy-with-Amazon-RDS/disaster.recovery';
import { DOCKERCONTAINERSCompoent } from './components/blogs-component/blogs-pages/use-cases/Deploy-Docker-Containers-on-Amazon-Deploy-Docker-Containers/docker.containers';
import { SINGLESIGNONCompoent } from './components/blogs-component/blogs-pages/use-cases/aws-single-sign-on/single.signon';
import { WAFALBCompoent } from './components/blogs-component/blogs-pages/use-cases/aws-web-waf-on-alb/waf.alb';
import { LandingPageComponent } from './Pages/webinar/aws-webinar/landingpage';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy.policy';
import { TNCComponent } from './components/terms_and_conditions/t_n_c';
import { CancellationRefundComponent } from './components/cancellation_and_refundpolicy/cancellation_and_refundpolicy';
import { DataAnalystComponent } from './Pages/data-analyst/data-analyst.component';
import { DaPythonBasicsComponent } from './components/blogs-component/blogs-pages/all-blogs/da-python-basics/da-python-basics.component'
import { BlogTemplateComponent } from './components/blogs-component/blogs-pages/all-blogs/blog-template.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { DaNumpyBasicsComponent } from './components/blogs-component/blogs-pages/all-blogs/da-numpy-basics/da-numpy-basics.component';
// import { AzureDevOpsComponent } from './Pages/azure-devops/azure-devops.component';
import { DaPandasBasicsComponent } from './components/blogs-component/blogs-pages/all-blogs/da-pandas-basics/da-numpy-basics.component';
import { DevSecopsComponent } from './Pages/devsecops/devsecops.component';
import { DataScienceComponent } from './Pages/data-science/data-science.component';
import { DevOpsCourseComponent } from './Pages/devops-course/devops-course.component';
import { AWSDevOpsComponent } from './Pages/aws-devops/aws-devops.component';
import { AzureDevOpsComponent } from './Pages/azure-devops/azure-devops.component';
import { GitOpsComponent } from './Pages/gitops/gitops.component';

const routes: Routes = [
 
  {path:'home', component: IntroPageComponent},
  {path:'data-analyst', component: DataAnalystComponent},
  {path:'data-science', component: DataScienceComponent},
  {path:'aws', component: AWSCourseComponent},
  {path:'devsecops', component:DevSecopsComponent},
  {path:'devops', component: DevOpsCourseComponent},
  {path:'aws-devops', component: AWSDevOpsComponent},
  {path:'azure-devops', component: AzureDevOpsComponent},
  {path:'gitops', component: GitOpsComponent},
  {path:'payment', component: PaymentComponent},
  // {path:'azure-devops', component: AzureDevOpsComponent},
  // {path:'finops', component: FinOpsComponent},
  {path:'blogs', component: BlogsComponent},
  {path:'blogs', component:BlogTemplateComponent, children:[
    { path: 'da-python-basics-intro', component:DaPythonBasicsComponent},
    { path: 'da-numpy-basics', component:DaNumpyBasicsComponent},
    { path: 'da-pandas-basics', component:DaPandasBasicsComponent}
  ]},
  { path:'contactus', component: ContactUsComponent },

  { path: 'blog1' , component : Blog1Component },
  { path: 'frugalarchitect' , component : Blog2Component },
  { path: 'Amazon-EC2' , component : Blog3Component },
  { path: 'Route-53' , component : Blog4Component },
  { path: 'AWS-DynamoDB' , component : Blog5Component },
  { path: 'Amazon-S3' , component : Blog6Component },
  { path: 'thank-you' , component : ThankyouComponent },
  { path: 'Auto-Scaling' , component : AutoScalingComponent },
  { path: 'Amazon-Bedrock' , component : BedrockComponent },
  { path: 'AWS-Certificate-Manager-Component' , component : CertificateManagerComponent },
  { path: 'AWS-CloudFront' , component : CloudFrontComponent },
  { path: 'AWS-Cloud-Watch' , component : CloudWatchComponent },
  { path: 'AWS-Code-Commit' , component : CodeCommitComponent },
  { path: 'AWS-Code-Whisper' , component : CodeWhisperComponent },
  { path: 'Elastic-Load-Balancing' , component : ElasticLoadBalancingComponent },
  { path: 'IAM-Group' , component : IAMGroupComponent },
  { path: 'IAM-Identity' , component : IAMIdentityComponent },
  { path: 'IAM-Role' , component : IAMRoleComponent },
  { path: 'IAM-User' , component : IAMUserComponent },
  { path: 'AWS-Lambda' , component : AWSLambdaComponent },
  { path: 'AWS-RDS' , component : AWSRDSComponent },
  { path: 'AWS-Route-53' , component : Route53Component },
  { path: 'AWS-Simple-Notification-Service' , component : SimpleNotificationComponent },
  { path: 'Step-Function' , component : StepFunctionComponent },
  { path: 'Amazon-Transit-Gateway' , component : GatewayComponent },
  { path: 'Amazon-Virtual-Private-Cloud-VPC' , component : VPCComponent },
  { path: 'Amazon-Virtual-Private-Cloud-Peering' , component : VPCPeeringComponent },
  { path: 'VPNComponent' , component : VPNComponent },
  { path: 'Amazon-X-Ray' , component : XRAYComponent },
  { path: 'Amazon-Code-Deploy' , component : CodeDeployComponent },
  { path: 'SageMaker' , component : SageMakerComponent },
  { path: 'RDS-MYSQL' , component : RDSMYSQLComponent },
  { path: 'Routing-Policies-in-Amazon-Route53' , component : RoutingComponent },
  { path: 'AWS-Serverless' , component : ServerlessComponent },
  { path: 'Setting-Up-Network-Load-Balancer' , component : SETTINGNLBCompoent },
  { path: 'Setting-Up-Application-Load-Balancer' , component : SETTINGALBCompoent },
  { path: 'Implementing-a-disaster-recovery-strategy-with-Amazon-RDS' , component : DISASTERRECOVERYCompoent },
  { path: 'Deploy-Docker-Containers-on-Amazon-Deploy-Docker-Containers' , component : DOCKERCONTAINERSCompoent },
  { path: 'aws-single-sign-on' , component : SINGLESIGNONCompoent },
  { path: 'aws-web-waf-on-alb' , component : WAFALBCompoent },
  { path: 'webinar' , component : LandingPageComponent },
  { path: 'privacy-policy' , component : PrivacyPolicyComponent },
  { path: 'terms-and-conditions' , component : TNCComponent },
  { path: 'cancellation-refund-policy' , component : CancellationRefundComponent },
  {
    path: '',
    component: IntroPageComponent,
    // Add guards and resolve as needed
  },
  { path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicUiRoutingModule { }
