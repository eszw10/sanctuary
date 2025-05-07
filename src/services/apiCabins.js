import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //https://yeteudgpvylbfnhuqhhh.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  // setting up the image
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit cabin
  let query = supabase.from("cabins");
  // # 1. CREATE new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // #2. EDIT cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error(
      id ? "Cabin could not be updated" : "Cabins could not be created"
    );
  }

  if (hasImagePath) return data;

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Image could not be uploaded and cabin could not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
