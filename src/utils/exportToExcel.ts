import * as XLSX from 'xlsx';
import { LeadSubmission } from '../types/cms';

/**
 * Exporta el listado de clientes y agendamientos directamente a un archivo de Excel nativo (.xlsx)
 * con encabezados claros, anchos de columna preconfigurados y formato profesional.
 */
export function exportLeadsToExcel(
  leads: LeadSubmission[],
  filename = `Hacienda_Le_Plus_Clientes_${new Date().toISOString().split('T')[0]}.xlsx`
) {
  const rows = leads.map((lead, idx) => ({
    'N.º': idx + 1,
    'Fecha de Registro': lead.createdAt
      ? new Date(lead.createdAt).toLocaleString('es-EC', {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : '-',
    'Cliente / Contacto': lead.clientName || 'Sin nombre',
    'Organización / Referencia': lead.organizationOrCouple || '-',
    'Teléfono / WhatsApp': lead.phone || '-',
    'Correo Electrónico': lead.email || '-',
    'Tipo de Servicio': (lead.serviceType || 'General').toUpperCase(),
    'Fecha Tentativa / Ingreso': lead.tentativeDate || 'Por definir',
    'Aforo / Huéspedes / Duración': lead.estimatedVolume || 'Por definir',
    'Estado': lead.status || 'Nuevo',
    'Notas y Requerimientos': lead.notes || '-',
    'Página de Origen': lead.sourcePage || '-',
    'Canal Notificado': lead.targetCorporateEmail || '-',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Configuración de ancho de columnas para visualización óptima en Microsoft Excel / Google Sheets
  worksheet['!cols'] = [
    { wch: 6 },  // N.º
    { wch: 20 }, // Fecha
    { wch: 28 }, // Cliente
    { wch: 30 }, // Organización
    { wch: 20 }, // Teléfono
    { wch: 30 }, // Email
    { wch: 18 }, // Servicio
    { wch: 24 }, // Fecha Tentativa
    { wch: 30 }, // Aforo / Huéspedes
    { wch: 18 }, // Estado
    { wch: 45 }, // Notas
    { wch: 18 }, // Origen
    { wch: 28 }, // Canal
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes y Agendamientos');
  XLSX.writeFile(workbook, filename);
}

/**
 * Exporta el listado a formato CSV con codificación UTF-8 con BOM
 * para compatibilidad total con Excel en Windows y plataformas externas.
 */
export function exportLeadsToCSV(
  leads: LeadSubmission[],
  filename = `Hacienda_Le_Plus_Clientes_${new Date().toISOString().split('T')[0]}.csv`
) {
  const headers = [
    'Nro',
    'Fecha',
    'Cliente',
    'Organizacion',
    'Telefono',
    'Email',
    'Servicio',
    'Fecha Tentativa',
    'Aforo o Duracion',
    'Estado',
    'Notas',
    'Origen',
  ];

  const escapeCSV = (val: unknown) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [
    headers.join(';'),
    ...leads.map((l, idx) =>
      [
        escapeCSV(idx + 1),
        escapeCSV(l.createdAt),
        escapeCSV(l.clientName),
        escapeCSV(l.organizationOrCouple),
        escapeCSV(l.phone),
        escapeCSV(l.email),
        escapeCSV(l.serviceType),
        escapeCSV(l.tentativeDate),
        escapeCSV(l.estimatedVolume),
        escapeCSV(l.status),
        escapeCSV(l.notes),
        escapeCSV(l.sourcePage),
      ].join(';')
    ),
  ];

  const blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
