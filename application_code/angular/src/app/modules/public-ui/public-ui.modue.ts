// feature-module1.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Import components, services, guards, etc. from this module
import { PublicUiRoutingModule } from './public-ui-routing.module';
import { CloudIntroComponent } from './components/cloud-intro/cloud-intro.component';
import { SharedModule } from 'src/app/shared/shared-mod.module';
import { IntroPageComponent } from './Pages/intro-page/intro-page.component';
import { IntroCardsComponent } from './components/Intro-cards/intro-cards.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { AWSCourseContentComponent } from './components/course-content-component/aws-course-content/aws-course-content.component';
import { HybridLearningComponent } from './components/hybrid-learning/hybrid-learning.component';
import { KeyFeaturesComponent } from './components/key-features/key-features.component';
import { CorporateTrainingComponent } from './components/corporate-training/corporate-training.component';
import { DigitalLyncComponent } from './components/digital-lync/digital-lync.component';
import { QuestionsColComponent } from './components/questions-col/questions-col.component';
import { CourseTableComponent } from './components/course-content-component/course-table/course-table.component';
// import { CourseIntenseTableComponent } from './components/course-content-component/aws-course-content/course-table-intense/course-table.component';
import { ImagePopupComponent } from './components/app-image-popup/image-popup.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
// import { CourseContentMob } from './components/course-content-component/aws-course-content/course-contentmob/course-contentmob'
import { RegisterFormComponent } from './components/course-content-component/registration-form/register.component'
import { FormsModule } from '@angular/forms';
import { Blog1Component } from './components/blogs-component/blogs-pages/blog1/blog1';
import { FAQComponent } from './components/faqs/faq.component';
import { Blog2Component } from './components/blogs-component/blogs-pages/blog2/frugalarchitect';
import { ContactUsComponent } from './components/contactus/contact.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { SubHeaderComponent } from './components/subhead/subheader.component';
import { FeeStructureComponent } from './components/fee-structure/fee.structure.component';
import { ToolsComponent } from './components/tools/tools.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BlogComponent } from './components/blogs-component/blog/blog';
import { VideoComponent } from './components/video-demo/video.component';
import { CompanyComponent } from './components/companies/company.component';
import { BlogStartingComponent } from './components/blogs-component/blogstarting/blogstart';
import { BlogsComponent } from './components/blogs-component/blogs/blog.component';
import { AutoScalingComponent } from './components/blogs-component/blogs-pages/all-blogs/Amazon_Auto-Scalling/auto-scaling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { ReviewsColComponent } from './components/reviews/reviews.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleReviewsColComponent } from './components/reviews/google-reviews/google-reviews';
import { AWSMobileCourseContent } from './components/course-content-component/aws-course-content/awsmobilecc/awsmobilecc';
import { AWSCourseComponent } from './Pages/aws-course/aws-course.component';
import { DataAnalystComponent } from './Pages/data-analyst/data-analyst.component';
import { AWSToolsComponent } from './components/course-content-component/aws-course-content/aws-tools/aws-tools.component';
import { HomePageNewComponent } from './components/home-page-new/page1';
import { MatTabsModule } from '@angular/material/tabs';
import { LandingPageComponent } from './Pages/webinar/aws-webinar/landingpage';
import { WeOfferComponent } from './components/we-offer/we.offer';
import { LandingBannerComponent } from './components/we-offer/landing-banner-home/landing-banner';
import { LandingReviewsComponent } from './components/we-offer/landing-reviews/landing-reviews';
import { LandingVideosComponent } from './components/we-offer/landing-videos/landing-videos';
import { LandingPriceComponent } from './components/we-offer/price/landing.price';
import { RolesComponent } from './components/we-offer/roles/roles';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy.policy';
import { TNCComponent } from './components/terms_and_conditions/t_n_c';
import { CancellationRefundComponent } from './components/cancellation_and_refundpolicy/cancellation_and_refundpolicy';
import { UpcomingComponent } from './components/upcoming/upcoming';
import { LandingBanner3Component } from './components/we-offer/landing-banner3-awsdevops/landing-banner3';
import { HomeFaqComponent } from './components/home-faq/home-faq.component';
import { PaymentComponent } from '../../components/payment/payment.component';

import { FeeEMIAWSComponent } from './components/fee-emi-popup-aws/fee.emi.component';
import { FeeEMIAWSMain } from './components/fee-emi-popup-aws/fee-emi-main-aws/fee-emi-main';
import { DataAnalystCourseComponent } from './components/course-content-component/data-analyst/data-analyst-course.component'
import { DataAnalystCCMBComponent } from './components/course-content-component/data-analyst/data-analyst-ccmb/data-analyst-ccmb';
import { DevSecOpsFaqComponent } from './components/faqs/devops-faq/devsecops-faq.component';
import { DataAnalystFaqComponent } from './components/faqs/data-analyst-faq/data-analyst-faq.component';
import { DAEligibilityComponent } from './components/course-content-component/data-analyst/da-eligibility/da-eligibility.component';
import { AWSEligibilityComponent } from './components/course-content-component/aws-course-content/aws-eligibility/aws-eligibility.component';
import { BlogTemplateComponent } from './components/blogs-component/blogs-pages/all-blogs/blog-template.component';
import { DaToolsComponent } from './components/course-content-component/data-analyst/da-tools/da-tools.component';
import { DaCertifcatesComponent } from './components/course-content-component/data-analyst/da-certifcates/da-certifcates.component';
import { DaPandasBasicsComponent } from './components/blogs-component/blogs-pages/all-blogs/da-pandas-basics/da-numpy-basics.component';

// Azure Imports
// import { AzureDevOpsContentComponent } from './components/course-content-component/azure-devops/azure-devops-content.component';
// import { AzureDevOpsComponent } from './Pages/azure-devops/azure-devops.component';
// import { AzureDevopsEligibilityComponent } from './components/course-content-component/azure-devops/azure-devops-eligibility/azure-devops-eligibility.component';
// import { AzureAWSCourseContentMobileView } from './components/course-content-component/azure-devops/azure-devops-ccmb/azure-devops-ccmb';
// import { LandingBanner4AzureDevOpsComponent } from './components/we-offer/landing-banner4-azuredevops/landing-banner4-azuredevops';
// import { AzureDevopsFaqComponent } from './components/faqs/azure-devops-faq/azure-devops-faq.component';
// import { AzureToolsComponent } from './components/course-content-component/azure-devops/azure-tools/azure-tools.component';
// import { AzureCertifcatesComponent } from './components/course-content-component/azure-devops/azure-certifcates/azure-certifcates.component';

// FinOps Imports
// import { FinOpsComponent } from './Pages/finops/finops.component'
// import { FinOpsCourseContentMob } from './components/course-content-component/finops/finopscourse-contentmob/finopscourse-contentmob';
// import { FinOpsCoursesComponent } from './components/course-content-component/finops/finops-courses.component'
// import { FinopsEligibilityComponent } from './components/course-content-component/finops/finops-eligibility/finops-eligibility.component';
import { DeveopsdownloadformComponent } from './components/course-content-component/finops/deveopsdownloadform/deveopsdownloadform.component';
// import { RegulardownloadformComponent } from './components/course-content-component/finops/regularCCdownload/regularcontent';
// import { FinOpsToolsComponent } from './components/course-content-component/finops/finops-tools/finops-tools.component';
// import { DevopsDownloadComponent } from './components/course-content-component/finops/devopsdownload-form/devops.download.component';

// import { FinopsFaqComponent } from './components/faqs/finops-faq/finops-faq.component';
import { LandingBanner2Component } from './components/we-offer/landing-banner2-finops/landing-banner2';
import { FeeEMIfinOpsMain } from './components/fee-emi-popup-finOps/fee-emi-main-finOps/fee-emi-main';
import { FeeEMIFinOpsComponent } from './components/fee-emi-popup-finOps/fee.emi.component';
import { AWSToolsAndPlatformsComponent } from './components/course-content-component/aws-course-content/aws-tools-and-platforms/aws-tools-and-platforms.component';
import { DevSecopsComponent } from './Pages/devsecops/devsecops.component';
import { DevSecopsCourseContentComponent } from './components/course-content-component/devops-course-content/devsecops-course-content.component';
import { DevSecOpsEligibilityComponent } from './components/course-content-component/devops-course-content/devsecops-eligibility/devsecops-eligibility.component';
import { DevSecopsToolsComponent } from './components/course-content-component/devops-course-content/desecvops-tools/devsecops-tools.component';
import { DevSecOpsToolsAndPlatformsComponent } from './components/course-content-component/devops-course-content/devops-tools-and-platforms/devsecops-tools-and-platforms.component';
import { AwsFaqComponent } from './components/faqs/aws-faq/aws-faq.component';
import { LandingBanner5AWSComponent } from './components/we-offer/landing-banner5-aws/landing-banner5-aws';
import { DataScienceComponent } from './Pages/data-science/data-science.component';
import { LandingBannerDatascienceComponent } from './components/we-offer/landing-banner-datascience/landing-banner-datascience.component';
import { DataScienceCCComponent } from './components/course-content-component/data-science/data-science.component';
import { DSEligibilityComponent } from './components/course-content-component/data-science/ds-eligibility/ds-eligibility.component';
import { DataScienceFaqComponent } from './components/faqs/data-science-faq/data-science-faq.component';
import { DataScienceCCMBComponent } from './components/course-content-component/data-analyst/data-science-ccmb/data-science-ccmb';
import { DevSecopsmobileccComponent } from './components/course-content-component/devops-course-content/devsecopsmobilecc/devsecopsmobilecc.component';
import { CourseContentComponent } from './components/we-offer/course-content/course-content';
import { UpcomingBatchesComponent } from './components/upcoming-batches/upcoming-batches.component';
import { DevOpsCourseComponent } from './Pages/devops-course/devops-course.component';
import { AWSDevOpsComponent } from './Pages/aws-devops/aws-devops.component';
import { AzureDevOpsComponent } from './Pages/azure-devops/azure-devops.component';
import { GitOpsComponent } from './Pages/gitops/gitops.component';

@NgModule({
  declarations: [CloudIntroComponent,
    AWSCourseContentComponent, IntroCardsComponent, ProgramsComponent, 
    AWSToolsComponent, TNCComponent, CancellationRefundComponent,
    DataAnalystComponent, DataAnalystCourseComponent, DataAnalystCCMBComponent,
    AWSCourseComponent, HybridLearningComponent, KeyFeaturesComponent,
    CorporateTrainingComponent, DigitalLyncComponent, QuestionsColComponent,
    CourseTableComponent, IntroPageComponent, 
    // CourseIntenseTableComponent,
    
    ImagePopupComponent, 
    // CourseContentMob,
    RegisterFormComponent,   UpcomingComponent,
    Blog1Component, FAQComponent, Blog2Component, ContactUsComponent,
    CertificateComponent, SubHeaderComponent, FeeStructureComponent, PrivacyPolicyComponent, LandingBanner2Component, LandingBanner3Component,
    ToolsComponent, TestimonialsComponent, BlogComponent, VideoComponent, LandingPageComponent, WeOfferComponent, LandingBannerComponent, LandingReviewsComponent, LandingVideosComponent, LandingPriceComponent, RolesComponent,
    CompanyComponent, BlogStartingComponent, BlogsComponent, AutoScalingComponent,
     ReviewsColComponent, GoogleReviewsColComponent,
    FeeEMIAWSComponent, FeeEMIAWSMain, 
    AWSMobileCourseContent,  HomePageNewComponent, HomeFaqComponent,
    
    DataAnalystFaqComponent, DAEligibilityComponent, AWSEligibilityComponent,  BlogTemplateComponent, DaToolsComponent, DaCertifcatesComponent, 
    // AzureDevOpsContentComponent, AzureDevOpsComponent, AzureDevopsEligibilityComponent, AzureAWSCourseContentMobileView, LandingBanner4AzureDevOpsComponent, AzureDevopsFaqComponent,
    DaPandasBasicsComponent, 
    // AzureToolsComponent, AzureCertifcatesComponent,
    
    AWSToolsAndPlatformsComponent,
    AwsFaqComponent,
    LandingBanner5AWSComponent,
    
    // // FinOps
    // FinOpsComponent, FinOpsCoursesComponent,
    // FinOpsCourseContentMob,
    // FinOpsToolsComponent,
    // FeeEMIfinOpsMain, FeeEMIFinOpsComponent,
    // FinopsFaqComponent,
    // FinopsEligibilityComponent,
    DeveopsdownloadformComponent,
    // RegulardownloadformComponent,
    // DevopsDownloadComponent,
    
    // DevOps;;;
    DevSecopsComponent,
    DevSecopsCourseContentComponent,
    DevSecOpsEligibilityComponent,
    DevSecopsmobileccComponent,
    DevSecopsToolsComponent,
    DevSecOpsToolsAndPlatformsComponent,
    DevSecOpsFaqComponent,

    DataScienceComponent,
    LandingBannerDatascienceComponent,
    DSEligibilityComponent,
    DataScienceCCComponent,
    DataScienceFaqComponent,
    DataScienceCCMBComponent,
    CourseContentComponent,
    UpcomingBatchesComponent,
    PaymentComponent,
    DevOpsCourseComponent,
    AWSDevOpsComponent,
    AzureDevOpsComponent,
    GitOpsComponent
  ],
  imports: [RouterModule, PublicUiRoutingModule, MatTabsModule, SharedModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatIconModule, MatSnackBarModule, HttpClientModule, MatDialogModule, MatCardModule, MatProgressSpinnerModule],
  providers: [],
})
export class PublicUiModule { }
