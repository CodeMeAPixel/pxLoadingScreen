window.CONFIG = {
  General: {
    enableAudio: true,
    audioVolume: 0.3,
    audioFadeOut: 3000,
    enableVideo: true,
    loopVideo: false,
    allowSkip: false,
    skipKeyBinding: 'ENTER',
  },

  Theme: {
    colors: {
      accent: '#3a3546',            // Primary accent color
      accentRGB: '114, 53, 255',    // RGB version (used for opacity variants)
      secondary: '#6f00ff',         // Secondary / tech color
      secondaryRGB: '111, 0, 255',
      success: '#06d6a0',           // Status: success
      warning: '#ffd700',           // Status: warning
      danger: '#ef476f',            // Status: danger
      // Uncomment to override text & surface colors:
      // textPrimary: '#e8e8ef',
      // textSecondary: '#8a8f9d',
      // textMuted: '#4a4e5a',
      // bgBase: '#0b0b0f',
      // bgSurface: '#141419',
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
    // All media fields accept either a local path (e.g. 'media/music/track.mp3')
    // or a full external URL (e.g. 'https://cdn.example.com/track.mp3').
    // External URLs are preferred — files stream directly from your host and do
    // not count against the FiveM resource download size. Local paths require
    // the file to be present in media/ and listed in fxmanifest.lua.
    backgroundVideo: 'https://embrly.ca/ibNxG/Dx7qjq.mp4/raw',
    backgroundImage: 'https://embrly.ca/ibNxG/CAAogR.gif/raw',

    // Music tracks can be a plain string (path or URL) or an object with metadata.
    // Object format: { src, title?, artist?, cover? }
    //   src    — path or URL to the audio file (required)
    //   title  — display name shown in the player  (optional, auto-derived from filename if omitted)
    //   artist — artist / band name shown below the title (optional)
    //   cover  — URL to album art thumbnail shown in the player (optional)
    // Both formats can be mixed freely in audioPlaylist.
    audioFile: {
      src: 'https://embrly.ca/ibNxG/CTML1u.mp3/raw',
      title: 'Born For This',
      artist: 'The Score',
    },
    audioPlaylist: [
      {
        src: 'https://embrly.ca/ibNxG/oVWRw4.mp3/raw',
        title: 'Molly Ft. Sheff G',
        artist: 'Sleepy Hallow',
      },
      {
        src: 'https://embrly.ca/ibNxG/ESsyKa.mp3/raw',
        title: 'Lowkey',
        artist: 'Sleepy Hallow',
      },
      {
        src: 'https://embrly.ca/ibNxG/eOFkf3.mp3/raw',
        title: 'Good Girls Aint No Fun',
        artist: 'Sleepy Hallow',
      },
      {
        src: 'https://embrly.ca/ibNxG/hmr4-V.mp3/raw',
        title: 'Treat Me Right (NCS)',
        artist: 'Keys N Krates',
      },
      {
        src: 'https://embrly.ca/ibNxG/h6VsHw.mp3/raw',
        title: 'Dumm Dee Dum (NCS)',
        artist: 'Keys N Krates',
      },
      {
        src: 'https://embrly.ca/ibNxG/ZgCJdp.mp3/raw',
        title: 'Dreamyness (NCS)',
        artist: 'Keys N Krates',
      },
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
    tabs: [
      {
        id: 'updates',
        label: 'Updates',
        icon: 'star',
        color: '#7235ff',
        colorRGB: '114, 53, 255',
        content: [
          'New vehicle customization options available in the mechanic shop.',
          'Added 5 new heist missions for high-level crews.',
          'Updated police fleet with new interceptors.',
          'Optimized server performance and reduced texture streaming issues.',
        ],
      },
      {
        id: 'rules',
        label: 'Rules',
        icon: 'shield',
        color: '#ef4444',
        colorRGB: '239, 68, 68',
        content: [
          'Respect all players and staff members.',
          'No RDM (Random Deathmatch) or VDM (Vehicle Deathmatch).',
          'Stay in character at all times.',
          'Use appropriate microphones and no mic spam.',
        ],
      },
      {
        id: 'staff',
        label: 'Staff',
        icon: 'users',
        color: '#f59e0b',
        colorRGB: '245, 158, 11',
        content: [
          { name: 'Pixel', role: 'Server Owner', image: 'https://github.com/CodeMeAPixel.png' },
          { name: 'Alex', role: 'Head Admin', image: '' }, // Placeholder avatar
          { name: 'Sarah', role: 'Community Manager', image: '' },
          { name: 'Mike', role: 'Developer', image: '' },
        ],
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: 'book', // or 'settings' or 'box'
        color: '#06b6d4',
        colorRGB: '6, 182, 212',
        // Leave content empty or null to let the app auto-populate it from loading logs
        content: [], 
      },
      {
        id: 'controls',
        label: 'Controls',
        icon: 'gamepad2',
        color: '#22c55e',
        colorRGB: '34, 197, 94',
        content: [
          'F1 - Phone',
          'F2 - Inventory',
          'F3 - Animation Menu',
          'Alt - Eye Target',
          'K - Vehicle Menu',
        ],
      },
    ],
  },

  Social: {
    enabled: true,
    links: [
      { platform: 'discord', label: 'Discord', url: 'https://discord.gg/BsEhHBTbXw' },
      { platform: 'website', label: 'Website', url: 'https://cmap.lol' },
      { platform: 'store', label: 'Store', url: 'https://cmap.lol/shop' },
      { platform: 'github', label: 'GitHub', url: 'https://github.com/CodeMeAPixel' },
    ],
  },

  Layout: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
