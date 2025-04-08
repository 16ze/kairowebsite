"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Check,
  Clock,
  CalendarRange,
  User,
  Mail,
  Phone,
  MessageSquare,
  Video,
  ChevronLeft,
  ArrowRight,
  X,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarAlternate } from "@/components/ui/calendar-alternate";

// Types pour le formulaire
type FormData = {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
  communicationMethod: "VISIO" | "PHONE";
  reservationType: "DISCOVERY" | "CONSULTATION" | "PRESENTATION" | "FOLLOWUP";
  startTime: Date;
  endTime: Date;
};

// Types de réservation disponibles
const reservationTypes = [
  {
    id: "DISCOVERY",
    label: "Découverte",
    description: "Premier contact pour discuter de votre projet",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    id: "CONSULTATION",
    label: "Consultation",
    description: "Conseils stratégiques sur un projet existant",
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    id: "PRESENTATION",
    label: "Présentation",
    description: "Présentation de solutions ou de propositions",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "FOLLOWUP",
    label: "Suivi",
    description: "Point d'avancement sur un projet en cours",
    icon: <CalendarRange className="w-4 h-4" />,
  },
];

// États du formulaire de réservation
enum BookingStep {
  SELECT_DATE = 0,
  SELECT_TIME = 1,
  FILL_DETAILS = 2,
  CONFIRMATION = 3,
}

export default function BookingForm() {
  // État pour suivre l'étape actuelle du formulaire
  const [step, setStep] = useState<BookingStep>(BookingStep.SELECT_DATE);

  // État pour stocker la date sélectionnée
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // État pour stocker le créneau sélectionné
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  // État pour stocker les créneaux disponibles
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    Array<{
      start: Date;
      end: Date;
    }>
  >([]);

  // État pour les jours disponibles dans le calendrier
  const [availableDays, setAvailableDays] = useState<Date[]>([]);

  // État pour gérer le chargement des données
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      communicationMethod: "VISIO",
      reservationType: "DISCOVERY",
    },
  });

  // Valeurs actuelles du formulaire
  const communicationMethod = watch("communicationMethod");
  const reservationType = watch("reservationType");

  // Effet pour charger les dates disponibles au chargement
  useEffect(() => {
    loadAvailableDays();
  }, []);

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    setStep((prevStep) =>
      prevStep < BookingStep.CONFIRMATION ? prevStep + 1 : prevStep
    );
  };

  // Fonction pour revenir à l'étape précédente
  const prevStep = () => {
    setStep((prevStep) =>
      prevStep > BookingStep.SELECT_DATE ? prevStep - 1 : prevStep
    );
  };

  // Fonction pour charger les jours disponibles
  const loadAvailableDays = async () => {
    setIsCalendarLoading(true);
    try {
      // Simulation: les 30 prochains jours ouvrés (lundi-vendredi)
      const days: Date[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 1; i <= 30; i++) {
        const date = addDays(today, i);
        const day = date.getDay();
        // Exclure les weekends (0 = dimanche, 6 = samedi)
        if (day !== 0 && day !== 6) {
          days.push(date);
        }
      }

      setAvailableDays(days);
    } catch (error) {
      console.error("Erreur lors du chargement des jours disponibles:", error);
      toast.error(
        "Impossible de charger les dates disponibles. Veuillez réessayer."
      );
    } finally {
      setIsCalendarLoading(false);
    }
  };

  // Fonction pour charger les créneaux disponibles
  const loadAvailableTimeSlots = async (date: Date) => {
    setIsLoading(true);
    try {
      // Dans un premier temps, nous simulons les données
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simuler des créneaux disponibles pour la journée
      const slots = [];
      const startHour = 9; // 9h du matin
      const endHour = 18; // 18h du soir

      for (let hour = startHour; hour < endHour; hour++) {
        // Créneaux de 30 minutes
        for (const minute of [0, 30]) {
          const start = new Date(date);
          start.setHours(hour, minute, 0, 0);

          const end = new Date(start);
          end.setMinutes(start.getMinutes() + 30);

          // Ne pas ajouter de créneaux dans le passé
          if (start > new Date()) {
            slots.push({ start, end });
          }
        }
      }

      setAvailableTimeSlots(slots);
    } catch (error) {
      console.error("Erreur lors du chargement des créneaux:", error);
      toast.error(
        "Impossible de charger les créneaux disponibles. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction appelée lors de la sélection d'une date
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      loadAvailableTimeSlots(date);
      nextStep();
    }
  };

  // Fonction appelée lors de la sélection d'un créneau
  const handleTimeSlotSelect = (slot: { start: Date; end: Date }) => {
    setSelectedTimeSlot(slot);
    setValue("startTime", slot.start);
    setValue("endTime", slot.end);
    nextStep();
  };

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (!selectedTimeSlot) {
        throw new Error("Aucun créneau sélectionné");
      }

      // En environnement de développement, on peut utiliser une adresse email de test
      const clientEmail =
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_TEST_EMAIL
          ? process.env.NEXT_PUBLIC_TEST_EMAIL
          : data.clientEmail;

      // Combiner les données du formulaire avec le créneau sélectionné
      const formData = {
        ...data,
        clientEmail,
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
        userId: "admin-user-id", // À remplacer par l'ID réel de l'administrateur
        projectDescription:
          data.projectDescription || "Pas de description fournie",
      };

      // Appel à l'API pour créer la réservation
      console.log("Envoi des données à l'API:", formData);

      // Première étape : création de la réservation
      let reservation;
      try {
        const response = await fetch("/api/booking/reservation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("Statut de la réponse:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Texte de l'erreur:", errorText);

          let errorData;
          try {
            errorData = JSON.parse(errorText);
            throw new Error(errorData.error || "Erreur lors de la réservation");
          } catch (parseError) {
            console.error("Erreur lors du parsing JSON:", parseError);
            throw new Error(
              `Erreur serveur: ${response.status} ${response.statusText}`
            );
          }
        }

        reservation = await response.json();
        console.log("Réservation créée avec succès:", reservation);
      } catch (error) {
        console.error("Erreur lors de la création de la réservation:", error);
        throw error;
      }

      // La réservation a été créée avec succès dans la base de données
      // Même si des erreurs se produisent avec les emails, la réservation existe

      // Réinitialiser le formulaire
      reset();

      // Passer à l'étape de confirmation
      nextStep();

      // Afficher un toast de succès
      toast.success("Votre réservation a été enregistrée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast.error(
        error instanceof Error
          ? `Erreur: ${error.message}`
          : "Une erreur est survenue lors de la réservation. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour formater l'heure
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fonction pour désactiver certaines dates dans le calendrier
  const disabledDays = (date: Date) => {
    // Désactiver les dates passées
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Désactiver les week-ends (6 = samedi, 0 = dimanche)
    const day = date.getDay();

    return date < today || day === 0 || day === 6;
  };

  // Fonction pour réinitialiser et démarrer une nouvelle réservation
  const resetBookingForm = () => {
    setStep(BookingStep.SELECT_DATE);
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    reset();
  };

  // Rendu du titre de l'étape actuelle
  const renderStepTitle = () => {
    switch (step) {
      case BookingStep.SELECT_DATE:
        return "1. Choisissez une date";
      case BookingStep.SELECT_TIME:
        return "2. Sélectionnez un créneau horaire";
      case BookingStep.FILL_DETAILS:
        return "3. Complétez vos informations";
      case BookingStep.CONFIRMATION:
        return "Réservation confirmée";
      default:
        return "";
    }
  };

  // Rendu de l'indicateur de progression
  const renderProgressIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors",
                step === index
                  ? "bg-blue-600 text-white"
                  : step > index
                  ? "bg-green-600 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
              )}
            >
              {step > index ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            {index < 3 && (
              <div
                className={cn(
                  "h-0.5 w-8 md:w-16",
                  step > index
                    ? "bg-green-600"
                    : "bg-neutral-200 dark:bg-neutral-700"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Rendu conditionnel en fonction de l'étape
  const renderStep = () => {
    switch (step) {
      case BookingStep.SELECT_DATE:
        return (
          <div className="space-y-6">
            <p className="text-neutral-600 dark:text-neutral-300 text-center">
              Sélectionnez une date disponible pour votre consultation.
            </p>
            <div className="flex justify-center max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
              <CalendarAlternate
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                enabledDays={availableDays}
                isFetching={isCalendarLoading}
                className="rounded-md"
                fullWidth
              />
            </div>
          </div>
        );

      case BookingStep.SELECT_TIME:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                className="mr-2 flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Retour
              </Button>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                {selectedDate?.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : availableTimeSlots.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                  Aucun créneau disponible pour cette date.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStep(BookingStep.SELECT_DATE)}
                >
                  Choisir une autre date
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-start mb-4">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    <Clock className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                    Durée: <span className="font-medium">30 minutes</span>
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Sélectionnez l&apos;heure qui vous convient le mieux.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableTimeSlots.map((slot, index) => {
                    const startTime = formatTime(slot.start);
                    const isSelected =
                      selectedTimeSlot &&
                      selectedTimeSlot.start.getTime() === slot.start.getTime();

                    return (
                      <button
                        key={index}
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={cn(
                          "py-3 px-2 text-sm font-medium rounded-md transition-colors border",
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        )}
                      >
                        {startTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case BookingStep.FILL_DETAILS:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                className="mr-2 flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Retour
              </Button>

              <div className="flex-1">
                <div className="flex items-center text-sm text-blue-700 dark:text-blue-400 font-medium mb-1">
                  <CalendarRange className="h-4 w-4 mr-1" />
                  {selectedDate?.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedTimeSlot && formatTime(selectedTimeSlot.start)}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(BookingStep.SELECT_DATE)}
                className="text-neutral-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Type de réservation */}
              <div className="space-y-3">
                <Label htmlFor="reservationType">Type de consultation</Label>
                <RadioGroup
                  defaultValue={reservationType}
                  onValueChange={(value: string) =>
                    setValue(
                      "reservationType",
                      value as
                        | "DISCOVERY"
                        | "CONSULTATION"
                        | "PRESENTATION"
                        | "FOLLOWUP"
                    )
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {reservationTypes.map((type) => (
                    <div key={type.id}>
                      <RadioGroupItem
                        value={type.id}
                        id={`type-${type.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`type-${type.id}`}
                        className="flex items-start p-3 border border-neutral-200 dark:border-neutral-700 rounded-md cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                      >
                        <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
                          {type.icon}
                        </div>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {type.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Méthode de communication */}
              <div className="space-y-3">
                <Label htmlFor="communicationMethod">
                  Mode de communication
                </Label>
                <RadioGroup
                  defaultValue={communicationMethod}
                  onValueChange={(value: string) =>
                    setValue("communicationMethod", value as "VISIO" | "PHONE")
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="VISIO"
                      id="cm-visio"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cm-visio"
                      className="flex items-center gap-2 py-2 px-3 border border-neutral-200 dark:border-neutral-700 rounded-md cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                    >
                      <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Visioconférence</span>
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="PHONE"
                      id="cm-phone"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cm-phone"
                      className="flex items-center gap-2 py-2 px-3 border border-neutral-200 dark:border-neutral-700 rounded-md cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                    >
                      <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Téléphone</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Informations personnelles */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      id="clientName"
                      placeholder="Jean Dupont"
                      className="pl-10"
                      {...register("clientName", {
                        required: "Ce champ est requis",
                      })}
                    />
                  </div>
                  {errors.clientName && (
                    <p className="text-sm text-red-500">
                      {errors.clientName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      id="clientEmail"
                      type="email"
                      placeholder="jean.dupont@exemple.com"
                      className="pl-10"
                      {...register("clientEmail", {
                        required: "Ce champ est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Adresse email invalide",
                        },
                      })}
                    />
                  </div>
                  {errors.clientEmail && (
                    <p className="text-sm text-red-500">
                      {errors.clientEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPhone">
                    Téléphone {communicationMethod === "PHONE" && "*"}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      id="clientPhone"
                      placeholder="06 12 34 56 78"
                      className="pl-10"
                      {...register("clientPhone", {
                        required:
                          communicationMethod === "PHONE"
                            ? "Ce champ est requis pour un appel téléphonique"
                            : false,
                      })}
                    />
                  </div>
                  {errors.clientPhone && (
                    <p className="text-sm text-red-500">
                      {errors.clientPhone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">
                    Description de votre projet *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Décrivez brièvement votre projet ou vos besoins..."
                    rows={4}
                    {...register("projectDescription", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 20,
                        message: "Veuillez entrer au moins 20 caractères",
                      },
                    })}
                  />
                  {errors.projectDescription && (
                    <p className="text-sm text-red-500">
                      {errors.projectDescription.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>En cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmer la réservation</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        );

      case BookingStep.CONFIRMATION:
        return (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Votre réservation est confirmée !
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Un email de confirmation a été envoyé à votre adresse. Vous
              recevrez également un rappel 24h avant la consultation.
            </p>

            <div className="max-w-md mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">
                    {selectedTimeSlot && formatTime(selectedTimeSlot.start)} -{" "}
                    {selectedTimeSlot && formatTime(selectedTimeSlot.end)}
                  </span>
                </div>
                {communicationMethod === "VISIO" ? (
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>Lien de visioconférence dans l&apos;email</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>Nous vous appellerons au numéro fourni</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={resetBookingForm}
                className="flex items-center gap-2"
              >
                <CalendarRange className="h-4 w-4" />
                <span>Réserver un autre créneau</span>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-full">
      {/* Titre de l'étape et indicateur de progression */}
      {step !== BookingStep.CONFIRMATION && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            {renderStepTitle()}
          </h3>
          {renderProgressIndicator()}
        </div>
      )}

      {/* Contenu de l'étape */}
      {renderStep()}
    </div>
  );
}
