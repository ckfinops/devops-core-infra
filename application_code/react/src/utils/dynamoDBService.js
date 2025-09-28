// Using AWS Amplify instead of aws-sdk for browser compatibility
// Note: This is a demo implementation for Rocket platform
// In production, replace with actual AWS Amplify configuration

// Demo service simulating DynamoDB operations
// This avoids the AWS SDK v2 browser compatibility issues

const TABLE_NAME = 'finops-users';

// Demo data removed. The service starts with an empty in-memory store.
const demoUserProfiles = new Map();

export const dynamoDBService = {
  // Create user profile in DynamoDB
  async createUserProfile(userData) {
    // Simulate DynamoDB put operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userProfile = {
      username: userData?.username,
      email: userData?.email,
      cognitoSub: userData?.cognitoSub,
      role: userData?.role || 'Read Only',
      company: userData?.company || null,
      department: userData?.department || null,
      status: userData?.status || 'active',
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString(),
      ...userData
    };

    try {
      demoUserProfiles?.set(userData?.username, userProfile);
      console.log('Demo: User profile created:', userProfile?.username);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Get user profile by username
  async getUserProfile(username) {
    // Simulate DynamoDB get operation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const userProfile = demoUserProfiles?.get(username);
      console.log('Demo: User profile fetched:', username, userProfile ? 'found' : 'not found');
      return userProfile || null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(username, updates) {
    // Simulate DynamoDB update operation
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const existingProfile = demoUserProfiles?.get(username);
      if (!existingProfile) {
        throw new Error('User profile not found');
      }

      const updatedProfile = {
        ...existingProfile,
        ...updates,
        updatedAt: new Date()?.toISOString()
      };

      demoUserProfiles?.set(username, updatedProfile);
      console.log('Demo: User profile updated:', username);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // List all users with pagination
  async listUsers(limit = 50, lastEvaluatedKey = null) {
    // Simulate DynamoDB scan operation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const allUsers = Array.from(demoUserProfiles?.values());
      const startIndex = lastEvaluatedKey ? parseInt(lastEvaluatedKey) : 0;
      const endIndex = Math.min(startIndex + limit, allUsers?.length);
      const users = allUsers?.slice(startIndex, endIndex);
      
      const hasMore = endIndex < allUsers?.length;
      const nextKey = hasMore ? endIndex?.toString() : null;
      
      console.log('Demo: Users listed:', users?.length, 'of', allUsers?.length);
      return {
        users: users,
        lastEvaluatedKey: nextKey,
        hasMore: hasMore
      };
    } catch (error) {
      console.error('Error listing users:', error);
      throw error;
    }
  },

  // Get users by role
  async getUsersByRole(role) {
    // Simulate DynamoDB query with filter
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const allUsers = Array.from(demoUserProfiles?.values());
      const filteredUsers = allUsers?.filter(user => user?.role === role);
      
      console.log('Demo: Users by role fetched:', role, filteredUsers?.length);
      return filteredUsers;
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw error;
    }
  },

  // Get users by company
  async getUsersByCompany(company) {
    // Simulate DynamoDB query with filter
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const allUsers = Array.from(demoUserProfiles?.values());
      const filteredUsers = allUsers?.filter(user => user?.company === company);
      
      console.log('Demo: Users by company fetched:', company, filteredUsers?.length);
      return filteredUsers;
    } catch (error) {
      console.error('Error fetching users by company:', error);
      throw error;
    }
  },

  // Delete user profile
  async deleteUserProfile(username) {
    // Simulate DynamoDB delete operation
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const existed = demoUserProfiles?.has(username);
      demoUserProfiles?.delete(username);
      
      console.log('Demo: User profile deleted:', username, existed ? 'existed' : 'not found');
      return { success: true };
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  },

  // Bulk create users (for client onboarding)
  async bulkCreateUsers(users) {
    // Simulate DynamoDB batch write operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const results = [];
      
      for (const user of users) {
        const userProfile = {
          ...user,
          createdAt: new Date()?.toISOString(),
          updatedAt: new Date()?.toISOString()
        };
        
        demoUserProfiles?.set(user?.username, userProfile);
        results?.push({ success: true, user: userProfile });
      }
      
      console.log('Demo: Bulk users created:', users?.length);
      return results;
    } catch (error) {
      console.error('Error in bulk user creation:', error);
      throw error;
    }
  }
};

// Backwards-compatible alias: some files import { dynamoService }
export const dynamoService = dynamoDBService;