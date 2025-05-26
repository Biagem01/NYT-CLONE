import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async"; // 👈 importa Helmet

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Helmet> {/* 👈 Helmet per SEO */}
        <title>404 - Pagina non trovata | The New York Times Clone</title>
        <meta name="description" content="La pagina che stai cercando non esiste. Verifica l'indirizzo o torna alla home." />
      </Helmet>

      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
