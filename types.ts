
import React from 'react';

export type ToolID = 
  | 'pdf-editor' 
  | 'resume-builder'
  | 'ppt-to-pdf' 
  | 'pdf-to-jpg' 
  | 'jpg-to-pdf' 
  | 'upgrade-to-pdf' 
  | 'bg-remover' 
  | 'add-bg-color' 
  | 'apply-theme';

export interface PDFTool {
  id: ToolID;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'edit' | 'convert' | 'optimize' | 'build';
  color: string;
}

export type PlanType = 'free' | 'pro';

export interface SubscriptionData {
  plan: PlanType;
  paypalSubscriptionId?: string;
  billingDate?: string;
  status: 'active' | 'cancelled' | 'none';
}

export interface UserUsage {
  date: string;
  count: number;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
}

// Resume Builder Types
export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ResumeEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeSkill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    title: string;
    summary: string;
  };
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  sections: {
    id: string;
    title: string;
    content: string;
    visible: boolean;
  }[];
  config: {
    template: 'modern' | 'minimal' | 'ats';
    primaryColor: string;
    fontSize: number;
    fontFamily: string;
    lineSpacing: number;
  };
}

// Existing PDF Editing Types (Kept for compatibility)
export type DrawingPoint = { x: number; y: number };

export interface BaseAnnotation {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface TextAnnotation extends BaseAnnotation {
  type: 'text';
  content: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface DrawingAnnotation extends BaseAnnotation {
  type: 'drawing';
  points: DrawingPoint[];
  color: string;
  thickness: number;
  opacity?: number;
}

export interface ShapeAnnotation extends BaseAnnotation {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'arrow';
  color: string;
  fill?: string;
  thickness: number;
}

export interface ImageAnnotation extends BaseAnnotation {
  type: 'image';
  dataUrl: string;
  width: number;
  height: number;
  rotation: number;
}

export type Annotation = TextAnnotation | DrawingAnnotation | ImageAnnotation | ShapeAnnotation;

export type ActiveTool = 'select' | 'text' | 'draw' | 'shape' | 'image' | 'signature' | 'erase';
export type ShapeType = 'rectangle' | 'circle' | 'arrow';
