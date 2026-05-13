'use client';

import { Card } from './Card';
import { Badge } from './Badge';
import { cn } from '../utils/cn';
import { Activity, Battery, Sun, Zap } from 'lucide-react';

interface StatusItem {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  icon: React.ReactNode;
}

interface SystemStatusProps {
  className?: string;
}

const statusItems: StatusItem[] = [
  {
    name: 'Solar Panels',
    status: 'success',
    message: 'Operating normally',
    icon: <Sun className="w-4 h-4" />,
  },
  {
    name: 'Battery System',
    status: 'success',
    message: 'Charging at optimal rate',
    icon: <Battery className="w-4 h-4" />,
  },
  {
    name: 'Grid Connection',
    status: 'success',
    message: 'Connected',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    name: 'Inverter',
    status: 'success',
    message: 'Running efficiently',
    icon: <Activity className="w-4 h-4" />,
  },
];

export function SystemStatus({ className }: SystemStatusProps) {
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <h3 className="font-semibold mb-4 sm:mb-6 text-base">System Status</h3>
      <div className="space-y-3 sm:space-y-4">
        {statusItems.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
              <div className="text-xs text-muted-foreground truncate">{item.message}</div>
            </div>
            <Badge variant={item.status} showDot size="small" className="flex-shrink-0">
              <span className="hidden sm:inline">{item.status === 'success' ? 'Online' : item.status === 'warning' ? 'Warning' : 'Error'}</span>
              <span className="sm:hidden">•</span>
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
