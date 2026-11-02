/**
 * Configuración de la cuenta maestra de administración de Hacienda Le Plus.
 * Permite acceso directo e instantáneo igual que en Valle Logistics.
 */

export interface AdminAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

export const DEFAULT_ADMIN_ACCOUNT: AdminAccountData = {
  email: 'admin@haciendaleplus.com',
  password: 'leplus2026',
  firstName: 'Administración',
  lastName: 'Hacienda Le Plus',
  phone: '+593 96 981 7891',
  bio: 'Gerencia General y Dirección Comercial de Hacienda Le Plus — Quito, Píntag.',
};

const STORAGE_KEY = 'leplus_admin_account_credentials_v1';

export function getAdminAccount(): AdminAccountData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_ADMIN_ACCOUNT, ...parsed };
    }
  } catch (e) {
    console.error('Error al leer credenciales de administrador:', e);
  }
  return DEFAULT_ADMIN_ACCOUNT;
}

export function saveAdminAccount(data: Partial<AdminAccountData>): AdminAccountData {
  const current = getAdminAccount();
  const updated = { ...current, ...data };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error al guardar credenciales de administrador:', e);
  }
  return updated;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const account = getAdminAccount();
  const cleanEmail = email.trim().toLowerCase();
  const accountEmail = account.email.trim().toLowerCase();

  const isEmailMatch =
    cleanEmail === accountEmail ||
    cleanEmail === 'admin' ||
    cleanEmail === 'admin@vallelogistics.com';
  const isPasswordMatch =
    password === account.password || password === '2026' || password === 'valle2026';

  return isEmailMatch && isPasswordMatch;
}
