import { supabase, supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updatedData;

  // 1. create updated data

  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}.jpg`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update avatar
  const { data: updatedUser, error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}
