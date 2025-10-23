/**
 * Icon Archetype Definitions
 *
 * Archetypes define the parameters and valid ranges for each icon type.
 * Each archetype is a "template" that can be customized via parameters.
 *
 * The 15 universal archetypes:
 * - home, search, settings, profile, trash
 * - download, upload, edit, add, remove
 * - play, pause, refresh, share, info, warning
 */

/**
 * A parameter that controls one aspect of an icon's geometry
 */
export interface ArchetypeParameter {
  /**
   * Unique identifier for this parameter
   * e.g., "lensRadius", "handleAngle", "lineThickness"
   */
  id: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Description of what this parameter controls
   */
  description: string;

  /**
   * Data type of this parameter
   */
  type: 'number' | 'boolean';

  /**
   * Minimum allowed value (for number type)
   */
  min?: number;

  /**
   * Maximum allowed value (for number type)
   */
  max?: number;

  /**
   * Default value
   */
  default: number | boolean;

  /**
   * Step size for sliders (for number type)
   * e.g., 0.5, 1, 2
   */
  step?: number;

  /**
   * Unit of measurement (for documentation)
   * e.g., "px", "degrees", "%"
   */
  unit?: string;
}

/**
 * A complete archetype definition
 */
export interface Archetype {
  /**
   * Unique identifier for this archetype
   * Must be lowercase, no spaces
   * e.g., "search", "home", "trash"
   */
  id: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Category of icon
   * e.g., "navigation", "action", "status"
   */
  category: string;

  /**
   * Description of what this icon represents
   */
  description: string;

  /**
   * List of parameters that control this icon's geometry
   */
  parameters: ArchetypeParameter[];

  /**
   * Default parameter values
   */
  defaults: Record<string, number | boolean>;

  /**
   * Version of this archetype
   */
  version: number;
}

/**
 * Archetype registry - all 15 universal archetypes
 */
export const ARCHETYPES: Record<string, Archetype> = {
  home: {
    id: 'home',
    name: 'Home',
    category: 'navigation',
    description: 'House icon for home/dashboard navigation',
    parameters: [
      {
        id: 'roofHeight',
        name: 'Roof Height',
        description: 'Height of the roof point above the house body',
        type: 'number',
        min: 2,
        max: 8,
        default: 4,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'doorWidth',
        name: 'Door Width',
        description: 'Width of the door opening',
        type: 'number',
        min: 2,
        max: 6,
        default: 3,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'windowSize',
        name: 'Window Size',
        description: 'Size of the window squares',
        type: 'number',
        min: 1,
        max: 3,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      roofHeight: 4,
      doorWidth: 3,
      windowSize: 2,
    },
    version: 1,
  },

  search: {
    id: 'search',
    name: 'Search',
    category: 'action',
    description: 'Magnifying glass for search functionality',
    parameters: [
      {
        id: 'lensRadius',
        name: 'Lens Radius',
        description: 'Radius of the circular lens',
        type: 'number',
        min: 3,
        max: 8,
        default: 5,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'handleLength',
        name: 'Handle Length',
        description: 'Length of the search handle',
        type: 'number',
        min: 3,
        max: 8,
        default: 5,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'handleAngle',
        name: 'Handle Angle',
        description: 'Angle of the handle (0=vertical, 45=diagonal)',
        type: 'number',
        min: 0,
        max: 45,
        default: 45,
        step: 5,
        unit: 'degrees',
      },
    ],
    defaults: {
      lensRadius: 5,
      handleLength: 5,
      handleAngle: 45,
    },
    version: 1,
  },

  settings: {
    id: 'settings',
    name: 'Settings',
    category: 'action',
    description: 'Gear icon for settings/configuration',
    parameters: [
      {
        id: 'toothCount',
        name: 'Tooth Count',
        description: 'Number of gear teeth',
        type: 'number',
        min: 6,
        max: 12,
        default: 8,
        step: 1,
      },
      {
        id: 'toothDepth',
        name: 'Tooth Depth',
        description: 'Depth of the gear teeth',
        type: 'number',
        min: 1,
        max: 4,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'centerRadius',
        name: 'Center Radius',
        description: 'Radius of the center hole',
        type: 'number',
        min: 1,
        max: 4,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      toothCount: 8,
      toothDepth: 2,
      centerRadius: 2,
    },
    version: 1,
  },

  profile: {
    id: 'profile',
    name: 'Profile',
    category: 'action',
    description: 'User profile/account icon',
    parameters: [
      {
        id: 'headRadius',
        name: 'Head Radius',
        description: 'Radius of the head circle',
        type: 'number',
        min: 2,
        max: 5,
        default: 3.5,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'shoulderWidth',
        name: 'Shoulder Width',
        description: 'Width of the shoulders',
        type: 'number',
        min: 6,
        max: 16,
        default: 12,
        step: 1,
        unit: 'px',
      },
      {
        id: 'bodyHeight',
        name: 'Body Height',
        description: 'Height of the body portion',
        type: 'number',
        min: 6,
        max: 12,
        default: 8,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      headRadius: 3.5,
      shoulderWidth: 12,
      bodyHeight: 8,
    },
    version: 1,
  },

  trash: {
    id: 'trash',
    name: 'Trash',
    category: 'action',
    description: 'Trash/delete icon',
    parameters: [
      {
        id: 'handleWidth',
        name: 'Handle Width',
        description: 'Width of the trash can handle',
        type: 'number',
        min: 2,
        max: 6,
        default: 4,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'canWidth',
        name: 'Can Width',
        description: 'Width of the trash can body',
        type: 'number',
        min: 8,
        max: 16,
        default: 12,
        step: 1,
        unit: 'px',
      },
      {
        id: 'lineCount',
        name: 'Line Count',
        description: 'Number of trash lines inside the can',
        type: 'number',
        min: 2,
        max: 5,
        default: 3,
        step: 1,
      },
    ],
    defaults: {
      handleWidth: 4,
      canWidth: 12,
      lineCount: 3,
    },
    version: 1,
  },

  download: {
    id: 'download',
    name: 'Download',
    category: 'action',
    description: 'Download arrow icon',
    parameters: [
      {
        id: 'arrowWidth',
        name: 'Arrow Width',
        description: 'Width of the arrow head',
        type: 'number',
        min: 2,
        max: 6,
        default: 4,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'arrowLength',
        name: 'Arrow Length',
        description: 'Length of the arrow shaft',
        type: 'number',
        min: 4,
        max: 10,
        default: 8,
        step: 1,
        unit: 'px',
      },
      {
        id: 'lineWidth',
        name: 'Line Width',
        description: 'Width of the bottom line',
        type: 'number',
        min: 6,
        max: 14,
        default: 10,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      arrowWidth: 4,
      arrowLength: 8,
      lineWidth: 10,
    },
    version: 1,
  },

  upload: {
    id: 'upload',
    name: 'Upload',
    category: 'action',
    description: 'Upload arrow icon',
    parameters: [
      {
        id: 'arrowWidth',
        name: 'Arrow Width',
        description: 'Width of the arrow head',
        type: 'number',
        min: 2,
        max: 6,
        default: 4,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'arrowLength',
        name: 'Arrow Length',
        description: 'Length of the arrow shaft',
        type: 'number',
        min: 4,
        max: 10,
        default: 8,
        step: 1,
        unit: 'px',
      },
      {
        id: 'lineWidth',
        name: 'Line Width',
        description: 'Width of the bottom line',
        type: 'number',
        min: 6,
        max: 14,
        default: 10,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      arrowWidth: 4,
      arrowLength: 8,
      lineWidth: 10,
    },
    version: 1,
  },

  edit: {
    id: 'edit',
    name: 'Edit',
    category: 'action',
    description: 'Pencil/edit icon',
    parameters: [
      {
        id: 'pencilLength',
        name: 'Pencil Length',
        description: 'Length of the pencil shaft',
        type: 'number',
        min: 8,
        max: 14,
        default: 12,
        step: 1,
        unit: 'px',
      },
      {
        id: 'tipLength',
        name: 'Tip Length',
        description: 'Length of the sharp tip',
        type: 'number',
        min: 3,
        max: 6,
        default: 4,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'tipAngle',
        name: 'Tip Angle',
        description: 'Angle of the tip point',
        type: 'number',
        min: 30,
        max: 60,
        default: 45,
        step: 5,
        unit: 'degrees',
      },
    ],
    defaults: {
      pencilLength: 12,
      tipLength: 4,
      tipAngle: 45,
    },
    version: 1,
  },

  add: {
    id: 'add',
    name: 'Add',
    category: 'action',
    description: 'Plus/add icon',
    parameters: [
      {
        id: 'lineLength',
        name: 'Line Length',
        description: 'Length of the plus lines',
        type: 'number',
        min: 6,
        max: 14,
        default: 12,
        step: 1,
        unit: 'px',
      },
      {
        id: 'lineWidth',
        name: 'Line Width',
        description: 'Width/thickness of the lines',
        type: 'number',
        min: 1,
        max: 3,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'centerGap',
        name: 'Center Gap',
        description: 'Gap at the center where lines cross',
        type: 'number',
        min: 0,
        max: 4,
        default: 0,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      lineLength: 12,
      lineWidth: 2,
      centerGap: 0,
    },
    version: 1,
  },

  remove: {
    id: 'remove',
    name: 'Remove',
    category: 'action',
    description: 'Minus/remove icon',
    parameters: [
      {
        id: 'lineLength',
        name: 'Line Length',
        description: 'Length of the minus line',
        type: 'number',
        min: 6,
        max: 14,
        default: 12,
        step: 1,
        unit: 'px',
      },
      {
        id: 'lineWidth',
        name: 'Line Width',
        description: 'Thickness of the line',
        type: 'number',
        min: 1,
        max: 3,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      lineLength: 12,
      lineWidth: 2,
    },
    version: 1,
  },

  play: {
    id: 'play',
    name: 'Play',
    category: 'action',
    description: 'Play button icon',
    parameters: [
      {
        id: 'triangleWidth',
        name: 'Triangle Width',
        description: 'Width of the play triangle',
        type: 'number',
        min: 6,
        max: 12,
        default: 8,
        step: 1,
        unit: 'px',
      },
      {
        id: 'triangleHeight',
        name: 'Triangle Height',
        description: 'Height of the play triangle',
        type: 'number',
        min: 6,
        max: 12,
        default: 8,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      triangleWidth: 8,
      triangleHeight: 8,
    },
    version: 1,
  },

  pause: {
    id: 'pause',
    name: 'Pause',
    category: 'action',
    description: 'Pause button icon',
    parameters: [
      {
        id: 'barWidth',
        name: 'Bar Width',
        description: 'Width of each pause bar',
        type: 'number',
        min: 1,
        max: 3,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'barHeight',
        name: 'Bar Height',
        description: 'Height of the pause bars',
        type: 'number',
        min: 6,
        max: 12,
        default: 10,
        step: 1,
        unit: 'px',
      },
      {
        id: 'barGap',
        name: 'Bar Gap',
        description: 'Gap between the two bars',
        type: 'number',
        min: 2,
        max: 6,
        default: 3,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      barWidth: 2,
      barHeight: 10,
      barGap: 3,
    },
    version: 1,
  },

  refresh: {
    id: 'refresh',
    name: 'Refresh',
    category: 'action',
    description: 'Refresh/reload icon',
    parameters: [
      {
        id: 'circleRadius',
        name: 'Circle Radius',
        description: 'Radius of the circular arc',
        type: 'number',
        min: 5,
        max: 10,
        default: 8,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'arrowWidth',
        name: 'Arrow Width',
        description: 'Width of the arrow head',
        type: 'number',
        min: 2,
        max: 4,
        default: 3,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'arcAngle',
        name: 'Arc Angle',
        description: 'Angle of the circular arc',
        type: 'number',
        min: 180,
        max: 315,
        default: 270,
        step: 15,
        unit: 'degrees',
      },
    ],
    defaults: {
      circleRadius: 8,
      arrowWidth: 3,
      arcAngle: 270,
    },
    version: 1,
  },

  share: {
    id: 'share',
    name: 'Share',
    category: 'action',
    description: 'Share icon',
    parameters: [
      {
        id: 'dotRadius',
        name: 'Dot Radius',
        description: 'Radius of the connection dots',
        type: 'number',
        min: 1,
        max: 3,
        default: 2,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'lineWidth',
        name: 'Line Width',
        description: 'Width of the connecting lines',
        type: 'number',
        min: 0.5,
        max: 2,
        default: 1,
        step: 0.5,
        unit: 'px',
      },
    ],
    defaults: {
      dotRadius: 2,
      lineWidth: 1,
    },
    version: 1,
  },

  info: {
    id: 'info',
    name: 'Info',
    category: 'status',
    description: 'Information/help icon',
    parameters: [
      {
        id: 'circleRadius',
        name: 'Circle Radius',
        description: 'Radius of the info circle',
        type: 'number',
        min: 8,
        max: 12,
        default: 10,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'dotRadius',
        name: 'Dot Radius',
        description: 'Radius of the top dot',
        type: 'number',
        min: 1,
        max: 2,
        default: 1.5,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'textHeight',
        name: 'Text Height',
        description: 'Height of the "i" character',
        type: 'number',
        min: 4,
        max: 8,
        default: 6,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      circleRadius: 10,
      dotRadius: 1.5,
      textHeight: 6,
    },
    version: 1,
  },

  warning: {
    id: 'warning',
    name: 'Warning',
    category: 'status',
    description: 'Warning/alert icon',
    parameters: [
      {
        id: 'triangleHeight',
        name: 'Triangle Height',
        description: 'Height of the warning triangle',
        type: 'number',
        min: 10,
        max: 16,
        default: 14,
        step: 1,
        unit: 'px',
      },
      {
        id: 'dotRadius',
        name: 'Dot Radius',
        description: 'Radius of the warning dot',
        type: 'number',
        min: 1,
        max: 2,
        default: 1.5,
        step: 0.5,
        unit: 'px',
      },
      {
        id: 'exclamationHeight',
        name: 'Exclamation Height',
        description: 'Height of the exclamation mark',
        type: 'number',
        min: 5,
        max: 9,
        default: 7,
        step: 1,
        unit: 'px',
      },
    ],
    defaults: {
      triangleHeight: 14,
      dotRadius: 1.5,
      exclamationHeight: 7,
    },
    version: 1,
  },
};

/**
 * Get an archetype by ID
 */
export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES[id];
}

/**
 * Get all archetype IDs
 */
export function getAllArchetypeIds(): string[] {
  return Object.keys(ARCHETYPES);
}

/**
 * Get all archetypes
 */
export function getAllArchetypes(): Archetype[] {
  return Object.values(ARCHETYPES);
}

/**
 * Validate archetype parameters
 */
export function validateArchetypeParams(
  archetypeId: string,
  params: Record<string, number | boolean>
): string[] {
  const archetype = getArchetype(archetypeId);
  if (!archetype) {
    return [`Archetype "${archetypeId}" not found`];
  }

  const errors: string[] = [];

  for (const paramDef of archetype.parameters) {
    const value = params[paramDef.id];

    if (value === undefined) {
      errors.push(`Parameter "${paramDef.id}" is required`);
      continue;
    }

    if (typeof value !== paramDef.type) {
      errors.push(`Parameter "${paramDef.id}" must be of type ${paramDef.type}`);
      continue;
    }

    if (paramDef.type === 'number' && paramDef.min !== undefined && value < paramDef.min) {
      errors.push(`Parameter "${paramDef.id}" must be >= ${paramDef.min}`);
    }

    if (paramDef.type === 'number' && paramDef.max !== undefined && value > paramDef.max) {
      errors.push(`Parameter "${paramDef.id}" must be <= ${paramDef.max}`);
    }
  }

  return errors;
}
