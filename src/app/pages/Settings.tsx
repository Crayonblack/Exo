'use client';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { User, Bell, Shield, Database, Wifi, Download } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonCard } from '../components/Skeleton';

export default function Settings() {
  const isLoading = useLoadingState({ delay: 600 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonCard lines={6} />
        <SkeletonCard lines={5} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard lines={4} />
          <SkeletonCard lines={4} />
        </div>
        <SkeletonCard lines={3} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Account Settings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Manage your profile and preferences</p>
          </div>
          <Button variant="secondary" size="small" className="self-start sm:self-auto">Edit Profile</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <div className="text-base font-medium">John Doe</div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <div className="text-base font-medium">john.doe@example.com</div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Location</label>
            <div className="text-base font-medium">San Francisco, CA</div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Time Zone</label>
            <div className="text-base font-medium">PST (UTC-8)</div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Notifications</h3>
            <p className="text-sm text-muted-foreground">Configure alert preferences</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Email notifications', enabled: true },
            { name: 'Push notifications', enabled: true },
            { name: 'SMS alerts', enabled: false },
            { name: 'Weekly reports', enabled: true },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <span className="text-sm font-medium">{item.name}</span>
              <button className={`w-12 h-6 rounded-full transition-colors ${
                item.enabled ? 'bg-success' : 'bg-muted'
              } relative`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* System Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="gradient" className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Security</h3>
              <p className="text-xs text-muted-foreground">Account protection</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              Two-Factor Authentication
              <Badge variant="success" size="small" className="ml-auto">Active</Badge>
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              Active Sessions
            </Button>
          </div>
        </Card>

        <Card variant="gradient" className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Connectivity</h3>
              <p className="text-xs text-muted-foreground">Device connections</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
              <div>
                <div className="text-sm font-medium">WiFi</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
              <Badge variant="success" showDot size="small">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
              <div>
                <div className="text-sm font-medium">Cloud Sync</div>
                <div className="text-xs text-muted-foreground">Last sync: 2 min ago</div>
              </div>
              <Badge variant="success" showDot size="small">Active</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Data & Privacy */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Data & Privacy</h3>
            <p className="text-sm text-muted-foreground">Manage your data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="secondary" className="w-full">
            Clear Cache
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
