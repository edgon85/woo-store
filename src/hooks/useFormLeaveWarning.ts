// useUnsavedChangesWarning.ts
import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useUnsavedChangesWarning(isDirty: boolean) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Este es el enfoque moderno para mostrar un diálogo de confirmación
        e.returnValue =
          '¿Estás seguro de que quieres abandonar la página? Tu información no guardada se perderá.';
      }
    },
    [isDirty]
  );

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [onBeforeUnload]);

  useEffect(() => {
    if (isDirty) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () =>
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isDirty]);

  useEffect(() => {
    if (isDirty) {
      // console.log('Unsaved changes exist');
      // Aquí podrías implementar lógica adicional cuando la ruta cambia y hay cambios no guardados
    }
  }, [pathname, searchParams, isDirty]);
}
