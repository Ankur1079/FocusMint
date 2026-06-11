/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DailyTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'blue' | 'pink' | 'emerald';
}

export type SpaceTheme = 'COZY_DESK' | 'RELAXING_MIND';
export type SeasonTheme = 'SUMMER' | 'NIGHT' | 'RAINY' | 'WINTER';
export type ColorMode = 'DARK' | 'LIGHT';

export interface BookInfo {
  id: string;
  title: string;
  author: string;
  bannerColor: string;
  summary: string;
  tactics: string[];
}

export interface LampColorConfig {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  class: string;
  text: string;
  hover: string;
  glowClass: string;
}

export const LAMP_COLORS: LampColorConfig[] = [
  { id: 'GOLD', name: 'Warm Gold', hex: '#f59e0b', rgb: '245,158,11', class: 'bg-amber-500', text: 'text-amber-550', hover: 'hover:bg-amber-500/30', glowClass: 'bg-amber-500' },
  { id: 'SUNSET', name: 'Coral Sunset', hex: '#f97316', rgb: '249,115,22', class: 'bg-orange-500', text: 'text-orange-500', hover: 'hover:bg-orange-500/30', glowClass: 'bg-orange-500' },
  { id: 'RED', name: 'Ruby Red', hex: '#ef4444', rgb: '239,68,68', class: 'bg-red-500', text: 'text-red-500', hover: 'hover:bg-red-500/30', glowClass: 'bg-red-500' },
  { id: 'EMERALD', name: 'Emerald Forest', hex: '#10b981', rgb: '16,185,129', class: 'bg-emerald-500', text: 'text-emerald-500', hover: 'hover:bg-emerald-500/30', glowClass: 'bg-emerald-500' },
  { id: 'OCEAN', name: 'Midnight Ocean', hex: '#0ea5e9', rgb: '14,165,233', class: 'bg-sky-500', text: 'text-sky-500', hover: 'hover:bg-sky-500/30', glowClass: 'bg-sky-500' },
  { id: 'VIOLET', name: 'Neon Violet', hex: '#8b5cf6', rgb: '139,92,246', class: 'bg-violet-550', text: 'text-violet-500', hover: 'hover:bg-violet-500/30', glowClass: 'bg-violet-500' },
];
