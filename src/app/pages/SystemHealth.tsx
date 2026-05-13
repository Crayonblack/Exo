'use client';

import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Activity, Battery, Sun, Zap, Cpu, HardDrive, Thermometer, Wifi } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { SkeletonStatGrid, SkeletonCard } from '../components/Skeleton';

export default function SystemHealth() {
  const isLoading = useLoadingState({ delay: 700 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
          </div>
          <div className="space-y-4">
            <SkeletonCard lines={4} />
            <SkeletonCard lines={5} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success/10 text-success flex items-center justify-center dark:shadow-[0_0_16px_rgba(16,185,129,0.3)] shadow-[0_0_16px_rgba(16,185,129,0.6)]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">System Status</div>
              <div className="text-xl font-bold text-success">Healthy</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-info/10 text-info dark:shadow-[0_0_16px_rgba(0,229,255,0.3)] shadow-[0_0_16px_rgba(0,168,201,0.6)]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xl font-bold">127 days</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-warning/10 text-warning dark:shadow-[0_0_16px_rgba(245,158,11,0.3)] shadow-[0_0_16px_rgba(230,138,0,0.6)]">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Temperature</div>
              <div className="text-xl font-bold">42°C</div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-success/10 text-success dark:shadow-[0_0_16px_rgba(16,185,129,0.3)] shadow-[0_0_16px_rgba(16,185,129,0.6)]">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Connectivity</div>
              <div className="text-xl font-bold text-success">Online</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Component Health */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Component Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-data-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Solar Inverter</span>
                  <Badge variant="success" showDot size="small">Optimal</Badge>
                </div>
                <ProgressBar value={98} color="solar" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Efficiency: 98%</span>
                  <span>Temp: 38°C</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-data-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery System</span>
                  <Badge variant="success" showDot size="small">Healthy</Badge>
                </div>
                <ProgressBar value={94} color="battery" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Health: 94%</span>
                  <span>Cycles: 342</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-data-grid-import flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Grid Connection</span>
                  <Badge variant="success" showDot size="small">Stable</Badge>
                </div>
                <ProgressBar value={100} color="grid-import" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Voltage: 240V</span>
                  <span>Frequency: 60Hz</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-data-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monitoring System</span>
                  <Badge variant="success" showDot size="small">Active</Badge>
                </div>
                <ProgressBar value={100} color="load" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>CPU: 12%</span>
                  <span>Memory: 28%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-accent/20">
              <h4 className="font-semibold text-sm mb-3">Recent Events</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last maintenance</span>
                  <span>15 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last firmware update</span>
                  <span>32 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last system reboot</span>
                  <span>127 days ago</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-accent/20">
              <h4 className="font-semibold text-sm mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Data Accuracy</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                  <ProgressBar value={99.8} size="small" color="success" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">12ms</span>
                  </div>
                  <ProgressBar value={95} size="small" color="info" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">99.99%</span>
                  </div>
                  <ProgressBar value={99.99} size="small" color="success" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Diagnostics */}
      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-4 text-base">System Diagnostics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Storage</span>
            </div>
            <div className="text-2xl font-bold mb-1">2.8 GB</div>
            <div className="text-xs text-muted-foreground">42% of 6.5 GB used</div>
            <ProgressBar value={42} size="small" color="primary" className="mt-2" />
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div className="text-2xl font-bold mb-1">12%</div>
            <div className="text-xs text-muted-foreground">Average CPU load</div>
            <ProgressBar value={12} size="small" color="success" className="mt-2" />
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <div className="text-2xl font-bold mb-1">45 ms</div>
            <div className="text-xs text-muted-foreground">Average latency</div>
            <ProgressBar value={88} size="small" color="info" className="mt-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}
