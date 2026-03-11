import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const LoadingScreen: React.FC = () => {
    const { profile, isLoading } = useAuth();

    // Si no está cargando y no hay perfil, el componente padre probablemente redirigirá,
    // pero por si acaso mostramos el estado genérico.
    // MODO DESARROLLADOR: Permitir previsualizar niveles mediante URL (?debugLevel=1)
    const searchParams = new URLSearchParams(window.location.search);
    const debugLevel = searchParams.get('debugLevel');

    // PERSISTENCIA: Intentamos recuperar el nivel de localStorage si el profile aún no ha cargado
    const persistentLevel = localStorage.getItem('axon_user_level');
    const level = debugLevel ? parseInt(debugLevel) : ((profile as any)?.level || (persistentLevel ? parseInt(persistentLevel) : null));

    let logoSrc = '/axon-logo.png'; // Fallback / Genérico
    let animationClass = 'animate-pulse';
    let glowClass = '';

    if (level === 4) {
        // Admin: Vault door
        logoSrc = '/assets/identity/axon-admin.png';
        animationClass = 'animate-[spin_10s_linear_infinite]';
    } else if (level === 2 || level === 3) {
        // Teen/Junior: "Electric A" with high-end FX
        logoSrc = '/assets/identity/axon-teen.png';
        animationClass = 'animate-[pulse_4s_ease-in-out_infinite]';
        glowClass = 'shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-full';
    } else if (level === 1) {
        // Kid: Friendly bounce with grounding shadow
        logoSrc = '/assets/identity/axon-kids-icon.png';
        animationClass = 'animate-bounce';
    }

    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible && debugLevel) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* BACKGROUND FX FOR TEEN (Electric) */}
            {(level === 2 || level === 3) && (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
                    {/* Electrical Arcs */}
                    <div className="absolute w-64 h-64 border border-blue-500/10 rounded-full animate-[spin_3s_linear_infinite] opacity-20" />
                    <div className="absolute w-72 h-72 border border-blue-400/5 rounded-full animate-[spin_5s_linear_infinite_reverse] opacity-20" />
                </>
            )}

            <div className="flex flex-col items-center gap-8 relative z-10">
                <div className={cn("relative w-32 h-32 flex items-center justify-center transition-all duration-700", glowClass)}>
                    
                    {/* TEEN FX: Electric Bolts/Flicker */}
                    {(level === 2 || level === 3) && (
                        <div className="absolute inset-0 animate-[pulse_0.1s_infinite] opacity-40">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-400 blur-sm rounded-full" />
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-blue-400 blur-sm rounded-full" />
                        </div>
                    )}

                    <img
                        src={logoSrc}
                        alt="Loading..."
                        className={cn("w-full h-full object-contain relative z-20", animationClass)}
                    />
                </div>

                {/* KID FX: Grounding Shadow */}
                {level === 1 && (
                    <div className="w-12 h-1.5 bg-black/40 blur-sm rounded-[100%] animate-[pulse_1s_ease-in-out_infinite] -mt-4" />
                )}

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300"></div>
                    </div>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                        Cargando AXON OS
                    </p>
                </div>

                {debugLevel && (
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="mt-4 px-6 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 text-[10px] uppercase tracking-widest rounded-full border border-zinc-800 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                    >
                        Cerrar Previsualización
                    </button>
                )}
            </div>
        </div>
    );
};
