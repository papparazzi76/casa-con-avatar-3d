
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const authSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AuthFormValues) {
    setIsLoading(true);
    try {
      if (authType === "login") {
        await signIn(data.email, data.password);
        navigate("/");
      } else {
        await signUp(data.email, data.password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div 
      className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {authType === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription className="text-center">
            {authType === "login" 
              ? "Ingresa tus credenciales para acceder a tu cuenta"
              : "Regístrate para empezar a utilizar PropTools"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authType} onValueChange={(value) => setAuthType(value as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="correo@ejemplo.com" 
                          type="email" 
                          autoComplete="email"
                          disabled={isLoading} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          autoComplete={authType === "login" ? "current-password" : "new-password"}
                          disabled={isLoading} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : (authType === "login" ? "Iniciar Sesión" : "Crear Cuenta")}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {authType === "login" 
              ? "¿No tienes una cuenta? " 
              : "¿Ya tienes una cuenta? "
            }
            <Button 
              variant="link" 
              className="p-0" 
              onClick={() => setAuthType(authType === "login" ? "register" : "login")}
            >
              {authType === "login" ? "Regístrate ahora" : "Inicia sesión"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
