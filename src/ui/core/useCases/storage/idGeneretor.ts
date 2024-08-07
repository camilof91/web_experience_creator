// Función para generar IDs
export const generateUniqueId = () => {
  // Verificar si crypto.randomUUID está disponible
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Generar un ID aleatorio combinando Math.random y Date.now
    const low32 = Math.random().toString(36).slice(2, 10)
    const low16 = Math.random().toString(36).slice(2, 6)
    return `${low32}-${low16}-4`;
  }
};