/**
 * pxLoadingScreen Configuration
 * ============================================
 * Edit this file to customize your loading screen.
 * After editing the configuration, make sure to restart your FiveM server to see the changes take effect.
 *
 * For detailed documentation on each configuration option, visit:
 * - https://cmap.lol/docs/pxLoadingScreen/configuration
 */

window.CONFIG = {
  General: {
    enableAudio: true,
    audioVolume: 0.3,
    audioFadeOut: 3000,
    enableVideo: true,
    loopVideo: true,
    allowSkip: false,
    skipKeyBinding: 'ENTER',
  },

  Theme: {
    colors: {
      accent: '#7235ff',
      accentRGB: '114, 53, 255',
      secondary: '#6f00ff',
      secondaryRGB: '111, 0, 255',
      success: '#06d6a0',
      warning: '#ffd700',
      danger: '#ef476f',
    },
    branding: {
      enabled: true,
      icon: {
        show: true,
        url: 'https://cmap.lol/icon.svg',
        size: 120,
        showGlow: true,
      },
      title: 'Your Server Name',
      subtitle: 'Prepare for an awesome experience.',
    },
  },

  Content: {
    loadingText: 'Initializing Server',
    loadingDescription: 'Please wait while we get things ready...',
    cards: [
      {
        title: 'Welcome',
        icon: 'wrench',
        description: 'Welcome to our server!',
        bgColor: 'rgba(255, 107, 53, 0.1)',
        borderColor: 'rgba(255, 107, 53, 0.3)',
      },
      {
        title: 'Features',
        icon: 'tools',
        description: 'Tons of custom content',
        bgColor: 'rgba(0, 212, 255, 0.1)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
      },
      {
        title: 'Community',
        icon: 'person',
        description: 'Join our growing community',
        bgColor: 'rgba(6, 214, 160, 0.1)',
        borderColor: 'rgba(6, 214, 160, 0.3)',
      },
    ],
    tips: [
      'Explore the city and discover hidden locations',
      'Join our Discord for updates and support',
      'Check out the controls in the settings menu',
      'Report bugs to help us improve',
    ],
  },

  Media: {
    backgroundVideo: 'media/LoadingScreenTwo.mp4',
    backgroundImage: 'media/PixelWallpaper.gif',
    audioFile: 'media/KeysNKrates_TreatMeRightNCS.mp3',  
    audioPlaylist: [
      'media/KeysNKrates_DumDeeDumNCS.mp3',
      'media/KeysNKrates_DreamynessNCS.mp3'
    ],
  },

  Progress: {
    showProgressBar: true,
    progressColor: '#3d0399',
    simulateProgress: true,
    minDuration: 5000,
    checkpoints: [
      { label: 'Initializing Core', progress: 10 },
      { label: 'Loading Resources', progress: 25 },
      { label: 'Connecting to Server', progress: 50 },
      { label: 'Syncing Data', progress: 75 },
      { label: 'Finalizing Setup', progress: 90 },
    ],
  },

  Tabs: {
    enabled: true,
    position: 'bottom',
    tabs: [
      {
        id: 'features',
        label: 'Features',
        icon: 'star',
        content: [
          'Vehicle Customization',
          'Professional Tuning',
          'Paint & Cosmetics',
          'Work Orders System',
          'Advanced Diagnostics',
          'Inventory Management',
        ],
      },
      {
        id: 'control',
        label: 'Controls',
        icon: 'gamepad2',
        content: [
          'E - Interact with NPCs',
          'Right Click - Open Menu',
          'WASD - Move Around',
          'ESC - Close Menus',
          'Mouse - Navigate UI',
        ],
      },
      {
        id: 'support',
        label: 'Support',
        icon: 'question',
        content: [
          'Discord: https://discord.gg/BsEhHBTbXw',
          'Documentation: https://cmap.lol/docs/pxLoadingScreen',
          'Report Issues: https://github.com/CodeMeAPixel/pxLoadingScreen/issues',
          'Visit our shop: https://cmap.lol/shop',
        ],
      },
    ],
  },

  Layout: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
