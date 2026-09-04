'use client';

import React, { useState } from 'react';
import { MapPin, Search, Navigation, AlertTriangle, CheckSquare, ShieldAlert, Bus, Train } from 'lucide-react';

interface ExamVenue {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  address: string;
  nearestMetro: string;
  nearestRailway: string;
  landmark: string;
  googleMapsUrl: string;
}

const POPULAR_VENUES: ExamVenue[] = [
  {
    id: '1',
    name: 'iON Digital Zone iDZ 1 Noida',
    code: 'IDZ-8421',
    city: 'Noida (Delhi NCR)',
    state: 'Uttar Pradesh',
    address: 'Sector 62, Block C, Institutional Area, Noida, UP 201309',
    nearestMetro: 'Noida Electronic City Metro Station (Blue Line) - 800m',
    nearestRailway: 'Anand Vihar Terminal - 8.5 km',
    landmark: 'Near Fortis Hospital / JSS Academy',
    googleMapsUrl: 'https://maps.google.com/?q=iON+Digital+Zone+Sector+62+Noida',
  },
  {
    id: '2',
    name: 'iON Digital Zone iDZ Patna',
    code: 'IDZ-5102',
    city: 'Patna',
    state: 'Bihar',
    address: 'Patliputra Industrial Area, Near Polytechnic, Patna, Bihar 800013',
    nearestMetro: 'Patna Junction Railway Station - 6 km',
    nearestRailway: 'Patliputra Junction - 2.5 km',
    landmark: 'Opposite State Polytechnic',
    googleMapsUrl: 'https://maps.google.com/?q=iON+Digital+Zone+Patliputra+Patna',
  },
  {
    id: '3',
    name: 'iON Digital Zone iDZ Powai Mumbai',
    code: 'IDZ-2194',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Aurum IT Park, Kanjurmarg East / Powai, Mumbai 400042',
    nearestMetro: 'Kanjurmarg Railway Station (Central Line) - 1.2 km',
    nearestRailway: 'Chhatrapati Shivaji Maharaj Terminus (CSMT) - 24 km',
    landmark: 'Near JVLR Junction',
    googleMapsUrl: 'https://maps.google.com/?q=iON+Digital+Zone+Powai+Mumbai',
  },
  {
    id: '4',
    name: 'iON Digital Zone iDZ Electronic City Bangalore',
    code: 'IDZ-9931',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Phase 1, Electronic City, Hosur Road, Bangalore, Karnataka 560100',
    nearestMetro: 'Electronic City Metro Station (Yellow Line) - 1.5 km',
    nearestRailway: 'KSR Bengaluru City Junction - 21 km',
    landmark: 'Near Wipro Gate 5',
    googleMapsUrl: 'https://maps.google.com/?q=iON+Digital+Zone+Electronic+City+Bangalore',
  },
  {
    id: '5',
    name: 'iON Digital Zone iDZ Sector 34 Chandigarh',
    code: 'IDZ-4138',
    city: 'Chandigarh',
    state: 'Punjab / Chandigarh',
    address: 'Sub City Centre, Sector 34A, Chandigarh 160022',
    nearestMetro: 'Chandigarh ISBT Sector 43 - 3.5 km',
    nearestRailway: 'Chandigarh Junction Railway Station - 8 km',
    landmark: 'Near Piccadilly Square',
    googleMapsUrl: 'https://maps.google.com/?q=iON+Digital+Zone+Sector+34+Chandigarh',
  },
];

export default function ExamCenterFinder() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');

  const filteredVenues = POPULAR_VENUES.filter((venue) => {
    const matchSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.code.toLowerCase().includes(search.toLowerCase()) ||
      venue.city.toLowerCase().includes(search.toLowerCase()) ||
      venue.address.toLowerCase().includes(search.toLowerCase());

    const matchCity = selectedCity === 'ALL' || venue.city.includes(selectedCity);
    return matchSearch && matchCity;
  });

  return (
    <div className="space-y-8">
      
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-800 space-y-4">
        <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
          Aspirant Travel &amp; Venue Navigator
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Find Your CBT Exam Center &amp; Exam-Day Checklist
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Search your TCS iON Digital Zone, NTA exam center code, nearest metro &amp; transit routes, and verify mandatory reporting rules.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by venue name, center code (e.g. IDZ-8421), or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/90 text-white placeholder:text-slate-400 pl-11 pr-4 py-3 rounded-2xl border border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-800 text-white border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none"
          >
            <option value="ALL">All Cities</option>
            <option value="Delhi">Delhi NCR / Noida</option>
            <option value="Patna">Patna</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chandigarh">Chandigarh</option>
          </select>
        </div>
      </div>

      {/* Two Column Grid: Exam Checklist (Left) & Centers Directory (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Reporting Day Mandatory Checklist */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Mandatory Documents Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Must-Carry Exam Documents
            </h3>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                <span><strong>Printed Admit Card:</strong> Clear printout with clearly visible roll number and photo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                <span><strong>Original Photo ID:</strong> Aadhaar Card (Original), Voter ID, Driving License, or Passport. (Photocopies strictly prohibited).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                <span><strong>2 Passport Photos:</strong> Same photograph uploaded during registration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                <span><strong>Transparent Ballpoint Pen:</strong> Blue or Black ink.</span>
              </li>
            </ul>
          </div>

          {/* Strictly Prohibited Items */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-black text-rose-950 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Strictly Prohibited Items
            </h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              Mobile phones, smartwatches, bluetooth earbuds, calculators, metal belts, jewellery, and wallets with metallic zippers are barred inside the test lab.
            </p>
          </div>

        </div>

        {/* Right Col: Filtered Venues List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filteredVenues.length} Verified Exam Test Centers
            </span>
          </div>

          {filteredVenues.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded">
                      {v.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{v.city}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-1">{v.name}</h3>
                </div>

                <a
                  href={v.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> {v.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Nearest Metro / Station:</strong> {v.nearestMetro}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
