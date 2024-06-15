'use server';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';
/* ··········································································· */
/* Obtiene una orden de Seller con su id */
/* ··········································································· */
export async function getInboxChats() {
  noStore();
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/inbox-chat/user-chats`;
  // let url = `${process.env.API_BASE_URL}/inbox-messages/get-chat-for-user/${recipientId}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}

export async function getMessagesForUser(chatId: string) {
  noStore();
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/inbox-messages/${chatId}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}

export async function getChatForUser(fromId: string, productId: string) {
  noStore();
  const token = cookies().get('token')?.value;
  let url = `${process.env.API_BASE_URL}/inbox-chat/get-chat-for-user/${fromId}/${productId}`;
  // let url = `${process.env.API_BASE_URL}/inbox-chat/get-chat-for-user`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Obtener el mensaje de error como JSON
      throw new Error(errorData.message || 'Error al hacer fetch data');
    }

    const data = await resp.json();

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, message: 'ocurrió un error vea los logs' };
  }
}
