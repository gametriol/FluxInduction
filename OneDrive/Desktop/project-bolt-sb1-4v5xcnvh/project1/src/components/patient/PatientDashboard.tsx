import React, { useState } from 'react';
import { Calendar, Video, FileText, MessageSquare, Activity, Clock, User, Stethoscope } from 'lucide-react';
import { BookAppointment } from './BookAppointment';
import { HealthRecords } from './HealthRecords';
import { AISymptomChecker } from './AISymptomChecker';
import { VideoCall } from '../video/VideoCall';

export const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      date: '2024-12-10',
      time: '2:00 PM',
      status: 'scheduled' as const,
    },
  ];

  const recentConsultations = [
    {
      id: '1',
      doctorName: 'Dr. Rajesh Kumar',
      specialization: 'Orthopedics',
      date: '2024-12-05',
      diagnosis: 'Mild joint pain',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'book':
        return <BookAppointment />;
      case 'records':
        return <HealthRecords />;
      case 'symptoms':
        return <AISymptomChecker />;
      case 'video':
        return <VideoCall roomId="patient-room" />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">1</p>
                    <p className="text-sm text-gray-600">Upcoming Appointments</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-sm text-gray-600">Health Records</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Total Consultations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                            <p className="text-sm text-gray-600">{appointment.specialization}</p>
                            <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab('video')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Call</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
                )}
              </div>
            </div>

            {/* Recent Consultations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Consultations</h2>
              </div>
              <div className="p-6">
                {recentConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {recentConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Stethoscope className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{consultation.doctorName}</h3>
                          <p className="text-sm text-gray-600">{consultation.specialization}</p>
                          <p className="text-sm text-gray-500">{consultation.diagnosis}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {consultation.date}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent consultations</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Activity },
                { id: 'book', label: 'Book Appointment', icon: Calendar },
                { id: 'records', label: 'Health Records', icon: FileText },
                { id: 'symptoms', label: 'AI Symptoms', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};