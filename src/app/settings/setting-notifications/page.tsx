import { getEmailPreferences } from '@/actions';
import { EmailPreferenceItem } from '@/components';
import { Metadata } from 'next';
import NotFound from '../not-found';

export const metadata: Metadata = {
  title: 'Notificaciones',
};

export default async function NotificationPage() {
  const { ok, data } = await getEmailPreferences();

  if (!ok) {
    NotFound();
  }

  return (
    <>
      <section>
        <div className="p-4 bg-gray-400 ">
          <h2 className="text-base font-medium text-white">
            Preferencias de correo electrónico
          </h2>
        </div>

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
