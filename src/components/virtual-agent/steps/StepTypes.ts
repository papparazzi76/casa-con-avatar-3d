
import React from 'react';

export interface Step {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}
