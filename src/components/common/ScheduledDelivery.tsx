import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ScheduledDeliveryProps {
  onScheduleSelect: (schedule: {
    date: string;
    time: string;
    notes?: string;
  }) => void;
}

const ScheduledDelivery: React.FC<ScheduledDeliveryProps> = ({ onScheduleSelect }) => {
  const [schedule, setSchedule] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchedule(prev => ({
      ...prev,
      [name]: value
    }));
    onScheduleSelect({
      ...schedule,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-800">Schedule Delivery</h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={schedule.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Calendar className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <div className="relative">
              <input
                type="time"
                name="time"
                value={schedule.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Clock className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={schedule.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Any special instructions or requirements..."
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduledDelivery; 