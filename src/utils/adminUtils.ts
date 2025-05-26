
import { User } from "@supabase/supabase-js";

export const isAdminUser = (user: User | null): boolean => {
  return user?.email === "carlos@arcasl.es";
};

export const canAccessFeature = (user: User | null): boolean => {
  // Admin user has unrestricted access
  if (isAdminUser(user)) {
    return true;
  }
  
  // Regular users need to be authenticated
  return !!user;
};
