import { useState, useEffect } from 'react';
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

export const useBreweryStore = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    const [beersRes, resRes] = await Promise.all([
      supabase.from('beers').select('*').order('created_at', { ascending: false }),
      supabase.from('reservations').select('*').order('created_at', { ascending: false })
    ]);

    if (beersRes.data) setBeers(beersRes.data as Beer[]);
    if (resRes.data) setReservations(resRes.data as Reservation[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Subscribe to real-time changes
    const beersChannel = supabase
      .channel('beers-all')
      .on('postgres_changes', { event: '*', table: 'beers' }, () => fetchData())
      .subscribe();

    const resChannel = supabase
      .channel('res-all')
      .on('postgres_changes', { event: '*', table: 'reservations' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(beersChannel);
      supabase.removeChannel(resChannel);
    };
  }, []);

  // Pushing changes to Supabase
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

  return {
    beers,
    reservations,
    loading,
    addReservation,
    updateReservationStatus,
    updateBeerStatus,
    addBeer,
    deleteBeer,
    refresh: fetchData
  };
};
