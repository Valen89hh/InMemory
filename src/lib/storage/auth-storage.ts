import {create} from 'zustand';
import { Profile } from '../supabase/models';

interface ProfileState{
  profile: Profile | null,
  setProfile: (pr: Profile | null)=> void,
  loadingProfile: boolean,
  setLoadingProfile: (l: boolean)=> void
}

export const useProfileState = create<ProfileState>(set=>({
  profile: null,
  loadingProfile: false,
  setProfile: (pr)=>set({profile: pr}),
  setLoadingProfile: (value)=>set({loadingProfile: value})
}))
