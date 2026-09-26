import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import type { ComponentProps, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type RdpThemeVars = CSSProperties & {
  '--rdp-accent-color'?: string;
  '--rdp-accent-background-color'?: string;
};

function Calendar({
  className,
  style,
  ...props
}: ComponentProps<typeof DayPicker>) {
  const themeStyle: RdpThemeVars = {
    // Matches the default DayPicker stylesheet's theming hooks to the
    // app's brand accent instead of the library's default blue.
    '--rdp-accent-color': 'var(--accent)',
    '--rdp-accent-background-color': 'var(--accent-bg)',
    ...style,
  };

  return (
    <DayPicker
      data-slot="calendar"
      className={cn('p-3', className)}
      style={themeStyle}
      {...props}
    />
  );
}

export { Calendar };
