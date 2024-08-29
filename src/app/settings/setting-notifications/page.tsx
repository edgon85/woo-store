import { getEmailPreferences, getNotifications } from '@/actions';
import { EmailPreferenceItem, NotificationList } from '@/components';
import { Metadata } from 'next';
import NotFound from '../not-found';

export const metadata: Metadata = {
  title: 'Notificaciones',
};

export default async function NotificationPage() {
  const { ok, data, message } = await getEmailPreferences();

  if (!ok) {
    return NotFound();
  }

  return (
    <>
      <section>
        <div className="p-4 bg-gray-400 ">
          <h2 className="text-base font-medium text-white">
            Preferencias de correo electrónico
          </h2>
        </div>
        {/*  <EmailPreferenceItem
      title="Email de bienvenida"
      preferenceValue={data.welcomeEmail}
      preferenceKey="welcomeEmail"
    /> */}
        <hr />
        <EmailPreferenceItem
          title="Productos Listados"
          preferenceValue={data.itemListedConfirmation}
          preferenceKey="itemListedConfirmation"
        />
        <hr />
        <EmailPreferenceItem
          title="Oferta Recibida"
          preferenceValue={data.offerReceived}
          preferenceKey="offerReceived"
        />
        <hr />
        <EmailPreferenceItem
          title="Producto Vendido"
          preferenceValue={data.itemSold}
          preferenceKey="itemSold"
        />
        <hr />
        <EmailPreferenceItem
          title="Recodar envío"
          preferenceValue={data.shipmentReminder}
          preferenceKey="shipmentReminder"
        />
        {/* <Divider />
  <EmailPreferenceItem
  title="Confirmación de pago"
  preferenceValue={data.paymentConfirmation}
  /> */}
        <hr />
        <EmailPreferenceItem
          title="Confirmación de compra"
          preferenceValue={data.purchaseConfirmation}
          preferenceKey="purchaseConfirmation"
        />
        <hr />
        <EmailPreferenceItem
          title="Actualización de envío"
          preferenceValue={data.shippingUpdate}
          preferenceKey="shippingUpdate"
        />
        <hr />
        {/* <EmailPreferenceItem
    title="Receipt Confirmation Reminder"
    preferenceValue={data.receiptConfirmationReminder}
    /> */}

        <EmailPreferenceItem
          title="Solicitud de calificación"
          preferenceValue={data.ratingRequest}
          preferenceKey="ratingRequest"
        />
        <EmailPreferenceItem
          title="Promociones y novedades de la Newsletter"
          preferenceValue={data.newsletter}
          preferenceKey="newsletter"
        />
      </section>
    </>
  );
}
/* 
- Likes en mis artículos
- Artículos que bajaron de precio
- Nuevas seguidoras
https://vercel.com/confirm?email=isaacher8820%40gmail.com&token=Px7FzxuSI8YY6el5AHr7CjRi&mode=signup
*/
