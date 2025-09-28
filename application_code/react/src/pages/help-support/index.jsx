import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const HelpSupport = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const faqData = [
    {
      question: 'How do I set up budget alerts?',
      answer: 'Navigate to Budget Planning & Forecasting, click on Budget Settings, then configure your alert thresholds and notification preferences.',
      category: 'budgets'
    },
    {
      question: 'What does cost anomaly detection include?',
      answer: 'Our system monitors spending patterns and alerts you when costs exceed expected ranges based on historical data and trends.',
      category: 'monitoring'
    },
    {
      question: 'How often is cost data updated?',
      answer: 'Cost data is refreshed every 15 minutes from your cloud providers. You can also manually refresh data from any dashboard.',
      category: 'data'
    },
    {
      question: 'Can I export cost reports?',
      answer: 'Yes, all reports can be exported in PDF, CSV, or Excel formats. Look for the export button in the top-right of any report page.',
      category: 'reports'
    },
    {
      question: 'How do I connect multiple cloud providers?',
      answer: 'Go to Cloud Provider Connection Setup and follow the step-by-step wizard for each provider (AWS, Azure, GCP).',
      category: 'setup'
    }
  ];

  const contactOptions = [
    {
      type: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@finops-dashboard.com',
      icon: 'Mail'
    },
    {
      type: 'Live Chat',
      description: 'Chat with our support team (Mon-Fri 9AM-6PM EST)',
      contact: 'Start Chat',
      icon: 'MessageCircle'
    },
    {
      type: 'Phone Support',
      description: 'Call us for urgent issues (Business hours)',
      contact: '+1 (555) 123-HELP',
      icon: 'Phone'
    }
  ];

  const filteredFaq = faqData?.filter(item =>
    item?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Help & Support - FinOps Dashboard</title>
        <meta name="description" content="Get help and support for using the FinOps Dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-14 xl:ml-16' : 'ml-52 xl:ml-60'}`}>
          <div className="p-4 xl:p-8 max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 xl:mb-8">
              <div className="text-center">
                <h1 className="text-2xl xl:text-3xl font-bold text-foreground mb-2">Help & Support</h1>
                <p className="text-muted-foreground">
                  Find answers to common questions or get in touch with our support team
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6 mb-6 xl:mb-8">
              {contactOptions?.map((option, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 xl:p-6 text-center">
                  <Icon name={option?.icon} size={32} className="text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{option?.type}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option?.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {option?.contact}
                  </Button>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 mb-6 xl:mb-8 p-1 bg-muted rounded-lg w-fit">
              <Button
                variant={activeSection === 'faq' ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection('faq')}
              >
                <Icon name="HelpCircle" size={16} className="mr-2" />
                FAQ
              </Button>
              <Button
                variant={activeSection === 'guides' ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection('guides')}
              >
                <Icon name="BookOpen" size={16} className="mr-2" />
                User Guides
              </Button>
              <Button
                variant={activeSection === 'contact' ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection('contact')}
              >
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Contact Us
              </Button>
            </div>

            {/* Content Sections */}
            {activeSection === 'faq' && (
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <div className="mb-6">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      placeholder="Search frequently asked questions..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFaq?.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-card-foreground mb-2">{faq?.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq?.answer}</p>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {faq?.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'guides' && (
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
                  <div className="border border-border rounded-lg p-4">
                    <Icon name="PlayCircle" size={24} className="text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Getting Started</h3>
                    <p className="text-sm text-muted-foreground mb-4">Learn the basics of navigating and using the FinOps Dashboard</p>
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      View Guide
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <Icon name="Settings" size={24} className="text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Cloud Setup</h3>
                    <p className="text-sm text-muted-foreground mb-4">Step-by-step guide to connect your cloud providers</p>
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      View Guide
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <Icon name="BarChart3" size={24} className="text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Cost Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-4">Master cost analysis tools and reporting features</p>
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      View Guide
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <Icon name="Shield" size={24} className="text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Security & Permissions</h3>
                    <p className="text-sm text-muted-foreground mb-4">Understand role-based access and security features</p>
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      View Guide
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                    Send us a Message
                  </h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Full Name
                        </label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Email Address
                        </label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Subject
                      </label>
                      <Input placeholder="What is this regarding?" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        rows={6}
                        className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Please describe your issue or question in detail..."
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="default" size="lg">
                        <Icon name="Send" size={16} className="mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HelpSupport;