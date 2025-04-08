"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarRange,
  Users,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface SiteSettings {
  general: {
    siteName: string;
    tagline: string;
    contactEmail: string;
    phoneNumber: string;
    address: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  booking: {
    minNoticeHours: number;
    maxAdvanceBookingDays: number;
    allowWeekendBookings: boolean;
    consultationDuration: number;
    shootingDuration: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  theme: {
    darkMode: boolean;
  };
}

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const defaultSettings: SiteSettings = {
    general: {
      siteName: "KAIRO Digital",
      tagline: "Agence de développement web et consulting digital",
      contactEmail: "contact.kairodigital@gmail.com",
      phoneNumber: "06 XX XX XX XX",
      address: "",
    },
    social: {
      facebook: "https://facebook.com/kairodigital",
      twitter: "",
      instagram: "https://instagram.com/kairodigital",
      linkedin: "https://linkedin.com/company/kairodigital",
    },
    booking: {
      minNoticeHours: 24,
      maxAdvanceBookingDays: 30,
      allowWeekendBookings: true,
      consultationDuration: 60,
      shootingDuration: 180,
    },
    seo: {
      metaTitle: "KAIRO Digital | Agence web & consulting digital",
      metaDescription:
        "KAIRO Digital vous accompagne dans vos projets web et votre transformation digitale.",
      keywords: "web, digital, développement, consulting, kairo",
    },
    theme: {
      darkMode: false,
    },
  };

  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        const data = await response.json();

        if (!response.ok || !data.authenticated) {
          // Récupérer l'URL de retour si présente
          const returnUrl = searchParams?.get("returnUrl") || "";
          router.push(
            `/admin/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`
          );
          return;
        }

        setAdminUser(data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Détecter le mode sombre
    if (typeof window !== "undefined") {
      setDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, [router, searchParams]);

  // Charger les paramètres depuis l'API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/settings");

        if (!response.ok) {
          throw new Error(
            `Erreur lors de la récupération des paramètres: ${response.status}`
          );
        }

        const data = await response.json();

        // Transformer les données de l'API en structure attendue
        const transformedSettings: SiteSettings = {
          general: {
            siteName: data.siteName || defaultSettings.general.siteName,
            tagline: data.siteDescription || defaultSettings.general.tagline,
            contactEmail:
              data.contactEmail || defaultSettings.general.contactEmail,
            phoneNumber:
              data.phoneNumber || defaultSettings.general.phoneNumber,
            address: data.address || defaultSettings.general.address,
          },
          social: {
            facebook:
              data.socialMedia?.facebook || defaultSettings.social.facebook,
            twitter:
              data.socialMedia?.twitter || defaultSettings.social.twitter,
            instagram:
              data.socialMedia?.instagram || defaultSettings.social.instagram,
            linkedin:
              data.socialMedia?.linkedin || defaultSettings.social.linkedin,
          },
          booking: {
            minNoticeHours:
              data.bookingSettings?.minimumNoticeHours ||
              defaultSettings.booking.minNoticeHours,
            maxAdvanceBookingDays:
              data.bookingSettings?.maxAdvanceBookingDays ||
              defaultSettings.booking.maxAdvanceBookingDays,
            allowWeekendBookings:
              data.bookingSettings?.allowWeekendBookings ??
              defaultSettings.booking.allowWeekendBookings,
            consultationDuration:
              data.bookingSettings?.bookingTimeSlotMinutes ||
              defaultSettings.booking.consultationDuration,
            shootingDuration:
              data.bookingSettings?.shootingDuration ||
              defaultSettings.booking.shootingDuration,
          },
          seo: {
            metaTitle:
              data.seoSettings?.defaultMetaTitle ||
              defaultSettings.seo.metaTitle,
            metaDescription:
              data.seoSettings?.defaultMetaDescription ||
              defaultSettings.seo.metaDescription,
            keywords:
              data.seoSettings?.keywords || defaultSettings.seo.keywords,
          },
          theme: {
            darkMode: darkMode,
          },
        };

        setSettings(transformedSettings);
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres:", error);
        setMessage({
          type: "error",
          text: "Impossible de charger les paramètres. Valeurs par défaut utilisées.",
        });
        // En cas d'erreur, utiliser les paramètres par défaut
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    if (adminUser) {
      fetchSettings();
    }
  }, [adminUser, darkMode]);

  // Handle form changes
  const handleInputChange = (
    section: keyof SiteSettings,
    field: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSwitchChange = (
    section: keyof SiteSettings,
    field: string,
    checked: boolean
  ) => {
    handleInputChange(section, field, checked);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      setDarkMode(!darkMode);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/admin/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setMessage(null);

      // Transformer les données dans le format attendu par l'API
      const apiSettings = {
        siteName: settings.general.siteName,
        siteDescription: settings.general.tagline,
        contactEmail: settings.general.contactEmail,
        phoneNumber: settings.general.phoneNumber,
        address: settings.general.address,
        socialMedia: {
          facebook: settings.social.facebook,
          twitter: settings.social.twitter,
          instagram: settings.social.instagram,
          linkedin: settings.social.linkedin,
        },
        bookingSettings: {
          minimumNoticeHours: settings.booking.minNoticeHours,
          maxAdvanceBookingDays: settings.booking.maxAdvanceBookingDays,
          allowWeekendBookings: settings.booking.allowWeekendBookings,
          bookingTimeSlotMinutes: settings.booking.consultationDuration,
          shootingDuration: settings.booking.shootingDuration,
          autoConfirmBookings: false,
          sendEmailNotifications: true,
        },
        seoSettings: {
          defaultMetaTitle: settings.seo.metaTitle,
          defaultMetaDescription: settings.seo.metaDescription,
          keywords: settings.seo.keywords,
          googleAnalyticsId: "",
        },
      };

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiSettings),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde des paramètres");
      }

      setMessage({
        type: "success",
        text: "Paramètres sauvegardés avec succès",
      });

      // Temporiser la disparition du message
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setMessage({
        type: "error",
        text: "Erreur lors de la sauvegarde des paramètres",
      });
    } finally {
      setSaving(false);
    }
  };

  // Afficher un écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 fixed inset-y-0 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <Link href="/" className="inline-block">
              <h1 className="text-xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent">
                  KAIRO
                </span>
                <span className="text-sm font-medium ml-1.5 text-neutral-600 dark:text-neutral-400">
                  Digital
                </span>
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/reservations"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <CalendarRange className="w-5 h-5 mr-3" />
                  Réservations
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/content"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Contenu
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/blog"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M18 2h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                    <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                    <path d="M14 8h1"></path>
                    <path d="M14 12h1"></path>
                    <path d="M14 16h1"></path>
                    <path d="M3 8h1"></path>
                    <path d="M3 12h1"></path>
                    <path d="M3 16h1"></path>
                  </svg>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/portfolio"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Utilisateurs
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center p-2 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                >
                  <SettingsIcon className="w-5 h-5 mr-3" />
                  Paramètres
                </Link>
              </li>
            </ul>
          </nav>

          {/* Profil et déconnexion */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                {adminUser?.name?.charAt(0) || "A"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate text-sm">
                  {adminUser?.name || "Admin"}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {adminUser?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-900/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Configurez les paramètres de votre site
              </p>
            </div>

            <Button
              variant="outline"
              className="flex items-center"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Mode clair
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Mode sombre
                </>
              )}
            </Button>
          </header>

          {/* Message de confirmation ou d'erreur */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-1">
              <TabsTrigger value="general" className="flex-1">
                Informations générales
              </TabsTrigger>
              <TabsTrigger value="social" className="flex-1">
                Réseaux sociaux
              </TabsTrigger>
              <TabsTrigger value="booking" className="flex-1">
                Réservations
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex-1">
                SEO
              </TabsTrigger>
            </TabsList>

            {/* Section Informations Générales */}
            <TabsContent
              value="general"
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg mt-4 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) =>
                      handleInputChange("general", "siteName", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="tagline">Slogan</Label>
                  <Input
                    id="tagline"
                    value={settings.general.tagline}
                    onChange={(e) =>
                      handleInputChange("general", "tagline", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "contactEmail",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                  <Input
                    id="phoneNumber"
                    value={settings.general.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "phoneNumber",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={settings.general.address}
                    onChange={(e) =>
                      handleInputChange("general", "address", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="darkMode"
                    checked={settings.theme.darkMode}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("theme", "darkMode", checked)
                    }
                  />
                  <Label htmlFor="darkMode">Mode sombre par défaut</Label>
                </div>
              </div>
            </TabsContent>

            {/* Section Réseaux Sociaux */}
            <TabsContent
              value="social"
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg mt-4 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.social.facebook}
                    onChange={(e) =>
                      handleInputChange("social", "facebook", e.target.value)
                    }
                    className="mt-1"
                    placeholder="https://facebook.com/votrepage"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input
                    id="twitter"
                    value={settings.social.twitter}
                    onChange={(e) =>
                      handleInputChange("social", "twitter", e.target.value)
                    }
                    className="mt-1"
                    placeholder="https://twitter.com/votrecompte"
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) =>
                      handleInputChange("social", "instagram", e.target.value)
                    }
                    className="mt-1"
                    placeholder="https://instagram.com/votrecompte"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={settings.social.linkedin}
                    onChange={(e) =>
                      handleInputChange("social", "linkedin", e.target.value)
                    }
                    className="mt-1"
                    placeholder="https://linkedin.com/in/votreprofil"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Section Réservations */}
            <TabsContent
              value="booking"
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg mt-4 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="minNoticeHours">
                    Délai minimum pour réserver (heures)
                  </Label>
                  <Input
                    id="minNoticeHours"
                    type="number"
                    value={settings.booking.minNoticeHours.toString()}
                    onChange={(e) =>
                      handleInputChange(
                        "booking",
                        "minNoticeHours",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1"
                    min="0"
                  />
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Combien d&apos;heures à l&apos;avance les clients
                    doivent-ils réserver
                  </p>
                </div>

                <div>
                  <Label htmlFor="maxAdvanceBookingDays">
                    Réservation maximale à l&apos;avance (jours)
                  </Label>
                  <Input
                    id="maxAdvanceBookingDays"
                    type="number"
                    value={settings.booking.maxAdvanceBookingDays.toString()}
                    onChange={(e) =>
                      handleInputChange(
                        "booking",
                        "maxAdvanceBookingDays",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1"
                    min="1"
                  />
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Combien de jours à l&apos;avance les clients peuvent-ils
                    réserver
                  </p>
                </div>

                <div>
                  <Label htmlFor="consultationDuration">
                    Durée de consultation (minutes)
                  </Label>
                  <Input
                    id="consultationDuration"
                    type="number"
                    value={settings.booking.consultationDuration.toString()}
                    onChange={(e) =>
                      handleInputChange(
                        "booking",
                        "consultationDuration",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1"
                    min="15"
                    step="15"
                  />
                </div>

                <div>
                  <Label htmlFor="shootingDuration">
                    Durée de séance photo (minutes)
                  </Label>
                  <Input
                    id="shootingDuration"
                    type="number"
                    value={settings.booking.shootingDuration.toString()}
                    onChange={(e) =>
                      handleInputChange(
                        "booking",
                        "shootingDuration",
                        Number(e.target.value)
                      )
                    }
                    className="mt-1"
                    min="30"
                    step="30"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowWeekendBookings"
                    checked={settings.booking.allowWeekendBookings}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        "booking",
                        "allowWeekendBookings",
                        checked
                      )
                    }
                  />
                  <Label htmlFor="allowWeekendBookings">
                    Autoriser les réservations le weekend
                  </Label>
                </div>
              </div>
            </TabsContent>

            {/* Section SEO */}
            <TabsContent
              value="seo"
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg mt-4 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle">Titre (balise meta title)</Label>
                  <Input
                    id="metaTitle"
                    value={settings.seo.metaTitle}
                    onChange={(e) =>
                      handleInputChange("seo", "metaTitle", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">
                    Description (balise meta description)
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.seo.metaDescription}
                    onChange={(e) =>
                      handleInputChange(
                        "seo",
                        "metaDescription",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">
                    Mots-clés (séparés par des virgules)
                  </Label>
                  <Textarea
                    id="keywords"
                    value={settings.seo.keywords}
                    onChange={(e) =>
                      handleInputChange("seo", "keywords", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Bouton pour sauvegarder les paramètres */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Sauvegarde..." : "Sauvegarder les paramètres"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Composant principal qui encapsule la logique d'authentification avec Suspense
export default function AdminSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Chargement...
            </p>
          </div>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
