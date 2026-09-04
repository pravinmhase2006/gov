'use client';

import React, { useState } from 'react';
import { CalendarPlus, Check, ExternalLink } from 'lucide-react';

interface CalendarSyncButtonProps {
  title: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  description?: string;
  location?: string;
}

export default function CalendarSyncButton({
  title,
  startDate,
  endDate,
  description = 'Application deadline reminder via GovtPrep India (https://govtprep.in)',
  location = 'Online / India',
}: CalendarSyncButtonProps) {
  const [copied, setCopied] = useState(false);

  if (!endDate && !startDate) return null;

  const targetDate = new Date(endDate || startDate || new Date());
  // Format for Google Calendar: YYYYMMDDTHHMMSSZ
  const startStr = targetDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endStr = new Date(targetDate.getTime() + 60 * 60 * 1000)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '');

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `[DEADLINE] ${title}`
  )}&dates=${startStr}/${endStr}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}`;

  return (
    <a
      href={googleCalendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
      title="Add deadline to Google Calendar"
    >
      <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />
      <span>Add Deadline to Calendar</span>
    </a>
  );
}
