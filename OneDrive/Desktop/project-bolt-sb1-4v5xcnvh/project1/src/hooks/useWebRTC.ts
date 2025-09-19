import { useRef, useState, useCallback } from 'react';
import { VideoCallState } from '../types';

export const useWebRTC = () => {
  const [state, setState] = useState<VideoCallState>({
    localStream: null,
    remoteStream: null,
    isConnected: false,
    isMuted: false,
    isVideoOff: false,
  });

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });

      setState(prev => ({ ...prev, localStream: stream }));
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (state.localStream) {
      const audioTracks = state.localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [state.localStream]);

  const toggleVideo = useCallback(() => {
    if (state.localStream) {
      const videoTracks = state.localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setState(prev => ({ ...prev, isVideoOff: !prev.isVideoOff }));
    }
  }, [state.localStream]);

  const endCall = useCallback(() => {
    if (state.localStream) {
      state.localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setState({
      localStream: null,
      remoteStream: null,
      isConnected: false,
      isMuted: false,
      isVideoOff: false,
    });
  }, [state.localStream]);

  return {
    ...state,
    startVideo,
    toggleMute,
    toggleVideo,
    endCall,
  };
};