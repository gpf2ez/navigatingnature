export interface PolaridProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: string; // e.g., 'rotate-2', '-rotate-1'
  className?: string;
  label?: string; // For the 'Producer', 'Consumer' tags
}

export interface TapeHeaderProps {
  text: string;
  rotation?: string; // e.g., 'rotate-1', '-rotate-1'
  className?: string;
}

export interface StickyNoteProps {
  text: string;
  author: string;
  rotation?: string;
  colorClass?: string; // e.g., 'bg-[#F0EBE3]'
}