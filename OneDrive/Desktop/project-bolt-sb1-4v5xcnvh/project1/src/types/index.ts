export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'patient' | 'doctor';
  aadhaar?: string;
  specialization?: string;
  avatar?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  roomId?: string;
  symptoms?: string;
  prescription?: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  date: string;
  doctorName: string;
  specialization: string;
  diagnosis: string;
  prescription: string;
  testReports?: string[];
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  available: boolean;
  avatar?: string;
  qualifications: string;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  available: boolean;
}

export interface VideoCallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnected: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}