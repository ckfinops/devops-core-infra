import { Component, OnInit } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isActive: boolean;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-home-faq',
  templateUrl: './home-faq.component.html',
  styleUrls: ['./home-faq.component.css']
})
export class HomeFaqComponent implements OnInit {
  faqCategories: FaqCategory[] = [
    {
      title: 'Program Details',
      items: [
        {
          question: 'What is the duration of the program?',
          answer: 'The program is designed to be completed in 6 months, with flexible learning options that allow you to pace yourself according to your schedule.',
          isActive: false
        },
        {
          question: 'What are the prerequisites for enrollment?',
          answer: 'Basic knowledge of programming and IT concepts is recommended. We provide pre-course materials to help you prepare if needed.',
          isActive: false
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with the program.',
          isActive: false
        }
      ]
    },
    {
      title: 'Learning & Support',
      items: [
        {
          question: 'How is the course content delivered?',
          answer: 'Content is delivered through a combination of video lectures, hands-on labs, live sessions, and interactive assignments. You can access all materials 24/7 through our learning platform.',
          isActive: false
        },
        {
          question: 'What kind of support is available?',
          answer: 'You\'ll have access to dedicated mentors, a community forum, live Q&A sessions, and 24/7 technical support throughout your learning journey.',
          isActive: false
        },
        {
          question: 'Can I get a certificate upon completion?',
          answer: 'Yes, you\'ll receive a verified certificate upon completion. We also prepare you for industry-recognized cloud certifications.',
          isActive: false
        }
      ]
    },
    {
      title: 'Career & Placement',
      items: [
        {
          question: 'What career support do you provide?',
          answer: 'We offer comprehensive career support including resume building, interview preparation, job placement assistance, and networking opportunities with our hiring partners.',
          isActive: false
        },
        {
          question: 'What is the job placement rate?',
          answer: 'Our current placement rate is 85%, with graduates securing positions at top tech companies within 6 months of completion.',
          isActive: false
        },
        {
          question: 'Do you offer internship opportunities?',
          answer: 'Yes, we partner with various companies to provide internship opportunities to our students during and after the program.',
          isActive: false
        }
      ]
    },
    {
      title: 'Certification & Exams',
      items: [
        {
          question: 'Which cloud certifications do you prepare students for?',
          answer: 'We prepare students for major cloud certifications including AWS Certified Solutions Architect, Azure Administrator, Google Cloud Professional, and FinOps Certified Practitioner. Our curriculum is aligned with the latest exam objectives.',
          isActive: false
        },
        {
          question: 'Do you provide practice exams and mock tests?',
          answer: 'Yes, we provide comprehensive practice exams that simulate the actual certification tests. These include detailed explanations for each question and performance analytics to help you identify areas for improvement.',
          isActive: false
        },
        {
          question: 'What is your certification success rate?',
          answer: 'Our students have a 95% first-attempt pass rate for cloud certifications. We provide dedicated exam preparation support, including one-on-one mentoring sessions with certified professionals.',
          isActive: false
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleFaq(categoryIndex: number, itemIndex: number): void {
    // Close all other items first
    this.faqCategories.forEach((category, catIdx) => {
      category.items.forEach((item, itemIdx) => {
        if (catIdx === categoryIndex && itemIdx === itemIndex) {
          // Toggle the clicked item
          item.isActive = !item.isActive;
        } else {
          // Close other items
          item.isActive = false;
        }
      });
    });
  }
} 