'use client';

import { Card } from '../components/core/Card';
import { Badge } from '../components/core/Badge';
import { ProgressBar } from '../components/core/ProgressBar';
import { AnimatedNumber } from '../components/core/AnimatedNumber';
import { Activity, Battery, Sun, Zap, Cpu, HardDrive, Thermometer, Wifi } from 'lucide-react';
import { useLoadingState } from '../hooks/useLoadingState';
import { Skeleton, SkeletonStatGrid, SkeletonCard } from '../components/core/Skeleton';

export default function SystemHealth() {
  const isLoading = useLoadingState({ delay: 700 });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonStatGrid count={4} />
        <Card variant="gradient" className="p-4 sm:p-6">
          <Skeleton className="h-7 w-48 mb-6" />
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
        </Card>
        <Card variant="gradient" className="p-4 sm:p-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard lines={3} />
            <SkeletonCard lines={3} />
            <SkeletonCard lines={3} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success/10 text-success flex items-center justify-center shadow-success-glow">
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
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-info/10 text-info shadow-solar-glow">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xl font-bold"><AnimatedNumber value={127} suffix=" days" /></div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-warning/10 text-warning shadow-warning-glow">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Temperature</div>
              <div className="text-xl font-bold"><AnimatedNumber value={42} suffix="°C" /></div>
            </div>
          </div>
        </Card>
        <Card variant="gradient" glow className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-success/10 text-success shadow-success-glow">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Connectivity</div>
              <div className="text-xl font-bold text-success">Online</div>
            </div>
          </div>
        </Card>
      </div>

      <Card variant="gradient" className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Component Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-solar flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Solar Inverter</span>
                  <Badge variant="success" showDot size="small">Optimal</Badge>
                </div>
                <ProgressBar value={98} color="solar" delay={0} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Efficiency: <AnimatedNumber value={98} suffix="%" /></span>
                  <span>Temp: <AnimatedNumber value={38} suffix="°C" /></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-battery flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery System</span>
                  <Badge variant="success" showDot size="small">Healthy</Badge>
                </div>
                <ProgressBar value={94} color="battery" delay={150} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Health: <AnimatedNumber value={94} suffix="%" /></span>
                  <span>Cycles: <AnimatedNumber value={342} /></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-grid-import flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Grid Connection</span>
                  <Badge variant="success" showDot size="small">Stable</Badge>
                </div>
                <ProgressBar value={100} color="grid-import" delay={300} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Voltage: <AnimatedNumber value={240} suffix="V" /></span>
                  <span>Frequency: <AnimatedNumber value={60} suffix="Hz" /></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-load flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monitoring System</span>
                  <Badge variant="success" showDot size="small">Active</Badge>
                </div>
                <ProgressBar value={100} color="load" delay={450} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>CPU: <AnimatedNumber value={12} suffix="%" /></span>
                  <span>Memory: <AnimatedNumber value={28} suffix="%" /></span>
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
                    <span className="font-medium"><AnimatedNumber value={99.8} decimals={1} suffix="%" /></span>
                  </div>
                  <ProgressBar value={99.8} size="small" color="success" delay={0} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium"><AnimatedNumber value={12} suffix="ms" /></span>
                  </div>
                  <ProgressBar value={95} size="small" color="info" delay={150} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium"><AnimatedNumber value={99.99} decimals={2} suffix="%" /></span>
                  </div>
                  <ProgressBar value={99.99} size="small" color="success" delay={300} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <Card variant="gradient" className="p-4 sm:p-6">
        <h3 className="font-semibold mb-4 text-base">System Diagnostics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Storage</span>
            </div>
            <div className="text-2xl font-bold mb-1"><AnimatedNumber value={2.8} decimals={1} suffix=" GB" /></div>
            <div className="text-xs text-muted-foreground"><AnimatedNumber value={42} suffix="%" /> of 6.5 GB used</div>
            <ProgressBar value={42} size="small" color="primary" className="mt-2" delay={0} />
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div className="text-2xl font-bold mb-1"><AnimatedNumber value={12} suffix="%" /></div>
            <div className="text-xs text-muted-foreground">Average CPU load</div>
            <ProgressBar value={12} size="small" color="success" className="mt-2" delay={150} />
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <div className="text-2xl font-bold mb-1"><AnimatedNumber value={45} suffix=" ms" /></div>
            <div className="text-xs text-muted-foreground">Average latency</div>
            <ProgressBar value={88} size="small" color="info" className="mt-2" delay={300} />
          </div>
        </div>
      </Card>
    </div>
  );
}
