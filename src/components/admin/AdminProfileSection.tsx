import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

export const AdminProfileSection: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setPhone(profile.phone || '');
      setBio(profile.bio || '');
    }
    if (user) {
      setEmail(user.email || '');
    }
  }, [profile, user]);

  const hasChanges =
    (profile?.first_name || '') !== firstName.trim() ||
    (profile?.last_name || '') !== lastName.trim() ||
    (profile?.phone || '') !== phone.trim() ||
    (profile?.bio || '') !== bio.trim() ||
    (user?.email || '') !== email.trim() ||
    newPassword.trim().length > 0;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        email: email.trim(),
        ...(newPassword.trim() ? { password: newPassword.trim() } : {}),
      });

      setNewPassword('');
      setSuccessMessage('¡Información de perfil y credenciales actualizadas exitosamente!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Error al guardar perfil:', err);
      setErrorMessage(
        err.message || 'No se pudieron guardar los cambios en el perfil. Intente nuevamente.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white rounded-3xl shadow-sm border border-[#0A1F17]/10 overflow-hidden">
        {/* Cabecera del Perfil */}
        <div className="bg-gradient-to-r from-[#06150F] via-[#0A1F17] to-[#13281F] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C8A45D]/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C8A45D]/20 backdrop-blur-md border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] font-serif-luxury font-bold text-2xl shadow-inner">
              {firstName ? firstName.charAt(0).toUpperCase() : 'H'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury font-bold text-2xl sm:text-3xl tracking-tight text-white">
                  {firstName || lastName
                    ? `${firstName} ${lastName}`.trim()
                    : 'Perfil de Administrador'}
                </h2>
                <span className="bg-[#C8A45D] text-[#06150F] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/75 mt-0.5">
                Modifique sus datos personales y credenciales de acceso para Hacienda Le Plus.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#E2C585] bg-white/5 px-3.5 py-1.5 rounded-xl self-start sm:self-auto border border-[#C8A45D]/30">
            <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
            <span>Perfil Administrador</span>
          </div>
        </div>

        {/* Alertas y Formulario */}
        <div className="p-6 sm:p-8 space-y-6">
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs sm:text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs sm:text-sm text-red-700">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
              <div>
                <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ingrese su nombre"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                  Apellido / Cargo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ingrese su apellido o cargo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Usuario / Correo */}
              <div>
                <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                  Usuario o Correo de Acceso
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Cambiar Contraseña */}
              <div>
                <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                  Cambiar Contraseña (Opcional)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña (dejar vacío para mantener)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Teléfono */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                  Teléfono / WhatsApp de Contacto
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+593 96 981 7891"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-[#0A1F17] uppercase tracking-wider mb-2">
                Información Personal / Acerca de la Administración
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Descripción profesional, cargo o notas sobre la gestión en Hacienda Le Plus..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/20 transition-all font-medium resize-y"
                />
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={!hasChanges || saving}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  hasChanges && !saving
                    ? 'bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] shadow-md hover:shadow-lg'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C8A45D]" />
                    <span>Guardando cambios...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-[#C8A45D]" />
                    <span>Guardar Cambios de Perfil</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
