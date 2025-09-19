import React, { useState } from 'react';
import { Calendar, Clock, User, Search, MapPin } from 'lucide-react';
import { Doctor, TimeSlot } from '../../types';
import { format, addDays, isSameDay } from 'date-fns';

export const BookAppointment: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [symptoms, setSymptoms] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const specializations = [
    'General Medicine',
    'Orthopedics',
    'ENT',
    'Surgery',
    'Cardiology',
    'Gynecology',
    'Pediatrics',
    'Dermatology',
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      experience: 8,
      rating: 4.8,
      available: true,
      qualifications: 'MBBS, MD',
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Orthopedics',
      experience: 12,
      rating: 4.9,
      available: true,
      qualifications: 'MBBS, MS (Ortho)',
    },
    {
      id: '3',
      name: 'Dr. Anjali Patel',
      specialization: 'ENT',
      experience: 6,
      rating: 4.7,
      available: true,
      qualifications: 'MBBS, MS (ENT)',
    },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(doc => doc.specialization === selectedSpecialization)
    : doctors;

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      setShowConfirmation(true);
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked Successfully!</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="space-y-2">
              <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
              <p><span className="font-medium">Specialization:</span> {selectedDoctor?.specialization}</p>
              <p><span className="font-medium">Date:</span> {selectedDate && format(selectedDate, 'PPP')}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Room ID:</span> medi-mantra.in/room/abc123</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              📱 SMS and WhatsApp notifications will be sent to you and the doctor with the video call link.
            </p>
          </div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step 1: Select Specialization */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Specialization</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => {
                setSelectedSpecialization(spec);
                setSelectedDoctor(null);
              }}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                selectedSpecialization === spec
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{spec}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Doctor */}
      {selectedSpecialization && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Doctor</h2>
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.qualifications}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {doctor.experience} years experience
                        </span>
                        <span className="text-sm text-yellow-600">
                          ★ {doctor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Date & Time */}
      {selectedDoctor && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
          
          {/* Date Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Available Dates</h3>
            <div className="grid grid-cols-7 gap-2">
              {next7Days.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedDate && isSameDay(date, selectedDate)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs text-gray-500">
                    {format(date, 'EEE')}
                  </div>
                  <div className="font-medium">
                    {format(date, 'd')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Available Times</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Symptoms */}
      {selectedTime && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Symptoms</h2>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Please describe your symptoms in detail..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>
      )}

      {/* Book Button */}
      {selectedDoctor && selectedDate && selectedTime && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Appointment Summary</h3>
              <p className="text-sm text-gray-600">
                {selectedDoctor.name} • {format(selectedDate, 'PPP')} • {selectedTime}
              </p>
            </div>
            <button
              onClick={handleBookAppointment}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};