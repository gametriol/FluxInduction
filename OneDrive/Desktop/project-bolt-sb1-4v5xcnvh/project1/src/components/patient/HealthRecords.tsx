import React, { useState } from 'react';
import { FileText, Download, Calendar, User, Pill, TestTube } from 'lucide-react';
import { HealthRecord } from '../../types';

export const HealthRecords: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const healthRecords: HealthRecord[] = [
    {
      id: '1',
      patientId: 'p1',
      appointmentId: 'a1',
      date: '2024-12-05',
      doctorName: 'Dr. Rajesh Kumar',
      specialization: 'Orthopedics',
      diagnosis: 'Mild joint pain in knees',
      prescription: 'Paracetamol 500mg twice daily for 5 days, Light exercises',
      notes: 'Patient reports improvement after rest. Advised to avoid heavy lifting.',
    },
    {
      id: '2',
      patientId: 'p1',
      appointmentId: 'a2',
      date: '2024-11-28',
      doctorName: 'Dr. Priya Sharma',
      specialization: 'General Medicine',
      diagnosis: 'Common cold with mild fever',
      prescription: 'Crocin 650mg thrice daily, Plenty of rest and fluids',
      notes: 'Symptoms should resolve in 3-5 days. Return if fever persists.',
    },
    {
      id: '3',
      patientId: 'p1',
      appointmentId: 'a3',
      date: '2024-11-15',
      doctorName: 'Dr. Anjali Patel',
      specialization: 'ENT',
      diagnosis: 'Ear infection (Otitis Media)',
      prescription: 'Antibiotic ear drops, Amoxicillin 250mg for 7 days',
      notes: 'Complete the full course of antibiotics. Follow-up if no improvement.',
      testReports: ['Blood Test Report - Normal', 'X-ray Report - Clear'],
    },
  ];

  if (selectedRecord) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => setSelectedRecord(null)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Records
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Medical Record</h2>
                <p className="text-gray-600">Consultation on {selectedRecord.date}</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Record Details */}
          <div className="p-6 space-y-6">
            {/* Doctor Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedRecord.doctorName}</h3>
                <p className="text-sm text-gray-600">{selectedRecord.specialization}</p>
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRecord.diagnosis}</p>
            </div>

            {/* Prescription */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Prescription</span>
              </h4>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                {selectedRecord.prescription}
              </p>
            </div>

            {/* Doctor's Notes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
              <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                {selectedRecord.notes}
              </p>
            </div>

            {/* Test Reports */}
            {selectedRecord.testReports && selectedRecord.testReports.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <TestTube className="w-4 h-4" />
                  <span>Test Reports</span>
                </h4>
                <div className="space-y-2">
                  {selectedRecord.testReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{report}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Records</h2>
          <p className="text-gray-600">Your complete medical history</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Download All</span>
        </button>
      </div>

      {/* Records List */}
      <div className="grid gap-4">
        {healthRecords.map((record) => (
          <div
            key={record.id}
            onClick={() => setSelectedRecord(record)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{record.doctorName}</h3>
                  <p className="text-sm text-gray-600">{record.specialization}</p>
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{record.date}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{record.diagnosis}</p>
                <p className="text-xs text-blue-600 mt-1">Click to view details →</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {healthRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Health Records</h3>
          <p className="text-gray-600">Your consultation history will appear here.</p>
        </div>
      )}
    </div>
  );
};