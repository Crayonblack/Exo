'use client';

import { Card } from '../components/core/Card';
import { Badge } from '../components/core/Badge';
import { Button } from '../components/core/Button';
import { AlertCircle, Info, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonStatGrid, SkeletonTable, SkeletonCard } from '../components/core/Skeleton';

const alerts = [
  {
    id: 1,
    type: 'error' as const,
    title: 'High Power Consumption Detected',
    message: 'Current load exceeds normal threshold by 45%. Check HVAC system.',
    time: '5 minutes ago',
    device: 'HVAC System',
    value: '7.2 kW',
  },
  {
    id: 2,
    type: 'warning' as const,
    title: 'Battery Level Low',
    message: 'Battery state of charge dropped below 20%. Consider reducing non-essential loads.',
    time: '15 minutes ago',
    device: 'Battery Bank',
    value: '18%',
  },
  {
    id: 3,
    type: 'info' as const,
    title: 'Peak Usage Period Starting',
    message: 'Entering peak rate period (2:00 PM - 8:00 PM). Grid import costs will increase.',
    time: '1 hour ago',
    device: 'Grid Monitor',
    value: '$0.32/kWh',
  },
  {
    id: 4,
    type: 'info' as const,
    title: 'Solar Production Optimal',
    message: 'Solar generation exceeding consumption. Excess energy stored in battery.',
    time: '2 hours ago',
    device: 'Solar Array',
    value: '5.8 kW',
  },
  {
    id: 5,
    type: 'warning' as const,
    title: 'Grid Connection Fluctuation',
    message: 'Grid voltage variance detected. System switched to battery backup.',
    time: '3 hours ago',
    device: 'Grid Inverter',
    value: '237V',
  },
];

const alertSettings = [
  { name: 'High consumption alerts', enabled: true, threshold: '> 6 kW' },
  { name: 'Low battery warnings', enabled: true, threshold: '< 20%' },
  { name: 'Peak rate notifications', enabled: true, threshold: 'Rate changes' },
  { name: 'System health checks', enabled: true, threshold: 'Daily' },
  { name: 'Maintenance reminders', enabled: false, threshold: 'Monthly' },
];

export default function Alerts() {
  const isLoading = useLoadingState({ delay: 750 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <SkeletonTable rows={5} />
        <SkeletonCard lines={6} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-error/10 text-error flex items-center justify-center shadow-error-glow">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Critical</div>
              <div className="text-xl font-bold text-error">1</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-warning/10 text-warning flex items-center justify-center shadow-warning-glow">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Warnings</div>
              <div className="text-xl font-bold text-warning">2</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-info/10 text-info flex items-center justify-center shadow-solar-glow">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Info</div>
              <div className="text-xl font-bold text-info">2</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success/10 text-success flex items-center justify-center shadow-success-glow">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Resolved Today</div>
              <div className="text-xl font-bold text-success">12</div>
            </div>
          </div>
        </Card>
      </div>

      <Card variant="gradient" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Active Alerts</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Real-time system notifications</p>
          </div>
          <Button variant="secondary" size="small" className="self-start">
            <Settings className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Configure</span>
          </Button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border hover:bg-accent/30 transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                alert.type === 'error' ? 'bg-error/10 text-error' :
                alert.type === 'warning' ? 'bg-warning/10 text-warning' :
                'bg-info/10 text-info'
              }`}>
                {alert.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                 alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <div className="font-medium text-sm text-foreground">{alert.title}</div>
                  <Badge variant={alert.type} size="small">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                  <span className="truncate">{alert.device}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium">{alert.value}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <Button variant="ghost" size="small" className="hidden sm:flex">Dismiss</Button>
                <Button variant="secondary" size="small">
                  <span className="hidden sm:inline">Details</span>
                  <span className="sm:hidden">•••</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-6 text-base">Alert Settings</h3>
        <div className="space-y-4">
          {alertSettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">{setting.name}</div>
                <div className="text-xs text-muted-foreground">Threshold: {setting.threshold}</div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={setting.enabled ? 'success' : 'neutral'} size="small">
                  {setting.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <button className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  setting.enabled ? 'bg-success' : 'bg-muted'
                } relative`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
