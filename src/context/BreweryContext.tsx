import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Beer {
  id: string;
  name: string;
  price: string;
  description: string;
  abv: string;
  ibu: string;
  tag: string;
  image: string;
  category?: string;
  status: 'In Stock' | 'Low Stock' | 'Sold Out';
}

export interface Reservation {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  pax: number;
  table_assigned?: string;
  status: 'Pending' | 'Confirmed' | 'Arrived' | 'Cancelled';
}

interface BreweryContextType {
  beers: Beer[];
  reservations: Reservation[];
  loading: boolean;
  addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => Promise<{ error: any }>;
  updateReservationStatus: (id: string, status: Reservation['status']) => Promise<{ error: any }>;
  updateBeerStatus: (id: string, status: Beer['status']) => Promise<{ error: any }>;
  addBeer: (beer: Omit<Beer, 'id'>) => Promise<{ error: any }>;
  deleteBeer: (id: string) => Promise<{ error: any }>;
  refresh: () => Promise<void>;
}

const BreweryContext = createContext<BreweryContextType | undefined>(undefined);

const DEFAULT_BEERS: Beer[] = [
  {
    id: 'default-1',
    name: 'Mango Cider',
    price: '₹295',
    description: 'The legendary nectar that defined Koramangala\'s craft scene. Sweet, crisp, and unapologetically local.',
    abv: '4.5%',
    ibu: '12',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=800',
    category: 'Craft Cider',
    status: 'In Stock'
  },
  {
    id: 'default-2',
    name: 'Industrial IPA',
    price: '₹345',
    description: 'A robust, hop-forward tribute to our mechanical roots. Intense citrus notes with a patient, bitter finish.',
    abv: '6.8%',
    ibu: '55',
    tag: 'Strong',
    image: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=800',
    category: 'IPA',
    status: 'In Stock'
  },
  {
    id: 'default-3',
    name: 'Copper Ale',
    price: '₹315',
    description: 'A smooth, malty descent into the void. Toasted caramel notes balanced by a clean industrial crispness.',
    abv: '5.2%',
    ibu: '24',
    tag: 'Balanced',
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=800',
    category: 'Amber Ale',
    status: 'In Stock'
  }
];

export const BreweryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [beersRes, resRes] = await Promise.all([
        supabase.from('beers').select('*').order('created_at', { ascending: false }),
        supabase.from('reservations').select('*').order('created_at', { ascending: false })
      ]);

      if (beersRes.data && beersRes.data.length > 0) {
        setBeers(beersRes.data as Beer[]);
      } else {
        setBeers(DEFAULT_BEERS);
      }

      if (resRes.data) setReservations(resRes.data as Reservation[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setBeers(DEFAULT_BEERS);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();

    // Subscribe to real-time changes — ONLY ONE SUBSCRIPTION GLOBALLY
    const beersChannel = supabase
      .channel('beers-global')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'beers' }, () => fetchData())
      .subscribe();

    const resChannel = supabase
      .channel('res-global')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(beersChannel);
      supabase.removeChannel(resChannel);
    };
  }, [fetchData]);

  const addReservation = async (reservation: Omit<Reservation, 'id' | 'status'>) => {
    const { error } = await supabase.from('reservations').insert([
      { ...reservation, status: 'Pending' }
    ]);
    return { error };
  };

  const updateReservationStatus = async (id: string, status: Reservation['status']) => {
    const { error } = await supabase.from('reservations').update({ status }).eq('id', id);
    return { error };
  };

  const updateBeerStatus = async (id: string, status: Beer['status']) => {
    const { error } = await supabase.from('beers').update({ status }).eq('id', id);
    return { error };
  };

  const addBeer = async (beer: Omit<Beer, 'id'>) => {
    const { error } = await supabase.from('beers').insert([beer]);
    return { error };
  };

  const deleteBeer = async (id: string) => {
    const { error } = await supabase.from('beers').delete().eq('id', id);
    return { error };
  };

  return (
    <BreweryContext.Provider value={{
      beers,
      reservations,
      loading,
      addReservation,
      updateReservationStatus,
      updateBeerStatus,
      addBeer,
      deleteBeer,
      refresh: fetchData
    }}>
      {children}
    </BreweryContext.Provider>
  );
};

export const useBrewery = () => {
  const context = useContext(BreweryContext);
  if (context === undefined) {
    throw new Error('useBrewery must be used within a BreweryProvider');
  }
  return context;
};
