import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { type SeverityCount, type SeverityDistribution } from '@/types/services-data-types'

function SeverityChart({
  severityDistribution,
  severityCount,
}: {
  severityDistribution: SeverityDistribution
  severityCount: SeverityCount
}) {
  if (!Object.keys(severityDistribution).length) return null

  const chartData = Object.entries(severityDistribution).map(([key, value]) => ({
    name: key,
    value,
    severity: key,
    label: key,
    count: severityCount[key as keyof SeverityCount],
  }))

  const chartConfig = {
    high: {
      label: 'High',
      color: 'hsl(0, 84%, 60%)', // Red
    },
    medium: {
      label: 'Medium',
      color: 'hsl(25, 95%, 53%)', // Orange
    },
    low: {
      label: 'Low',
      color: 'hsl(45, 93%, 47%)', // Yellow
    },
    info: {
      label: 'Info',
      color: 'hsl(217, 91%, 60%)', // Blue
    },
  }

  const COLORS = {
    high: chartConfig.high.color,
    medium: chartConfig.medium.color,
    low: chartConfig.low.color,
    info: chartConfig.info.color,
  }

  return (
    <div className='space-y-4 max-w-xl flex items-center'>
      <div className='mt-6 grid gap-4'>
        {chartData.map((item) => (
          <Card key={item.severity}>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold'>{item.count}</div>
              <div className='text-sm text-muted-foreground capitalize flex items-center justify-center gap-1'>
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.severity === 'high'
                      ? 'bg-red-500'
                      : item.severity === 'medium'
                        ? 'bg-orange-500'
                        : item.severity === 'low'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                  }`}
                />
                {item.severity}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChartContainer className='h-[200px]' config={chartConfig}>
        <ResponsiveContainer height='100%' width='100%'>
          <PieChart>
            <Pie
              cx='50%'
              cy='50%'
              data={chartData}
              dataKey='value'
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell
                  fill={COLORS[entry.severity as keyof typeof COLORS]}
                  key={`cell-${entry.severity}`}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

export default SeverityChart
