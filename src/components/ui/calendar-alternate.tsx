"use client";

import * as React from "react";
import DatePicker, {
  registerLocale,
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "react-datepicker/dist/react-datepicker.css";

// Enregistrement de la locale française
registerLocale("fr", fr);

export interface CalendarAlternateProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  enabledDays?: Date[];
  isFetching?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function CalendarAlternate({
  selected,
  onSelect,
  disabled,
  enabledDays = [],
  isFetching = false,
  fullWidth = false,
  className,
}: CalendarAlternateProps) {
  // Fonction qui vérifie si un jour est activé
  const isEnabled = React.useCallback(
    (date: Date) => {
      if (enabledDays.length === 0) return true;

      // Vérifie si la date est dans les jours activés
      return enabledDays.some(
        (enabledDay) =>
          enabledDay.getDate() === date.getDate() &&
          enabledDay.getMonth() === date.getMonth() &&
          enabledDay.getFullYear() === date.getFullYear()
      );
    },
    [enabledDays]
  );

  // Filtre qui combine la fonction disabled et la vérification des jours activés
  const filterDate = React.useCallback(
    (date: Date) => {
      if (disabled && disabled(date)) {
        return false;
      }
      return isEnabled(date);
    },
    [disabled, isEnabled]
  );

  // Rendu du jour personnalisé
  const renderDayContents = (day: number, date: Date) => {
    const isAvailable = isEnabled(date);

    return (
      <div
        className={cn(
          "relative flex items-center justify-center w-full h-full",
          isAvailable
            ? "after:absolute after:bottom-0 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full"
            : ""
        )}
      >
        {day}
      </div>
    );
  };

  // Rendu de l'en-tête personnalisé pour les jours de la semaine
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
      <Button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <span className="sr-only">Mois précédent</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Button>

      <h2 className="text-base font-medium text-neutral-900 dark:text-white">
        {format(date, "MMMM yyyy", { locale: fr })}
      </h2>

      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <span className="sr-only">Mois suivant</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Button>
    </div>
  );

  return (
    <div
      className={cn("relative", isFetching && "opacity-50 pointer-events-none")}
    >
      {isFetching && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 rounded-lg backdrop-blur-sm z-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      )}

      <div
        className={cn(
          "p-2 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm",
          fullWidth ? "w-full" : "w-auto",
          className
        )}
      >
        <DatePicker
          selected={selected}
          onChange={(date: Date | null) => date && onSelect && onSelect(date)}
          inline
          locale="fr"
          filterDate={filterDate}
          renderDayContents={renderDayContents}
          renderCustomHeader={renderCustomHeader}
          dayClassName={(date) =>
            cn(
              "text-base font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20",
              selected &&
                date.getTime() === selected.getTime() &&
                "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
              date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear() &&
                "bg-neutral-100 dark:bg-neutral-800 border border-blue-400 dark:border-blue-500 font-medium"
            )
          }
          calendarClassName="!bg-transparent border-none !font-sans max-w-full"
          weekDayClassName={() =>
            "text-sm font-medium text-neutral-500 dark:text-neutral-400"
          }
        />
      </div>

      {/* Légende */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span>Jours disponibles</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full border border-blue-400"></div>
          <span>Aujourd&apos;hui</span>
        </div>
      </div>

      <style jsx global>{`
        /* Personnalisation du calendrier */
        .react-datepicker {
          font-family: inherit;
          border: none;
        }

        .react-datepicker__month-container {
          width: 100%;
        }

        .react-datepicker__day-names,
        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
        }

        .react-datepicker__day-name {
          width: 44px;
          margin: 0;
          padding: 10px 0;
          text-align: center;
          text-transform: uppercase;
        }

        .react-datepicker__day {
          width: 44px;
          height: 44px;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          line-height: 44px;
          transition: all 0.15s ease;
        }

        .react-datepicker__day:focus {
          outline: none;
        }

        .react-datepicker__day--disabled {
          color: var(--tw-color-neutral-400);
          cursor: not-allowed;
        }

        .react-datepicker__day--outside-month {
          opacity: 0.5;
        }

        /* Mode sombre */
        .dark .react-datepicker {
          background-color: transparent;
          color: white;
        }

        .dark .react-datepicker__day {
          color: #e5e7eb; /* text-gray-200 */
        }

        .dark .react-datepicker__day--disabled {
          color: #6b7280; /* text-gray-500 */
        }

        .dark .react-datepicker__day:hover {
          background-color: rgba(59, 130, 246, 0.2); /* bg-blue-500/20 */
        }

        .dark .react-datepicker__day--selected {
          background-color: #2563eb; /* bg-blue-600 */
          color: white;
        }

        .dark .react-datepicker__day--keyboard-selected {
          background-color: #3b82f6; /* bg-blue-500 */
          color: white;
        }
      `}</style>
    </div>
  );
}
