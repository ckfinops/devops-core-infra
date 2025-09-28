import React, { useState, useEffect } from 'react';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';
import { dynamoDBService } from '../../utils/dynamoDBService';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ProfileSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, user, loading, setUserProfile, updateCognitoAttributes } = useCognitoAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    location: '',
    timezone: ''
  });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.username) {
        const latestProfile = await dynamoDBService.getUserProfile(user.username);
        if (latestProfile) {
          setProfileData({
            firstName: latestProfile.firstName || '',
            lastName: latestProfile.lastName || '',
            email: latestProfile.email || '',
            phone: latestProfile.phone || '',
            department: latestProfile.department || '',
            role: latestProfile.role || '',
            location: latestProfile.location || '',
            timezone: latestProfile.timezone || ''
          });
          setUserProfile(latestProfile);
        }
      }
    };
    fetchProfile();
  }, [user, setUserProfile]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSaveProfile = async () => {
    setFeedback(null);
    if (!user?.username) {
      setFeedback('User not found.');
      return;
    }
    try {
      // Sync to Cognito attributes (only supported attributes)
      const cognitoAttrs = {
        email: profileData.email,
        phone_number: profileData.phone
      };
      await updateCognitoAttributes(cognitoAttrs);
      // Sync to DynamoDB
      const updated = await dynamoDBService.updateUserProfile(user.username, profileData);
      setUserProfile(updated); // update context
      setProfileData({
        firstName: updated.firstName || '',
        lastName: updated.lastName || '',
        email: updated.email || '',
        phone: updated.phone || '',
        department: updated.department || '',
        role: updated.role || '',
        location: updated.location || '',
        timezone: updated.timezone || ''
      });
      setIsEditing(false);
      setFeedback('Profile updated successfully.');
    } catch (err) {
      setFeedback('Error updating profile.');
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Profile Settings - FinOps Dashboard</title>
        <meta name="description" content="Manage your profile settings and personal information" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {feedback && (
          <div className={`p-3 mb-4 rounded ${feedback.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback}
          </div>
        )}
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-14 xl:ml-16' : 'ml-52 xl:ml-60'}`}>
          <div className="p-4 xl:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 xl:mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl xl:text-3xl font-bold text-foreground">Profile Settings</h1>
                  <p className="text-muted-foreground mt-1 xl:mt-2">
                    Manage your personal information and account settings
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 xl:space-x-3">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button variant="default" size="sm" onClick={handleSaveProfile}>
                        <Icon name="Save" size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button variant="default" size="sm" onClick={() => setIsEditing(true)}>
                      <Icon name="Edit" size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-card border border-border rounded-lg p-4 xl:p-6 mb-6 xl:mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-20 h-20 xl:w-24 xl:h-24 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl xl:text-3xl font-bold text-primary-foreground">
                    {profileData?.firstName?.[0]}{profileData?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl xl:text-2xl font-semibold text-card-foreground">
                    {profileData?.firstName} {profileData?.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profileData?.role}</p>
                  <p className="text-sm text-muted-foreground mt-1">{profileData?.department}</p>
                  <div className="flex items-center justify-center md:justify-start mt-2 space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Mail" size={14} className="mr-1" />
                      {profileData?.email}
                    </span>
                    <span className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {profileData?.location}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Camera" size={16} className="mr-2" />
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-card border border-border rounded-lg p-4 xl:p-6">
              <h3 className="text-lg xl:text-xl font-semibold text-card-foreground mb-4 xl:mb-6">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.firstName}
                      onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                      placeholder="Enter first name"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.lastName}
                      onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                      placeholder="Enter last name"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profileData?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      placeholder="Enter email address"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.phone}
                      onChange={(e) => handleInputChange('phone', e?.target?.value)}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Department
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.department}
                      onChange={(e) => handleInputChange('department', e?.target?.value)}
                      placeholder="Enter department"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.department}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Role
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.role}
                      onChange={(e) => handleInputChange('role', e?.target?.value)}
                      placeholder="Enter role"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.role}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.location}
                      onChange={(e) => handleInputChange('location', e?.target?.value)}
                      placeholder="Enter location"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.location}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Timezone
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData?.timezone}
                      onChange={(e) => handleInputChange('timezone', e?.target?.value)}
                      placeholder="Enter timezone"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg text-card-foreground">
                      {profileData?.timezone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettings;