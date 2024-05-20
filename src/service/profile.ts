"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

type FormDataArgs = {
  formData: FormData;
};

type SignUpState = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  name: string;
  kakao: string;
  birth: string;
  race: string;
  avatar: string;
  message: string;
};

type SignUpStateArgs = {
  signUpState: SignUpState;
};

export async function imageUpload({ formData }: FormDataArgs) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/userprofile/uploadProfile`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (response.ok) {
    revalidateTag("user");
    return data;
  } else {
    throw new Error(data.error);
  }
}

export async function updateProfileData({ signUpState }: SignUpStateArgs) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/userprofile/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signUpState }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (response.ok) {
    revalidateTag("user");
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function updatePasswordData({ signUpState }: SignUpStateArgs) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/userprofile/updatepw`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signUpState }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (response.ok) {
    revalidateTag("user");
    return data;
  } else {
    throw new Error(data.message);
  }
}
