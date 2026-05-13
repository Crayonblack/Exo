'use client';

import { Card } from './Card';
import { Badge } from './Badge';
import { cn } from '../utils/cn';
import { AlertCircle, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
}

interface ActiveAlertsProps {
  className?: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'info',
    title: 'Peak Usage Alert',
    message: 'Approaching peak usage hours (2:00 PM - 6:00 PM)',
    time: '10 min ago',
  },
  {
    id: '2',
    type: 'info',
    title: 'Battery Optimization',
    message: 'Battery charge level optimal for evening usage',
    time: '1 hour ago',
  },
];

export function ActiveAlerts({ className }: ActiveAlertsProps) {
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <h3 className="font-semibold mb-4 sm:mb-6 text-base">Active Alerts</h3>
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No active alerts</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-2 sm:gap-3">
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                alert.type === 'error' && 'bg-error/10 text-error',
                alert.type === 'warning' && 'bg-warning/10 text-warning',
                alert.type === 'info' && 'bg-info/10 text-info'
              )}>
                <Info className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-start gap-2">
                  <div className="font-medium text-sm text-foreground flex-1 min-w-0">{alert.title}</div>
                  <Badge variant={alert.type} size="small" className="flex-shrink-0">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground opacity-60">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
