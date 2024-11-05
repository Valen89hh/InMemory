'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils/helpers'
import { ROUTE_REDIRECT_DASHBOARD_USER } from '@/lib/routes/auth'
import { Result } from '@/lib/utils/response'
import { Profile } from '@/lib/supabase/models'

export async function signInWithGithub() {
  const supabase = createClient()
  const redirectUrl = getURL("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  })

  if(error){
    redirect("/login?message=Could not authenticate user")
  }
  
  redirect(data.url) // use the redirect API for your server framework
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const redirectUrl = getURL("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  })

  if(error){
    redirect("/login?message=Could not authenticate user")
  }
  
  redirect(data.url) // use the redirect API for your server framework
}

export async function registerWithCredentials(formData: FormData) {
    const supabase = createClient()
  
    // Obtener los datos del formulario
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    // Intentar realizar el registro
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    })
    console.log(error)

  
    // Si hay un error, manejarlo
    if (error) {
      if (error.code === 'over_email_send_rate_limit') {
        // Redirigir con un mensaje específico si se alcanzó el límite de correos
        redirect('/login?message=Has alcanzado el límite de envíos de correos. Intenta de nuevo más tarde.')
      } else {
        // Manejar otros errores de autenticación
        redirect('/login?message='+error.message)
      }
    }

    // Si no hay errores, redirigir al perfil del usuario
    revalidatePath('/')
    redirect(ROUTE_REDIRECT_DASHBOARD_USER)
  }
  

export async function loginWithCredentials(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message='+error.message)
  }

  revalidatePath('/', 'layout')
  redirect(ROUTE_REDIRECT_DASHBOARD_USER)
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login")
}

export const getProfileAuthenticated = async(userId: string): Promise<Result<Profile>>=>{
  const supabase = createClient()
  const {
    data: profile,
    error: errorProfile
  } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .maybeSingle()

  if(errorProfile) return {success: false, error: errorProfile.message}
  if(!profile) return {success: false, error: "Perfil de usuario no encontrado"}

  return {
    success: true,
    data: profile
  }
}

