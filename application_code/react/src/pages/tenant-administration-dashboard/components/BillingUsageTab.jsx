import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { DollarSign, TrendingUp, AlertTriangle, CreditCard, Download } from 'lucide-react';

const BillingUsageTab = ({ tenantId }) => {
  const [timeRange, setTimeRange] = useState('current-month');

  // Mock billing data
  const billingData = {
    currentMonth: {
      totalSpend: 24567,
      budgetLimit: 30000,
      utilizationPercent: 82,
      overageCharges: 0,
      projectedSpend: 27400
    },
    breakdown: [
      { service: 'AWS EC2', cost: 8540, percentage: 35, trend: '+12%' },
      { service: 'AWS RDS', cost: 4230, percentage: 17, trend: '+5%' },
      { service: 'Azure Virtual Machines', cost: 3870, percentage: 16, trend: '-3%' },
      { service: 'GCP Compute Engine', cost: 2890, percentage: 12, trend: '+18%' },
      { service: 'AWS S3', cost: 1856, percentage: 8, trend: '+2%' },
      { service: 'Other Services', cost: 3181, percentage: 12, trend: '+8%' }
    ],
    subscriptionDetails: {
      plan: 'Enterprise',
      userLimit: 100,
      currentUsers: 45,
      nextBillingDate: '2025-02-01',
      paymentMethod: '**** 4532',
      status: 'Active'
    }
  };

  const timeRangeOptions = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'ytd', label: 'Year to Date' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getUtilizationColor = (percent) => {
    if (percent >= 90) return 'text-red-600';
    if (percent >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBudgetBarColor = (percent) => {
    if (percent >= 90) return 'bg-red-500';
    if (percent >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Billing & Usage</h2>
          <p className="text-sm text-gray-600">Track subscription utilization and payment status</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-48"
          />
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>
      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Spend</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(billingData?.currentMonth?.totalSpend)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            of {formatCurrency(billingData?.currentMonth?.budgetLimit)} budget
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
              <p className={`text-2xl font-bold ${getUtilizationColor(billingData?.currentMonth?.utilizationPercent)}`}>
                {billingData?.currentMonth?.utilizationPercent}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getBudgetBarColor(billingData?.currentMonth?.utilizationPercent)}`}
                style={{ width: `${billingData?.currentMonth?.utilizationPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projected Spend</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(billingData?.currentMonth?.projectedSpend)}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            End of month projection
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overage Charges</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(billingData?.currentMonth?.overageCharges)}</p>
            </div>
            <CreditCard className="h-8 w-8 text-gray-500" />
          </div>
          <div className="mt-2 text-sm text-green-600">
            No overages this month
          </div>
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown by Service</h3>
        <div className="space-y-4">
          {billingData?.breakdown?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-medium text-gray-900">{item?.service}</div>
                  <div className="text-sm text-gray-500">{item?.percentage}% of total spend</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium text-gray-900">{formatCurrency(item?.cost)}</div>
                  <div className={`text-sm ${item?.trend?.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {item?.trend}
                  </div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item?.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Subscription Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Plan</span>
              <span className="text-sm font-medium text-gray-900">{billingData?.subscriptionDetails?.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">User Limit</span>
              <span className="text-sm font-medium text-gray-900">{billingData?.subscriptionDetails?.userLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Users</span>
              <span className="text-sm font-medium text-gray-900">{billingData?.subscriptionDetails?.currentUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Billing</span>
              <span className="text-sm font-medium text-gray-900">{billingData?.subscriptionDetails?.nextBillingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="text-sm font-medium text-gray-900">{billingData?.subscriptionDetails?.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {billingData?.subscriptionDetails?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Analytics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>User Capacity</span>
                <span>{billingData?.subscriptionDetails?.currentUsers}/{billingData?.subscriptionDetails?.userLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(billingData?.subscriptionDetails?.currentUsers / billingData?.subscriptionDetails?.userLimit) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Budget Usage</span>
                <span>{billingData?.currentMonth?.utilizationPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getBudgetBarColor(billingData?.currentMonth?.utilizationPercent)}`}
                  style={{ width: `${billingData?.currentMonth?.utilizationPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4">
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingUsageTab;