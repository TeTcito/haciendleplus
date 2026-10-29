export type WhatsAppContextType =
  | 'bodas'
  | 'corporativo'
  | 'hospedaje'
  | 'grupos'
  | 'escapadas'
  | 'visita'
  | 'general';

export interface WhatsAppMessageParams {
  phone?: string;
  context: WhatsAppContextType;
  itemName?: string;
  tentativeDate?: string;
  guestsOrNights?: string;
  clientName?: string;
  customText?: string;
}

export interface WhatsAppShortcutOptions {
  phone?: string;
  itemName?: string;
  tentativeDate?: string;
  guestsOrNights?: string;
  clientName?: string;
  customText?: string;
}

/**
 * Generates dynamic, parameterized WhatsApp links as specified in the project scope:
 * "Enlaces dinámicos a WhatsApp con mensajes predeterminados y parametrizados según el servicio consultado (bodas, empresas o reservaciones)."
 */
export function buildContextualWhatsAppUrl(
  paramsOrContext: WhatsAppMessageParams | WhatsAppContextType,
  options?: WhatsAppShortcutOptions | string
): string {
  const normalizedOptions: WhatsAppShortcutOptions | undefined =
    typeof options === 'string' ? { itemName: options } : options;

  const params: WhatsAppMessageParams =
    typeof paramsOrContext === 'string'
      ? { context: paramsOrContext, ...normalizedOptions }
      : paramsOrContext;

  const {
    phone = '593969817891',
    context,
    itemName,
    tentativeDate,
    guestsOrNights,
    clientName,
    customText,
  } = params;

  const cleanPhone = phone.replace(/\D/g, '') || '593969817891';
  if (customText) {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customText)}`;
  }

  const fechaStr = tentativeDate ? tentativeDate : '__';
  const volumenStr = guestsOrNights ? guestsOrNights : '__';
  const nombrePrefix = clientName ? `Hola, soy ${clientName}. ` : 'Hola, ';

  let message = '';

  switch (context) {
    case 'bodas':
      message = `${nombrePrefix}vi la página de Bodas y Celebraciones de Hacienda Le Plus${
        itemName ? ` (${itemName})` : ''
      }. Mi fecha tentativa es ${fechaStr} y seríamos aproximadamente ${volumenStr} invitados. Deseo solicitar una cotización y agendar una visita.`;
      break;

    case 'corporativo':
      message = `${nombrePrefix}vi la página de Grandes Eventos y Experiencias Corporativas de Hacienda Le Plus${
        itemName ? ` (${itemName})` : ''
      }. Buscamos organizar un evento empresarial / convención / integración en fecha tentativa ${fechaStr} para ${volumenStr} participantes. Quisiera solicitar una cotización formal.`;
      break;

    case 'hospedaje':
      message = `${nombrePrefix}estoy interesado en Hospedaje para Empresas y Grupos (Larga Estadía) en Hacienda Le Plus${
        itemName ? ` (${itemName})` : ''
      }. Deseo solicitar una cotización para ingreso el ${fechaStr} (${volumenStr} personas / duración).`;
      break;

    case 'grupos':
      message = `${nombrePrefix}vi la página de Hospedaje para Empresas y Grupos (Larga Estadía) en Hacienda Le Plus${
        itemName ? ` (${itemName})` : ''
      }. Buscamos alojamiento para personal/delegación/ONG (${volumenStr}) en fecha tentativa ${fechaStr}. Quisiera cotizar según número de personas y duración.`;
      break;

    case 'escapadas':
      message = `${nombrePrefix}me interesa cotizar Hospedaje y Servicios Complementarios en Hacienda Le Plus${
        itemName ? ` (${itemName})` : ''
      } para la fecha ${fechaStr} (${volumenStr} personas). ¿Me ayudan con disponibilidad y cotización?`;
      break;

    case 'visita':
      message = `${nombrePrefix}deseo solicitar una cotización y agendar una visita comercial a Hacienda Le Plus en Quito–Píntag. Mi fecha tentativa de estadía o evento es ${fechaStr}.`;
      break;

    case 'general':
    default:
      message = `${nombrePrefix}visité la web de Hacienda Le Plus (Quito–Píntag)${
        itemName ? ` — consulta sobre ${itemName}` : ''
      }. Deseo solicitar una cotización (hospedaje de larga estadía, grandes eventos o bodas).`;
      break;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
