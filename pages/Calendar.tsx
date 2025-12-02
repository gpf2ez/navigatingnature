import React from 'react';
import { useSite } from '../services/SiteContext';
import { StickyNote } from '../components/Scrapbook';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const { events } = useSite();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getEventsForDay = (day: number) => {
     const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
     return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="py-12 bg-nature-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-5xl font-hand font-bold text-nature-dark">Event Calendar</h1>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
               <button onClick={prevMonth} className="p-2 hover:bg-nature-light/30 rounded-full"><ChevronLeft /></button>
               <span className="text-2xl font-bold font-sans w-48 text-center">{monthName} {year}</span>
               <button onClick={nextMonth} className="p-2 hover:bg-nature-light/30 rounded-full"><ChevronRight /></button>
            </div>
         </div>

         <div className="bg-white shadow-xl p-4 border-4 border-nature-tan rounded-sm">
            {/* Header */}
            <div className="grid grid-cols-7 mb-4 text-center">
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="font-bold font-hand text-xl text-nature-dark">{d}</div>
               ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-2">
               {/* Empty cells */}
               {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-32 bg-gray-50/50 rounded-sm"></div>
               ))}
               
               {/* Days */}
               {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  return (
                     <div key={day} className="h-32 border border-nature-light/30 p-2 relative hover:bg-yellow-50 transition overflow-y-auto custom-scrollbar">
                        <span className="block font-bold text-gray-400 mb-1">{day}</span>
                        <div className="space-y-1">
                           {dayEvents.map(ev => (
                              <div key={ev.id} className={`text-xs p-1 rounded-sm shadow-sm cursor-pointer ${
                                 ev.type === 'hike' ? 'bg-nature-light text-nature-dark' :
                                 ev.type === 'workshop' ? 'bg-nature-tan text-nature-brown' :
                                 'bg-yellow-200 text-yellow-800'
                              }`}>
                                 {ev.title}
                              </div>
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <StickyNote color="bg-blue-100" className="rotate-[-1deg]">
               <h3 className="font-bold text-xl mb-2">Upcoming Highlights</h3>
               <ul className="list-disc pl-5 font-sans text-sm space-y-2">
                  <li>Nov 15: Morning Bird Walk - Bring binoculars!</li>
                  <li>Nov 20: Mushroom ID Workshop - Meet at the visitor center.</li>
               </ul>
            </StickyNote>
            <div className="p-6 bg-nature-dark text-nature-cream rounded-sm shadow-lg rotate-1">
               <h3 className="font-hand text-2xl font-bold mb-4">Suggest an Event?</h3>
               <p className="font-sans mb-4">We love community led initiatives. If you want to organize a cleanup or a study group, let us know.</p>
               <button className="bg-nature-accent text-white px-4 py-2 font-bold font-hand uppercase tracking-widest hover:bg-white hover:text-nature-accent transition">Contact Organizer</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CalendarPage;
